/*------------------------------------------
// USERS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get("/users", async (req, res, next) => {
  try {
    res.json({ users: await userModel.find() });
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    res.json(await userModel.findById(req.params.id));
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id/favorites", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user.favorites);
  } catch (dbErr) {
    next(dbErr);
  }
});

router.patch("/users/favorites/:resourceType/:id", async (req, res, next) => {
  // console.log("Current user >>>>", req.user);

  const mongoQuery = {};
  mongoQuery["_id"] = req.user._id;
  mongoQuery["favorites." + req.params.resourceType] = { $in: [req.params.id] };
  try {
    // console.log("Mongo query", mongoQuery);
    const isAlreadyFavorite = await userModel.find(mongoQuery);

    let toggleFavoriteQuery = {};
    toggleFavoriteQuery["favorites." + req.params.resourceType] = req.params.id;

    if (isAlreadyFavorite.length) {
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { $pull: toggleFavoriteQuery }, { new: true });
      res.status(200).json({ user: updatedUser });
    } else {
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { $push: toggleFavoriteQuery }, { new: true });
      res.status(200).json({ user: updatedUser });
    }
  } catch (dbErr) {
    next(dbErr);
  }
});

module.exports = router;
