import imagekit from "../config/imageKit.js";
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