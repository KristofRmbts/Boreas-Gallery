const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require("jsonwebtoken")

const { isAuthenticated } = require("./../middleware/jwt.middleware")

const User = require("./../models/User.model")
const saltRounds = 10


// POST /auth/signup - Creates a new user in the database
router.post("/signup", (req, res) => {
  const { email, password } = req.body

  // Check if email or password or name are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email, password and name" })
    return
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Provide a valid email address.' });
      return;
    }
      
  // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }

  User.findOne({email})
    .then(foundUser => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists"})
        return 
      }
      
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      User.create({ email, password: hashedPassword, order: []})
      .then(createdUser => {
        const { email, name, _id } = createdUser
        const user = { email, name, _id }
  
        res.status(201).json({ user: user })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Internal Server Error" })
    })
});


// POST /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res) => {
  const { email, password } = req.body

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" })
    return
  }

  User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        res.status(400).json({ message: "User not found" })
        return
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password)

      if (passwordCorrect) {
        const { _id, email, role } = foundUser

        const payload = { _id, email, role }

        // Create and sign the token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "6h" }
        )

        res.status(200).json({ authToken: authToken })
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" })
      }
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }))
})


// GET /auth/verify - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res) => {
  console.log("req.payload", req.payload)
  res.status(200).json(req.payload)
})

module.exports = router;