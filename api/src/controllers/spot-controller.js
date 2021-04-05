const { SpotModel } = require('../models');

module.exports = {

    async index(req, res){

        try {

            const { tech } = req.query;
    
            const spots = await SpotModel.find({
                techs: tech
            });
    
            return res.json(spots);
            
        } catch (error) {
            return res.status(400).json({ message: 'An error has ocurred while loading spots' });
        }
    },

    async store(req, res){
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        const spot = await SpotModel.create({
            user: user_id,
            thumbnail: filename,
            company,
            price: price ? price : 0,
            techs: techs.split(',').map(t => t.trim())
        });

        return res.json(spot);
    }
}