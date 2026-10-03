import "./src/dotEnv.js";
import express from "express"
import cors from "cors";
import { errorHandler } from "./src/utilis/errorHandler.js";
import { connectDB } from "./src/lib/db.js";


const app = express();


const PORT = process.env.PORT || 5001;


app.get("/", (req, res) => {
   res.send("Hello")
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
   origin: "http://localhost:5174",
   Credential: true
}))


app.use(errorHandler);

const startServer = async () => {
   try {

      await connectDB();
      app.listen(PORT, () => {
         console.log(`🌍 Server Running On PORT ${PORT}`);
      })

   } catch (error) {
      console.error('Error in fnName:', error);
   }
};
startServer();


