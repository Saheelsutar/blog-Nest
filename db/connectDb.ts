
import  { connect } from "mongoose"; // Correct for Mongoose 8
const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URL as string);

        console.log(`MongoDB Connected: ${conn}`);
    } catch (error) {
        console.log(`Connection Error:}`+error);

    }
};

export default connectDB;
