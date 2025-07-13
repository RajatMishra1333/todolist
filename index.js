const express = require("express");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'));

let tasks = []; 
app.get("/", (req, res) => {
  res.render("list", { tasks });
});

app.post("/", (req, res) => {
  const text = req.body.taskName.trim();
  if (text !== "") {
    const newTask = {
      id: Date.now().toString(),
      text
    };
    tasks.push(newTask);
  }
  res.redirect("/");
});

app.put("/tasks/:id", (req, res) => {
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

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter(task => task.id !== id);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log(" Server started");
});
