const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Item = require("../models/Item.model")
const fileUploader = require('../config/cloudinary.config')

// GET /shop - Retrieves all of the items
router.get("/shop", (req, res) => {
    Item.find()
    // .populate("order")
    .then(allItems => res.json(allItems))
    .catch(err => res.json(err))
})

// Upload image to Cloudinary
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

// POST /shop - Creates a new item
router.post("/shop", (req, res) => {
    const { title, exhibition, artist, description, size, material, border, imageUrl } = req.body
    console.log(req.body)
    Item.create({ title, exhibition, artist, description, size, material, border, imageUrl })
    .then(response => {console.log("RES: ", response); res.json(response)})
    .catch(err => {console.log("err: ", err); res.json(err)})
})

// GET /shop/:itemId = Retrieves a specific project by Id
router.get("/shop/:itemId", (req, res) => {
    const { itemId } = req.params

    // Check if Id is valid
    if(!mongoose.Types.ObjectId.isValid(itemId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Item.findById(itemId)
    // .populate("order")
    .then(item => res.status(200).json(item))
    .catch(err => res.json(err))
})

// PUT /shop/:itemId/edit - Updates a specific project by Id
router.put("/shop/:itemId/edit", (req, res) => {
    const { itemId } = req.params

    // Check if Id is valid
    if(!mongoose.Types.ObjectId.isValid(itemId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Item.findByIdAndUpdate(itemId, req.body, { new: true })
    .then(updatedItem => res.json(updatedItem))
    .catch(err => res.json(err))
})

//  DELETE /shop/:itemId - Deletes a specific project by Id
router.delete("/shop/:itemId", (req, res) => {
    const { itemId } = req.params

    if(!mongoose.Types.ObjectId.isValid(itemId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    // We should normally also delete the tasks for the project

    Item.findByIdAndDelete(itemId)
    .then(() => {
        res.json({ message: `Item with id:${itemId} has been removed successfully`})
    })
    .catch(err => res.json(err))
})

module.exports = router