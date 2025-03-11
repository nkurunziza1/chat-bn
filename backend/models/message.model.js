import mongoose from 'mongoose'// Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    chatId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Chat',
      required:true
    },
    content:{
        type:String,
        required:true,
    },
    messageType:{
        type:String,
        enum:['text','video','image'],
        required:true,
        default:'text'
    },
    sentAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    status:{
        type:String,
        enum:['sent','delivered','read'],
        required:true,
        default:'sent'
    }
});

//Export the model
const Message = mongoose.model('Message', messageSchema);

export default Message