const bcrypt = require("bcryptjs");//for hashing
const jwt = require("jsonwebtoken");
const User = require("../models/User");


//Singup Endpoint Logic
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    const exixtx = await User.findOne({ email });
    if(exists) return res.status(400).json({ message: "User already exists"});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    res.json(token);
};

//Login Endpoint Logic
exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found"});

    const match = await bcrypt.compare(password, user.password);
    if (!user) return res.status(401).json({ message:"incorrect password"});

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    res.json(token);
}