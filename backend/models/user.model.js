import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    }
    ,
    status: { type: String, default: "Online" },
},{
    timestamps:true
});

//Export the model
const User = mongoose.model('User', userSchema);
export default User