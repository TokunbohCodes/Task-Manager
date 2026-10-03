import mongoose from "mongoose"

export const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(` 🚀 MongoDB Successfully Connected On: ${conn.connection.host} ` );
   } catch (error) {
      console.error("MongoDb Failed to connect to database", error);
      process.exit(1)
   }
};
