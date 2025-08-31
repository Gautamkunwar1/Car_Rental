import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDb from "./config/db.js"
import userRouter from "./routes/userRouter.js";

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server is running")
});
app.use('/api/user',userRouter)
app.listen(PORT,async()=>{
    try {
        console.log(`Server is running at ${PORT}`)
        await connectDb()
    } catch (error) {
        console.error(`Error :${error.message}`)
    }
})