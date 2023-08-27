const mongoose = require('mongoose');
const userSeed = require('../util/userSeed');

// const connectDb = async () => {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDb connected: ${conn.connection.host}`);
// }

const connectDb = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }, (conn) => {
        //     userSeed()
        //     console.log(`MongoDb connected:${conn}`);
        //   })

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                userSeed()
                console.log(`Connected to MongoDB:${mongoose.connection.host}`);
            })
            .catch(err => {
                console.error('Error connecting to MongoDB:', err);
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb