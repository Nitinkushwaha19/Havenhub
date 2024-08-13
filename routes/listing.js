const express = require("express");
const router = express.Router();
const Listing = require("../Models/Listing");

const multer = require("multer");
const { storage } = require("../Cloudinary.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../Controller/listings.js");
const sendMail = require("../Controller/NodeMailer.js");

const { isloggedIn, isOwner, valdiateListing } = require("../middleware.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedIn,
    upload.single("listing[image]"),
    valdiateListing,
    wrapAsync(listingController.createListing)
  );

// new route
router.get("/new", isloggedIn, listingController.renderNewForm);

router.get("/search",wrapAsync( listingController.searchListing));

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    upload.single("listing[image]"),
    valdiateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

router.post(
  "/:id/sendMail",
  wrapAsync(sendMail)
);

module.exports = router;
