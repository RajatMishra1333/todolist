const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// In-memory task array
let tasks = []; // Format: { id, text }

app.get("/", (req, res) => {
  res.render("list", { ejes: tasks });
});

app.post("/", (req, res) => {
  const text = req.body.hey.trim();
  if (text !== "") {
    const newTask = {
      id: Date.now().toString(),
      text
    };
    tasks.push(newTask);
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter(task => task.id !== id);
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedText = req.body.updatedText.trim();
  if (updatedText) {
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: updatedText };
      }
      return task;
    });
  }
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("✅ Server started on http://localhost:8000");
});
