const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    // Get the access token from the request headers
    const token = req.headers.authorization.split(" ")[1]
  
    console.log(token)
    if (!token) {
      console.log(err)
      return res.status(401).json({ error: 'Access token not provided' });
    }
  
    // Verify and decode the access token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ error: 'Invalid access token' });
      }
  
      // Check if the user's role is 'admin'
      if (decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin permission required' });
      }
  
      // User is an admin, proceed to the next middleware or route handler
      next();
    });
  };

module.exports = { isAdmin };