import Booking from "../models/Booking.js"
import Car from "../models/Car.js";

//Function to Check Availability of Car for a given Date
const checkAvailability = async(car,pickupDate,returnDate)=>{
    const bookings = await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate}
    })
    return bookings.length===0;
}

// API to check Availability of Cars for the given Date and location
export const checkAvailabilityOfCar = async(req,res)=>{
    try {
        const {location,pickupDate,returnDate} = req.body;
        //fetch all available cars for the given location
        const cars = await Car.find({location,isAvailable:true})
        //Check Car availability for the given data range using Promise
        const availableCarsPromise = cars.map(async(car)=>{
            const isAvailable = await checkAvailability(car._id,pickupDate,returnDate);
            return {...car._doc,isAvailable:isAvailable}
        })
        let availableCars = await Promise.all(availableCarsPromise);
        availableCars = availableCars.filter(car=>car.isAvailable=== true);

        return res.status(200).json({success:true,availableCars})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}

// API to create Booking
export const createBooking = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {car,pickupDate,returnDate} = req.body;
        const isAvailable = await checkAvailability(car,pickupDate,returnDate);
        if(!isAvailable) {
            return res.status(400).json({success:false,message:"Car is not available"})
        }

        const carData = await Car.findById(car);
        //Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned-picked)/(1000 *60 *60 *24))
        const price = carData.pricePerDay * noOfDays;
        await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price});
        return res.status(201).json({success:true,message:"Booking Added Successfully"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}

//API to List User Bookings 
export const getUserBookings = async (req,res)=>{
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt:-1});
        return res.status(201).json({success:true,bookings})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}

// API to get Owner Bookings
export const getOwnerBookings = async (req,res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.status(401).json({success:false,message:"Not Authorized"})
        }
        const bookings = await Booking.find({owner:req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1});
        return res.status(201).json({success:true,bookings})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}

//API to change booking status
export const changeBookingStatus = async (req,res)=>{
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body;
        const booking = await Booking.findById(bookingId);
        if(booking.owner.toString() !== _id.toString()){
            return res.status(401).json({success:false,message:"Not authorized"})
        }

        booking.status = status;
        await booking.save();
        return res.status(201).json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}