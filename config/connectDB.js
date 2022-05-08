const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI,{
        dbName: 'Invited-Meeting-Platform'
    })
    .then( () => console.log("MongoDB Connected") )
    .catch( (err) => console.log(err.message));
    
    mongoose.connection.on('disconnected', () => console.log("\nMongoose Connection is Disconnected"));
    process.on('SIGINT', async () => await mongoose.connection.close());
}

module.exports = connectDB;