const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Exhibition = require("../models/Exhibition.model")
const fileUploader = require('../config/cloudinary.config')

// GET /exhibition - Retrieves all of the items
router.get("/exhibitions", (req, res) => {
    Exhibition.find()
    .then(allExhibitions => res.json(allExhibitions))
    .catch(err => res.json(err))
})

// Upload image to Cloudinary
router.post("/exhibitions/upload", fileUploader.array("images"), (req, res, next) => {
   
    if (!req.files) {
      next(new Error("No files uploaded!"));
      return;
    }
    
    const fileUrls = req.files.map((file) => file.path);
    res.json({ fileUrls });
});

// POST /exhibitions - Creates a new exhibition
router.post("/exhibitions", (req, res) => {
    const { title, artist, description, subtext1, subtext2, subtext3, runningTime, images } = req.body

    Exhibition.create({ title, artist, description, subtext1, subtext2, subtext3, runningTime, images  })
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

// GET /exhibition - Retrieves latest exhibition
router.get("/exhibitions/latest", (req, res) => {
    Exhibition.find()
    .then(allExhibitions => {
        // res.json(allExhibitions)
        res.json({latestExhibition: allExhibitions.sort((a, b) => b.createdAt - a.createdAt)[0]})
    })
    .catch(err => res.json(err))
})

// GET /exhibitions/:exhibitionId = Retrieves a specific project by Id
router.get("/exhibitions/:exhibitionId", (req, res) => {
    const { exhibitionId } = req.params

    // Check if Id is valid
    if(!mongoose.Types.ObjectId.isValid(exhibitionId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Exhibition.findById(exhibitionId)
    .then(exhibition => res.status(200).json(exhibition))
    .catch(err => res.json(err))
})

// PUT /shop/:itemId/exhibitionId - Updates a specific project by Id
router.put("/exhibitions/:exhibitionId/edit", (req, res) => {
    const { exhibitionId } = req.params

    // Check if Id is valid
    if(!mongoose.Types.ObjectId.isValid(exhibitionId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Exhibition.findByIdAndUpdate(exhibitionId, req.body, { new: true })
    .then(updatedExhibition => res.json(updatedExhibition))
    .catch(err => res.json(err))
})

//  DELETE /exhibitions/:exhibitionId - Deletes a specific project by Id
router.delete("/exhibitions/:exhibitionId", (req, res) => {
    const { exhibitionId } = req.params

    if(!mongoose.Types.ObjectId.isValid(exhibitionId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    // We should normally also delete the tasks for the project

    Exhibition.findByIdAndDelete(exhibitionId)
    .then(() => {
        res.json({ message: `Item with id:${exhibitionId} has been removed successfully`})
    })
    .catch(err => res.json(err))
})

module.exports = router