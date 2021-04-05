const { SpotModel } = require('../models');

module.exports = {

    async show(req, res){
        try {
            const { user_id } = req.headers;

            const spots = await SpotModel.find({
                user: user_id
            })

            return res.json(spots);
        } catch (error) {
            
        }
    }
}