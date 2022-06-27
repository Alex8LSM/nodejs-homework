const { userService } = require('../services');
const { createError } = require('../helpers/errors');
const { schemaSubscription } = require('../models/user');
const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    res.json({
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await userService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
const currentUser = async (req, res, next) => {
  const user = req.user;
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

const editUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { error } = schemaSubscription.validate(req.body);
    if (error) {
      console.log(error);
      throw createError(400, error.message);
    } else {
      const user = await userService.updateUserSubscription(
        req.user._id,
        subscription
      );
      res.status(200).json(user);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  editUserSubscription,
};
