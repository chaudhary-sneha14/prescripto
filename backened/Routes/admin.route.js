import express from 'express';
import { addDoctor, adminDashboard, allDoctors, appointmentAdmin, appointmentCancel, loginAdmin } from '../Controllers/admin.controller.js';
import upload from '../Middleware/multer.js';
import authAdmin from '../Middleware/authadmin.js';
import { changeAvailability } from '../Controllers/doctor.controller.js';

const router=express.Router();

router.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
router.post('/login',loginAdmin)
router.post('/all-doctors',authAdmin,allDoctors)
router.post('/change-availability',authAdmin,changeAvailability)
router.get('/appointments',authAdmin,appointmentAdmin)
router.post('/cancel-appointment',authAdmin,appointmentCancel)
router.get('/dashboard',authAdmin,adminDashboard)

export default router;