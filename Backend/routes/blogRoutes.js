import express from "express";
import protectedRouteMiddleware from "../middleware.js";
import uploadSingleFile from "../multer.js";
import getAllBlogsController from "../controllers/getAllBlogsController.js";
import getMyBlogsController from "../controllers/getMyBlogsController.js";
import getSingleBlogController from "../controllers/getSingleBlogController.js";
import addBlogController from "../controllers/addBlogController.js";
import editBlogController from "../controllers/editBlogController.js";
import deleteBlogController from "../controllers/deleteBlogController.js";

const router = express.Router();

router.get("/get-all-blogs", getAllBlogsController);
router.get("/get-all-blogs/:id", getSingleBlogController);
router.get("/get-my-blogs", protectedRouteMiddleware, getMyBlogsController);
router.get(
  "/get-my-blogs/:id",
  protectedRouteMiddleware,
  getSingleBlogController
);
router.post(
  "/add-blog",
  protectedRouteMiddleware,
  uploadSingleFile,
  addBlogController
);
router.patch(
  "/edit-blog/:id",
  protectedRouteMiddleware,
  uploadSingleFile,
  editBlogController
);
router.delete(
  "/delete-blog/:id",
  protectedRouteMiddleware,
  deleteBlogController
);

export default router;
