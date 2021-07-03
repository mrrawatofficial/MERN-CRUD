import Post from "../model/postSchema.js";

//create a post
export const createPost = async (request, response) => {
  const postblog = request.body;
  try {
    await Post.create(postblog, (err, data) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.status(201).send("Blog Posted!!");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//get all blogs
export const getAllPosts = async (request, response) => {
  try {
    await Post.find((err, data) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.status(200).send(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//delete a blog
export const deletePost = async (request, response) => {
  const postToDelete = await Post.findById(request.params.id);
  try {
    if (postToDelete) {
      await postToDelete.deleteOne();
      response.status(200).send("the post has been deleted");
    } else {
      response.status(401).send("Post Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update a blog
export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await Post.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      {
        useFindAndModify: false,
      }
    );

    response.status(200).send("post updated successfully");
  } catch (error) {
    response.status(500).send(error);
  }
};
