const { Schema, model, Mongoose } = require('mongoose');

const SpotSchema = Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3000/files/${this.thumbnail}`
});

module.exports = model('Spot', SpotSchema);