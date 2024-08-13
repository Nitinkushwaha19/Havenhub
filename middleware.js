const Listing = require("./Models/Listing.js");
const Review = require("./Models/Review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must logged in!");
      return res.redirect("/users/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) =>  {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isReviewAuthor = async (req,res,next) => {
  let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error","You don't have valid credentials");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isOwner = async (req,res,next) => {
  let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error","You don't have valid credentials");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.valdiateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.valdiateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404, errMsg);
    } else {
      next();
    }
};