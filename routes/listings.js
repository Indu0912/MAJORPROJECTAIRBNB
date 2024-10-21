const express= require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");

const multer  = require('multer');
const {storage}=require("../cloudConfig.js");


const upload = multer({ storage });
const listingController = require("../controllers/listings.js");
router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
   wrapAsync(listingController.createListing));



 //New Route
 router.get("/new", isLoggedIn,listingController.renderNewForm);

   router
   .route("/:id")
   .get(  wrapAsync(listingController.showListing))

   .put(
    isLoggedIn,isOwner,
     
     upload.single("listing[image]"),
     validateListing,
      wrapAsync(listingController.updateListing))
     .delete( isLoggedIn,isOwner,
        wrapAsync(listingController.destroyListing));





// //Index Route
// router.get("/", wrapAsync(listingController.index)
// );
//    
    //Show Route
    
    //create route
    // app.post("/listings", 
    //     wrapAsync(async(req,res,next)=>{
      
    //     const newListing=new Listing(req.body.listing);
    //     await newListing.save();
    //     res.redirect("/listings");
      
    // })
    
    
    // );
    // router.post("/",isLoggedIn,
    //      validateListing,
    //     wrapAsync(listingController.createListing));
    //edit route
    router.get("/:id/edit",isLoggedIn,isOwner,
         wrapAsync(listingController.renderEditForm));
    
    //update router
    //delete routing
    

    module.exports= router;