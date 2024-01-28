import mongoose from 'mongoose';

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Connected to Database");
} catch (error) {
    console.log("Error connecting to Database"+ error);
}
