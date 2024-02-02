// // init mogoose

// import mongoose from "mongoose";

// // connect to mongoDB
// const DBCONNECT = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || "", {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       autoIndex: true, //make this also true
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB Connected");
// });
// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB Disconnected");
// });

// export default DBCONNECT;

import mongoose from "mongoose";
import colors from "colors";

const DBCONNECT = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    const conn = await mongoose.connect(uri);
    console.log(
      colors.cyan.underline.bold(
        `MongoDB Connected: ${conn.connection.host}🔥🎉😎`
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default DBCONNECT;
