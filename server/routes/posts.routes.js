import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controller/posts.controller.js'


const router = Router();



// router.get("/", (req, res) => { res.send("ROOT"); });

router.get("/posts", getPosts );

router.post("/posts", createPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

router.get("/posts/:id", getPost);

export default router;
