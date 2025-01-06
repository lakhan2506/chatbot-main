const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
});

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword ,this.password)
};

const User = mongoose.model('User',userSchema);

module.exports = User;