const express = require("express");
const router = express.Router({mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../Controller/reviews.js");

const {isloggedIn,valdiateReview, isReviewAuthor} = require("../middleware.js");



router.post(
  "/",
  isloggedIn,
  valdiateReview,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:reviewId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
