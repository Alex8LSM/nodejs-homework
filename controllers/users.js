const { userService, imageService, emailService } = require('../services');
const { createError } = require('../helpers/errors');
const { schemaSubscription } = require('../models/user');
const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    await emailService.sendEmail(user.email, user.verificationToken);
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

const confirm = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userService.findUser({ verificationToken });
    if (!user) {
      throw createError(404, 'User not found');
    }

    await userService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      code: 200,
      message: 'Verification successful',
    });
  } catch (e) {
    next(e);
  }
};

const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createError(400, 'missing required field email');
    }
    const user = await userService.findUser({ email });
    if (!user) {
      throw createError(404, 'User was not found');
    }

    if (user.verify) {
      throw createError(400, 'Verification has already been passed');
    }
    await emailService.sendEmail(user.email, user.verificationToken);
    return res.status(200).json({
      code: 200,
      message: 'Verification email sent',
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

const updateUserAvatar = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const avatarURL = await imageService.uploadImage(id, req.file);
    await userService.updateUser(id, { avatarURL });

    res.json({ avatarURL });
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
  updateUserAvatar,
  confirm,
  resend,
};
