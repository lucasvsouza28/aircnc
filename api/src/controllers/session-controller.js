const { UserModel } = require('../models');

module.exports = {

    index(_, res){
        return res.json([]);
    },

    show(){},

    async store(req, res){
        const { email } = req.body;

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                email
            });
        }

        return res.json(user);
    },

    update(){},

    destroy(){}


};