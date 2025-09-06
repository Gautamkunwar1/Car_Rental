import imagekit from "../config/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs"
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" });
        return res.status(200).json({ success: true, message: "Now you can list cars" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//API to List Car

export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        //Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        })
        // optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width:'1280'},
                {quality:'auto'},
                {format:'webp'}
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car,admin:_id,image});
        return res.status(201).json({success:true,message:"Car Added Successfully"})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// API to list Admin Cars
export const getAdminCars = async(req,res)=>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({admin:_id});
        return res.status(200).json({success:true,cars})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//API to Toggle Car Availability
export const toggleCarAvailability = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if(car.owner.toString()!== _id.toString()){
            return res.status(401).json({success:false,message:"Unauthorized"})
        }
        car.isAvailable = !car.isAvailable;
        await Car.save();
        return res.status(200).json({success:true,message:"Availability Toggled"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//API to delete a car
export const deleteCar = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if(car.owner.toString()!== _id.toString()){
            return res.status(401).json({success:false,message:"Unauthorized"})
        }
        car.owner = null;
        car.isAvailable = false;
        await Car.save();
        return res.status(200).json({success:true,message:"Car Removed"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//API to get dashboard data
export const getDashboardData = async(req,res)=>{
    try {
        const {_id,role} = req.user;
        if(role!== 'admin'){
            return res.status(401).json({success:false,message:"Unauthorized"})
        }
        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});
        const pendingBookings = await Booking.find({owner:_id,status:"pending"});
        const completedBookings = await Booking.find({owner:_id,status:"confirmed"});

        // Calculate monthlyRevenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking=>booking.status === 'confirmed').reduce((acc,booking)=>acc+booking.price,0);
        const dashboardData = {
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        }
        return res.status(200).json({success:true,dashboardData})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//API to user Image
export const updateUserImage = async (req,res)=>{
    try {
        const {_id,role} = req.user;
        const imageFile = req.file;

        //Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users"
        })
        // optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width:'1280'},
                {quality:'auto'},
                {format:'webp'}
            ]
        });
        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id,{image});
        return res.status(200).json({success:true,message:"Image Updated"})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}