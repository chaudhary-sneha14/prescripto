import express from'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registernow, updateProfile, verifyRazorpay } from '../Controllers/user.controller.js';
import authUser from '../Middleware/authUser.js';
import upload from '../Middleware/multer.js';



const route=express.Router();

route.post('/register',registernow)
route.post('/login',loginUser)
route.get('/get-profile',authUser,getProfile)
route.post('/update-profile',upload.single('image'),authUser,updateProfile)
route.post('/book-appointment',authUser,bookAppointment)
route.get('/appointments',authUser,listAppointment)
route.post('/cancel-appointment',authUser,cancelAppointment)
route.post('/payment-razorpay',authUser,paymentRazorpay)
route.post('/verifyRazorpay',authUser,verifyRazorpay)

export default route