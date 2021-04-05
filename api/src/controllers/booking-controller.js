const { BookingModel } = require('../models');

module.exports = {

    async store(req, res, next){
        try {
            const { user_id } = req.headers;
            const { spot_id } = req.params;
            const { date } = req.body;

            const booking = await BookingModel.create({
                user: user_id,
                spot: spot_id,
                date
            });

            await booking.populate('spot').populate('user').execPopulate();
            
            const owner = req.connectedUsers[booking.spot.user._id.toString()];

            if(owner){
                req.io.to(owner).emit('booking_request', booking);
            }

            return res.json(booking);
        } catch (error) {
            next(error);
        }
    },

    async approve(req, res){
        const { id } = req.params;
        const booking = await BookingModel.findById(id).populate('spot');

        booking.approved = true;
        await booking.save();

        const issuer = req.connectedUsers[booking.user._id.toString()];

        if (issuer){
            req.io.to(issuer).emit('booking_response', booking);
        }

        res.json(booking);
    },

    async reject(req, res){
        const { id } = req.params;
        const booking = await BookingModel.findById(id).populate('spot');

        booking.approved = false;
        await booking.save();

        const issuer = req.connectedUsers[booking.user._id.toString()];

        if (issuer){
            req.io.to(issuer).emit('booking_response', booking);
        }

        res.json(booking);
    }
}