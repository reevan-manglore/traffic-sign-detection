const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"user name is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true,
        validate:{
        validator: function(v) {
            return /[A-Za-z0-9.]{3,}@[A-Za-z]{3,}\.[A-Za-z.]{2,}/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
    },
    password:{
        type:String,
        required:true,
        min:[4,"password should be atleast 4 charcters wide"],
    },
});


module.exports = mongoose.model("users",UserSchema);