import Post from "../models/Post.js";
import fs from "fs-extra";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      myMessage: "No se han podido cargar los Posts",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return !post ? res.sendStatus(404) : (/*console.log(post),*/ res.json(post));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      myMessage: "No se han podido cargar el Post",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image; // = {url:"", public_id:""};
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No hay imagen para enviar");
    } else {
      console.log(req.files);
    }
    if (req.files?.image) {
      // console.log(req.files)
      // subir a claudinary
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image });

    await newPost.save();

    console.log(newPost);
    res.json(newPost);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      myMessage: "No se han podido generar el Post",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    // console.log("Params");
    // console.log(req.params);
    // console.log("Body");
    // console.log(req.body);
    // console.log("Files");
    // console.log(req.files);

    if (req.files?.image) {
      // console.log(req.files)
      // subir a claudinary
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      const oldPost = await Post.findById(req.params.id);
      console.log("Old Post")
      
      console.log(oldPost)
      if (oldPost.image?.public_id) {
        const resDelete = await deleteImage(oldPost.image.public_id);
        // console.log("ELiminación Previa")
        // console.log(resDelete);
      }
    }

    const UpdatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // retorna la publicaciòn nueva por el new true, caso contrario retorna la publicaciòn en estado previo
    // res.send(UpdatedPost);
    console.log(UpdatedPost);
    res.json(UpdatedPost);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      myMessage: "No se han podido actualizar el Post",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    // Post.deleteOne({ _id: req.params.id });
    const postRemove = await Post.findByIdAndDelete(req.params.id);
    console.log(postRemove);
    if (!postRemove) return res.sendStatus(404);

    if (postRemove.image.public_id) {
      deleteImage(postRemove.image.public_id); // Encontre y elimonó
    }
    console.log(postRemove);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      myMessage: "No se han podido eliminar el Post",
    });
  }
};
