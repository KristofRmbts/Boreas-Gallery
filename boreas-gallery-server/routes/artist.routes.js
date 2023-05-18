const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Artist = require("./../models/Artist.model")
const fileUploader = require('./../config/cloudinary.config')
const { isAdmin } = require("./../middleware/isAdmin.middleware")

// GET /artists - Retrieves all of the artists
router.get("/artists", (req, res) => {
    Artist.find()
    .then(allArtists => res.json(allArtists))
    .catch(err => res.json(err))
})


// Upload image to Cloudinary
router.post("/artist/upload", fileUploader.single("imageUrl"), (req, res, next) => {
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });


// POST /artists - Creates a new artist
router.post("/artists", isAdmin, (req, res) => {
    const { firstName, lastName, description, email, social1, social2, social3, imageUrl } = req.body

    Artist.create({ firstName, lastName, description, email, social1, social2, social3, imageUrl })
    .then(response => res.json(response))
    .catch(err => res.json(err))
})


// GET /artists/:artistId = Retrieves a specific artist by Id
router.get("/artists/:artistId", (req, res) => {
    const { artistId } = req.params

    // Check if Id is valid
    if(!mongoose.Types.ObjectId.isValid(artistId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Artist.findById(artistId)
    .then(artist => res.status(200).json(artist))
    .catch(err => res.json(err))
})


// PUT /artists/:artistId/edit - Updates a specific artist by Id
router.put("/artists/:artistId/edit", isAdmin, (req, res) => {
    const { artistId } = req.params

    // Check if Id is valid
    if(!mongoose.Types.ObjectId.isValid(artistId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Artist.findByIdAndUpdate(artistId, req.body, { new: true })
    .then(updatedArtist => res.json(updatedArtist))
    .catch(err => res.json(err))
})


//  DELETE /artists/:artistId - Deletes a specific artist by Id
router.delete("/artists/:artistId", isAdmin, (req, res) => {
    const { artistId } = req.params

    if(!mongoose.Types.ObjectId.isValid(artistId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
    }

    Artist.findByIdAndDelete(artistId)
    .then(() => {
        res.json({ message: `Item with id:${artistId} has been removed successfully`})
    })
    .catch(err => res.json(err))
})

module.exports = router