const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(201).json(blogs);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let blog = await Blog.findOne({ _id: req.params.id });
    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (e) {
    res.status(400).json({ message: "Couldnt find it." });
  }
});

router.post("/add", async (req, res) => {
  console.log("=============");
  console.log(req.body);
  console.log("=============");
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    createdAt: new Date(),
  });
  try {
    blog = await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }
    if (req.body.image) {
      blog.image = req.body.image;
    }
    blog = await blog.save();
    res.status(200).json({ success: "did it" });
  } catch (err) {
    res.status(400).json({ message: "ess" });
  }
});

module.exports = router;
