import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import verifyRoles from "../../middleware/verifyRole.js";
import db from "../../model/index.js";
import upload from "../../middleware/uploadFile.js";

import { movieController } from "../../controllers/movieController.js";
import { validate } from "./validate.js";
import { verifyAdmin } from "../../middleware/verifyAdmin.js";

const movieRouter = express.Router();

movieRouter.post(
  "/",
  upload.single("backdrop_path"),
  (req, res, next) => {
    if (!req.file) {
      req.body.image = null;
    } else {
      req.body.image = req.file.filename;
    }
    next();
  },
  validate.insertValid(),
  verifyToken,
  verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.insertMovie
);
movieRouter.put(
  "/",
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) {
      req.body.image = null;
    } else {
      req.body.image = req.file.filename;
    }
    next();
  },
  verifyToken,
  verifyRoles(db.ROLES),
  movieController.updateMovie
);
movieRouter.delete(
  "/",
  verifyToken,
  verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.deleteMovie
);
movieRouter.get("/allmovie", movieController.getAllmovies);
movieRouter.get("/count", movieController.getCountMovie);
movieRouter.get("/search", movieController.FilterMovies);
movieRouter.get(
  "/:userid",
  verifyToken,
  verifyRoles(db.ROLES),
  // verifyAdmin,
  movieController.getMovieByUser
);
movieRouter.get("/", movieController.getAllmovie);

export default movieRouter;
