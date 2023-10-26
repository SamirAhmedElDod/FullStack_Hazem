const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs");
// const users = require("../models/users");

// TRYING
// var storage2 = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "")
//   }
// })

// image Upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
  },
});

var upload = multer({
  storage: storage,
}).fields([{ name: 'cv' }, { name: 'image' }]);
//fields("cv", "image")

// Insert an USer Into Db Router
router.post("/add", upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    Phone: req.body.Phone,
    price: req.body.price,
    sport: req.body.sport,
    cv: req.files.cv[0],
    image: req.files.image[0],
  });
  user.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "Danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "User Added Successfully",
      };
      res.redirect("/");
    }
  });
});
// Get All USers Route
router.get("/", (req, res) => {
  // res.render("index", { title: "Gym Admin" });
  User.find().exec((err, users) => {
    if (err) {
      res.json({ message: error.message });
    } else {
      res.render("index", {
        title: "Gym Admin",
        users: users,
      });
    }
  });
});

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});
// Edit User Routes
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      if (user == null) {
        res.redirect("/");
      } else {
        res.render("edit_users", {
          title: "Edit Trainer",
          user: user,
        });
      }
    }
  });
});

// update User Route
router.post("/update/:id", upload, (req, res) => {
  let id = req.params.id;
  // let new_image = "";
  // if (req.files) {
  //   new_image = req.files.image[0].filename;
  //   // console.log(req.files.image[0].filename);
  //   // console.log(req.files);
  //   try {
  //     // console.log(req.body.old_image);
  //     // console.log(req.body);
  //     fs.unlinkSync("./uploads/" + req.body.old_image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } else {
  //   new_image = req.body.old_image;
  // }

  User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      price: req.body.price,
      Phone: req.body.Phone,
      sport: req.body.sport
      // cv: req.body.cv,
      // image: new_image,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "User Updated Successfully",
        };
        res.redirect("/");
      }
    }
  );
});

//DELETE Trainer
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (err, result) => {
    if (result.image != "") {
      try {
        fs.unlinkSync("./uploads/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }

    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "info",
        message: "Trainer deleted Successfully",
      };
      res.redirect("/");
    }
  });
});

// Trying 
// 1 => create the routes
// 2 => create the ejs 
// 3 => link the user from the model user mongo
router.get("/test", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      res.json({ message: error.message });
    } else {
      res.render("read-index", {
        title: "Gym Trainer",
        users: users,
      });
    }
  })
})
module.exports = router;
