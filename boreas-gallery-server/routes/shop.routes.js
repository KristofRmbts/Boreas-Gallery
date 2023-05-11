const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Item = require("../models/Item.model")

// POST /shop - Creates a new item
router.post("/shop", (req, res) => {
    const { title, exhibition, description, price, size, material, border, image } = req.body

    Item.create({ title, exhibition, description, price, size, material, border, image, order: [] })
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

// GET /shop - Retrieves all of the items
router.get("/shop", (req, res) => {
    Item.find()
    // .populate("order")
    .then(allItems => res.json(allItems))
    .catch(err => res.json(err))
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

    Project.findByIdAndDelete(itemId)
    .then(() => {
        res.json({ message: `Item with id:${itemId} has been removed successfully`})
    })
    .catch(err => res.json(err))
})

module.exports = router