const JWT = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// verifies the authenticitiy of a user's JWT
const verifyJWT = (req, res, next) => {
    const { jwt } = req.headers; // here the JWT needs to be passed through the header of the request
    JWT.verify(jwt, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ loginMiddlewareError: "There was an error while verifying the users' JWT" }); // if this kind of error is received, the user needs to be redirected
        req.email = decoded.email;
        next();
    })
}

module.exports = verifyJWT;