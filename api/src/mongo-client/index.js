
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
mongoose.connect(uri,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0
})
.then(()=>{
    console.log('Mongoose connected succesfully');
})
.catch(err =>{

    if (err){
        console.log('Mongoose connection error: ', err);
        return;
    }

});