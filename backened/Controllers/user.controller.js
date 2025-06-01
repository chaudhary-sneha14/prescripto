//-----------------API TO REGISTER USER-------------------

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../Models/doctor.model.js";
import appointmentModel from "../Models/appointment.model.js";
import Razorpay from "razorpay";

const registernow = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //----------------validating email------------------

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" });
    }

    //----------------validating password------------------
    if (password.length < 5) {
      return res.json({ success: false, message: "Enter a Strong Password" });
    }

    //-------hashing password----------------
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hassedPassword,
    };

    const newUser = await new userModel(userData);
    const user = await newUser.save();

    //----------------token-------------------
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//--------------------------------API for  user login------------------------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//-------------------------------api to ge userProfile data---------------------------------------
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//----------------API to  UPDATE USER FUNCTION_----------------

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, dob, gender } = req.body;

    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      //upload image to cloudinary

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book Appointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;

    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    //  Check if the same user already booked this slot
    const alreadyBooked = await appointmentModel.findOne({
      userId,
      docId,
      slotDate,
      slotTime,
    });

    if (alreadyBooked) {
      return res.json({
        success: false,
        message: "You have already booked this slot.",
      });
    }

    let slots_booked = docData.slots_booked || {};

    //checking for slot availability

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked; // once we booked then we need not to keep the history of data

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //----------------------Save new Slot in doctors data---------------------------

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//-----------------------API to get user appointment-----------------
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointment = await appointmentModel.find({ userId });
    res.json({ success: true, appointment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//-----------------------API to cancel Appointment---------------------------

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked || {};

    if (Array.isArray(slots_booked[slotDate])) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );

      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "Appointment Cancel" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//------------API TO MAKE PAY ONLINE USING RAZORPAY-------------------
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData  = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    //creating option for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //creation of an order

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};



//---------------API To verify payment of razorpay-----------------
const verifyRazorpay=async(req,res)=>{
  try {
    const{razorpay_order_id}= req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
   

    if(orderInfo.status==='paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:"Payment Succesful"})
    }

    else{
      res.json({success:false,message:"Payment Failed"})
     
    }
    
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

export {
  registernow,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};
