import User from "../modal/user.modal.js";

export const test = (req, res) => {
  res.send("hello world");
};
export const update = async (req, res, next) => {
  const paramId = req.params.id;
  try {
    const user = await User.findOneAndUpdate(
      { _id: paramId },
      {
        username: req.body.username,
        email: req.body.email,
      },
      { new: true }
    );
    res.status(201).json("User updated successfully");
  } catch (error) {
    next(error);
  }
};
