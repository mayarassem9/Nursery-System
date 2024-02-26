const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const admin = require("../Model/adminSchema");
const Teacher = require("../Model/teacherSchema");

exports.login = (req, res, next) => {
    const { email, password } = req.body; // Destructure for cleaner access
    if (email === process.env.admin && password == process.env.password) {
        const token = JWT.sign({ email, role: "admin" }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        }); // Optional: add expiration
        return res.status(200).json({ token: token });
    } else {
        console.log("name :>> ", email);
        Teacher.findOne({ email })
            .then((teacher) => {
                if (!teacher) {
                    return res.status(401).json({ message: "Incorrect email" });
                }

                // Compare provided password with hashed password
                bcrypt
                    .compare(password, teacher.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            // If the password doesn't match
                            return res.status(401).json({ message: "Incorrect Password" });
                        }

                        // Password matches, sign the token
                        const token = JWT.sign(
                            { id: teacher._id, role: "teacher" },
                            process.env.SECRET_KEY,
                            { expiresIn: "1h" }
                        ); // Optional: add expiration
                        res.status(200).json({ token: token });
                    })
                    .catch((err) => {
                        // Handle bcrypt error
                        console.error(err);
                        res
                            .status(500)
                            .json({ message: "Server error during authentication" });
                    });
            })
    }
}