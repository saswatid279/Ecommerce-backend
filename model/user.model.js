const mongoose = require("mongoose");
require("mongoose-type-url");
const bcrypt = require('bcrypt')

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: "Username must be unique",
    required: "Username is required"
  },
  email: {
    type: String,
    unique: "Email must be unique",
    lowercase:true,
    required: "Email is required",
    validate: [validateEmail, 'Enter a valid email address'],
  },
  password: {
    type: String,
    required: "Password is required"
  },
  profilePhotoUrl: {
    type: mongoose.SchemaTypes.Url,
    default:
      "https://res.cloudinary.com/dvrti07sl/image/upload/v1631295085/clipart3636751_thtv7t.png"
  }
});

UserSchema.pre("save", function (next) {
  const user = this
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})




const User = mongoose.model("user", UserSchema);

module.exports = { User };
