import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from '../backened/Config/mongodb.js'
import connectCloudinary from './Config/cloudinary.js'
import adminRouter from './Routes/admin.route.js'
import doctorRouter from'./Routes/doctor.route.js'
import userRouter from './Routes/user.route.js'

//app config
const app=express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors({
  origin: 'https://prescripto-client.onrender.com',
  credentials: true, // optional: only if using cookies or auth headers
}));

//api endpoint
app.use('/api/admin',adminRouter)  //localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)     //localhost:4000/api/doctor/list
app.use('/api/user',userRouter)



app.get('/',(req,res)=>{
res.send('API Working')
})

app.listen(port,()=>console.log("server started",port));
