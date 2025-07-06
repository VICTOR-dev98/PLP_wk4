const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    titlle: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
});

module.exports = mongoose.model("Task", taskSchema);