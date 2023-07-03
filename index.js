import app from "./config/express";

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(3000, console.log("Server Ready"));
