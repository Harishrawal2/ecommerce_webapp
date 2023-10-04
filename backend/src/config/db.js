import colors from "colors";
import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database connection established with ${DB.connection.host}`.bgYellow.white);
  } catch (error) {
    console.log(`Database connection error: ${error}`.bgRed.white);
    exit(1);
  }
};

export default mongoConnect;
