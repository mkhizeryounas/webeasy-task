var express = require("express");
var router = express.Router();
const Joi = require("joi");
const common = require("../helpers/common");
const User = require("../models/User");

/**
 * DOCS: https://documenter.getpostman.com/view/225012/RWMHM7a3
 */

/* GET users listing. */
router.get("/", async (req, res) => {
  let tmp = await User.find({
    "geoLocation.city": req.query.city || { $ne: true },
    "geoLocation.country": req.query.country || { $ne: true }
  });
  res.json(tmp);
});

/* POST new user */
router.post("/", async (req, res) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      geoLocation: Joi.object().keys({
        country: Joi.string().required(),
        city: Joi.string().required()
      })
    });
    let validate = await common.validate(req.body.user || {}, schema);
    let newUser = new User(validate);
    let result = await newUser.save();
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
