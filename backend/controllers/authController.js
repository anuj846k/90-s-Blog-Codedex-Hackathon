const AppError = require("../utils/appError");
const { User } = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const zod = require("zod");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});
const loginSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
const updateBody = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});

//Helper function to filter allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.signup = catchAsync(async (req, res, next) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return next(
      new AppError(
        "Invalid input. Please provide firstname, lastname, username (email), and password",
        400
      )
    );
  }
  
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return next(new AppError("Username or Email already exists", 400));
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  // Generate token using the newUser._id
  const token = signToken(newUser._id);

  // Remove password from output
  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    },
    message: "User created successfully",
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return next(new AppError("Invalid input data", 400));
  }

  //Check if user Id exists or not

  if (!req.userId) {
    return next(new AppError("Please log in to update your profile", 401));
  }

  const filteredBody = filterObj(req.body, "password", "firstname", "lastname");
  const updatedUser = await User.findByIdAndUpdate(req.userId, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  updatedUser.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
    message: "User updated successfully",
  });
});

exports.bulk = catchAsync(async (req, res, next) => {
  const filter = req.query.filter?.trim() || "";

  const users = await User.find({
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } },
    ],
  });
  if (users.length === 0) {
    return next(
      new AppError(`No users found matching the filter: ${filter}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    users: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { success } = loginSchema.safeParse(req.body);
  if (!success) {
    return next(new AppError("Pls provide username/email and password", 400));
  }
  const user = await User.findOne({ username: req.body.username }).select(
    "+password"
  );

  if (
    !user ||
    !(await user.correctPassword(req.body.password, user.password))
  ) {
    return next(new AppError("Incorrect username/email or password", 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
    },
  });
});


exports.profile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
      }
    }
  });
});