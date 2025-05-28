import mongoose from "mongoose";

export default function connectDB() {
  const url = process.env.DB_URI;

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected successfully...!`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error...!`);
  });
  return;
}