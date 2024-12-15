const Post = require("../Model/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const zod = require('zod');

const postSchema = zod.object({
  title: zod.string(),
  content: zod.string(),
  tags: zod.array(zod.string()).optional(),
  image: zod.string().optional(),
  isPublished: zod.boolean().optional()
});

exports.createPost = catchAsync(async (req, res) => {
  const { title, content, tags, isPublished, image } = req.body;
  const authorId = req.userId;
  const authorMetadata = {
    name: req.body.name,
    email: req.body.email
  };

  const newPost = await Post.create({
    title,
    content,
    tags,
    authorId,
    authorMetadata,
    isPublished,
    image
  });

  res.status(201).json({
    status: 'success',
    data: { post: newPost }
  });
});

exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: { posts }
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { post }
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { title, content, tags, isPublished } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  if (post.authorId !== req.userId) {
    return next(new AppError('Not authorized to update this post', 403));
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.tags = tags || post.tags;
  post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;
  post.updatedAt = Date.now();

  const updatedPost = await post.save();

  res.status(200).json({
    status: 'success',
    data: { post: updatedPost }
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  if (post.authorId !== req.userId) {
    return next(new AppError('Not authorized to delete this post', 403));
  }

  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});