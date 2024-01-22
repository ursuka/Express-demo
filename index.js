const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");
const { name } = require("ejs");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

app.get("/", (req, res) => {
    res.render("home.ejs", { title: "home" })
})

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render("subreddit", { ...data, title: subreddit });
    } else {
        res.render("notfound.ejs", { title: subreddit })
    }
})

app.get("/cats", (req, res) => {
    const cats = [
        'Blue', "Roket", "Monty", "Winston", "Mike"
    ];
    res.render("cats.ejs", { cats, title: "cats" })
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random", { num, title: "randomn" })
})

app.listen(3000, () => {
    console.log("server started, port: 3000")
})