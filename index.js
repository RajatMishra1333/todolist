const express = require("express");
const mongoose = require("mongoose");
const index = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema and Model
const taskSchema = new mongoose.Schema({
    text: String,
    priority: String,
});

const Task = mongoose.model("Task", taskSchema);

// Set EJS as templating engine
index.set("view engine", "ejs");

// Middleware
index.use(express.static('public'));
index.use(express.urlencoded({ extended: true }));

// GET - Homepage
index.get("/", async (req, res) => {
    const filter = req.query.priority || "All";
    let tasks = await Task.find();

    if (filter !== "All") {
        tasks = tasks.filter(task => task.priority === filter);
    }

    res.render("list", { ejes: tasks, filter });
});

// POST - Add Task
index.post("/", async (req, res) => {
    const text = req.body.hey.trim();
    const priority = req.body.priority || "Low";

    if (text !== "") {
        await Task.create({ text, priority });
    }
    res.redirect("/");
});

// POST - Delete Task
index.post("/delete/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// POST - Edit Task
index.post("/edit/:id", async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { text: req.body.updatedText });
    res.redirect("/");
});

// Start server
index.listen(8000, function () {
    console.log("✅ Server started on http://localhost:8000");
});
