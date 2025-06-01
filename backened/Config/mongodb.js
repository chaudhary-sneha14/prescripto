import mongoose from 'mongoose'



const connectDB = async()=>{

    // mongoose.connection.on('connected',()=> console.log('Database connected'))


   try {
     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
     console.log("Db Connected");
     
   } catch (error) {
    console.log("DB NOT CONNECTED",error);
    
    
   }
}

export default connectDB;