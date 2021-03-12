const express = require('express')

//Let's try this and come back with new results for now
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");



const multer = require("multer");
const checkAuth = require("../middlewares/check-auth");
const Profile = require('../models/profile');
const Post = require('../models/post');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];

        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");

        console.log(name)
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

const router = express.Router();

// router.post("/create", checkAuth, upload.single("image"), async (req, res) => {
//     try {
//       // Upload image to cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);
//        // Create new user
//       let profile = new Profile({
//         username: req.body.username,
//         bio: req.body.bio,
//         imagePath: result.secure_url,
//         creator: req.userData.userId
//         // cloudinary_id: result.public_id,
//       });
//       const user1 = await Profile.findOne({creator: req.userData.userId})
//       if(user1){
              
//         return res.status(401).json({
//           message: "Profile Already Exist"
//         })
//       }
//       // Save user
//       await profile.save();
//     //   res.json(user);
//       res.status(201).json({
//         message: "Profile created!",
//         profile: prof
//       })
//     } catch (err) {
//       console.log(err);
//     }}); 



router.post("/create", checkAuth,
    multer({ storage: storage }).single("image"),
    async(req, res, next) => {
       
        const result = await cloudinary.uploader.upload(req.file.filename); 
        // const url = req.protocol + "://" + req.get("host")
        console.log(url)
        const profile = new Profile({
            username: req.body.username,
            bio: req.body.bio,
            imagePath: result.secure_url,
            creator: req.userData.userId
        })
   
          Profile.findOne({creator: req.userData.userId}).then(user1=>{
            if(user1){
              
              return res.status(401).json({
                message: "Profile Already Exist"
              })
            }
            return  profile.save()
        }).then(prof => {
          
            if(!prof){
                return res.status(500).json({
                  message: "Error Creating Profile"
                })
              }
              res.status(201).json({
                message: "Profile created!",
                profile: prof
              });

            })
            .catch(e => {
                console.log("error is",e)
            })
    })

    router.put(
        "/edit/:id",
        checkAuth,
        multer({ storage: storage }).single("image"),
        (req, res, next) => {
            let imagePath = req.body.imagePath;
            const url = req.protocol + "://" + req.get("host")
            if (req.file) {
                const url = req.protocol + "://" + req.get("host");
                imagePath = url + "/images/" + req.file.filename
            }
         
            const profile = new Profile({
                _id: req.body.id,
                username: req.body.username,
                bio: req.body.bio,
                imagePath:imagePath,
                creator: req.userData.userId
            })
           
            Profile.updateOne(
                { _id: req.params.id, creator: req.userData.userId },
                profile
              ).then(result => {
                if(result){
                    res.status(200).json({ message: "Update successful!" });
                }
                
                else {
                    res.status(500).json({ message: "Error Upating Profile" });
                }
            })
            .catch(e=>{
                res.status(500).json({ message: "Error Upating Profile ,Username taken" });
                console.log(e)
            });
        }
    );
    
    router.get("/profiles",
    (req, res, next) => {
        Profile.find().then(prof => {
            if (prof) {
              
                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        })
        .catch(e=>{
            console.log(e)
        });
    });
  
    

router.get("/viewprofile", checkAuth,
    (req, res, next) => {
        Profile.findOne({ creator: req.userData.userId }).then(prof => {
            if (prof) {
              
                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        });
    });


    
router.get("/bycreator/:id",
(req, res, next) => {
    Profile.findOne({ creator: req.params.id }).then(prof => {
        if (prof) {
          
            res.status(200).json({
                message: "Profile fetched successfully!",
                profile: prof
            });
        } else {
            res.status(404).json({ message: "Profile not found!" });
        }
    });
});
    router.get("/:id/mypost",
    (req, res, next) => {
        let user
        let creatorId
        Profile.findOne({ username: req.params.id }).then(prof => {
            if (prof) {
               user=prof
              return  Post.find({creator:user.creator})
            } 
        }).then(post=>{

            res.status(200).json({
                message: "Post fetched successfully!",
                post: post
            });
        })
        .catch(e=>{
            console.log(e)
            res.status(404).json({ message: "error Fetching Post!" });
        });
    });

    router.get("/:id",
    (req, res, next) => {
        let creatorId
        Profile.findOne({ username: req.params.id }).then(prof => {
            if (prof) {
                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        });
    });


module.exports = router