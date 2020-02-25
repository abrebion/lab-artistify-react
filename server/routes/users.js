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
  const mongoQuery = {};
  mongoQuery["_id"] = "5e54d6d970e4da479fa1497d";
  mongoQuery["favorites." + req.params.resourceType] = { $in: [req.params.id] };
  try {
    console.log("Mongo query", mongoQuery);
    const isAlreadyFavorite = await userModel.find(mongoQuery);
    console.log("Number of results:", isAlreadyFavorite.length, "\n", isAlreadyFavorite);
    let toggleFavoriteQuery = {};
    toggleFavoriteQuery["favorites." + req.params.resourceType] = req.params.id;
    if (isAlreadyFavorite.length) {
      console.log("------Already in favorites-----\n");
      await userModel.findByIdAndUpdate("5e54d6d970e4da479fa1497d", { $pull: toggleFavoriteQuery });
      res.status(200).json({ isFavorite: false, resource_id: req.params.id, resource_tyoe: req.params.resourceType });
    } else {
      console.log("------Added to favorites-----\n");
      await userModel.findByIdAndUpdate("5e54d6d970e4da479fa1497d", { $push: toggleFavoriteQuery });
      res.status(200).json({ isFavorite: true, resource_id: req.params.id, resource_tyoe: req.params.resourceType });
    }
  } catch (dbErr) {
    next(dbErr);
  }
});

module.exports = router;
