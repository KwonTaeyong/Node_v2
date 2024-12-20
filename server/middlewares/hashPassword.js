const bcrypt = require('bcrypt');

const hashPassword = (req, res, next) => {
    const { password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if(err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Internal Server Error');
        }
        req.body.password = hashedPassword;
        next();
    })
}

module.exports = hashPassword;