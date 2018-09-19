const bcrypt = require('bcryptjs');

const hashPassword = (req, res, next) => {
    if (req.body.password) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            req.password = hash;
            next();
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        next();
    }
}

module.exports = hashPassword;