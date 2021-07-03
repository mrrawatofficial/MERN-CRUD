import User from "../model/userSchema.js";
import bcrypt from "bcrypt";

//Register a user
export const registerUser = async (request, response) => {
  const passwordHash = bcrypt.hashSync(request.body.password, 10);

  const user = {
    name: request.body.name,
    email: request.body.email,
    password: passwordHash,
    profile: request.body.profile,
  };
  const matched_users_promise = await User.findOne({
    email: request.body.email,
  });
  if (!matched_users_promise) {
    try {
      await User.create(user, (err, data) => {
        if (err) {
          response.status(500).send(err);
        } else {
          response.status(200).send("User Registered Succesfully");
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    response.status(500).send("User Already Registered");
  }
};

//login a user
export const loginUser = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    !user && response.status(404).send("user not found");
    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    !validPassword && response.status(400).send("wrong password");
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

//get all Users
export const getAllUsers = async (request, response) => {
  try {
    await User.find((err, data) => {
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
export const deleteUser = async (request, response) => {
  const userToDelete = await User.findById(request.params.id);
  // console.log(request.params.id);
  if (!userToDelete) {
    response.status(401).send("User Not Found");
  } else {
    try {
      await userToDelete.deleteOne();
      response.status(200).send("User been deleted");
    } catch (error) {
      esponse.status(401).send(error);
    }
  }
  // try {
  //   if (userToDelete) {
  //     await userToDelete.deleteOne();
  //     response.status(200).send("User been deleted");
  //   } else {
  //     response.status(401).send("User Not Found");
  //   }
  // } catch (error) {
  //   response.status(401).send(error);
  // }
};

//update a blog
export const updateUser = async (request, response) => {
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
