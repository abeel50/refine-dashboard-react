import mongoose from 'mongoose';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const getAllProperties = async (req, res) => {
    const { _end, _order, _start, _sort, title_like = "", propertyType = "" } = req.query;
    const query = {};
    if (propertyType !== "") {
        query.propertyType = propertyType
    }

    if (!title_like) {
        query.title_like = { $regex: title_like, $options: 'i' };
    }
    try {
        const count = await Property.countDocuments({ query });
        const properties = await Property
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header('x-total-count', count);
        res.header('Access-Control-Headers', 'x-total-count');
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPropertyDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const propertyExist = await Property.findOne({ _id: id }).populate('creator');
        if (propertyExist) {
            res.status(200).json(propertyExist)
        } else {
            res.status(404).json({ message: 'Property not found' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const { title, description, propertyType,
            location, price, photo, email } = req.body;

        // to make sure Property Creation is atomic
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error('User not found');

        // uploading photo to cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newProperty = await Property.create({
            title, description, propertyType, location, price, email,
            photo: photoUrl.url, creator: user._id
        });

        // save Property to User's List of Properties
        user.allProperties.push(newProperty._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: 'Property created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProperty = async (req, res) => { };

const deleteProperty = async (req, res) => { };

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty
}