const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask");

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
mongoose.set("useFindAndModify", false);

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    console.log(tasks);
    res.render("todo.ejs", { todoTasks: tasks });
  });
});

app.post("/", async (req, res) => {
  const { content } = req.body;

  const todoTask = new TodoTask({ content });

  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

app
  .route("/edit/:id")
  .get((req, res) => {
    const { id } = req.params;

    TodoTask.find({}, (err, tasks) => {
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const { id } = req.params;

    const { content } = req.body;

    TodoTask.findByIdAndUpdate(id, { content }, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  });

app.route("/remove/:id").get((req, res) => {
  const { id } = req.params;

  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("connected to dvd");

  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
});
