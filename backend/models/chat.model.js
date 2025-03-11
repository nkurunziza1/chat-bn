import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var chatSchema = new mongoose.Schema(
  {
    chatType: {
      type: String,
      required: true,
      enum: ["individual", "group"],
      default: "individual",
    },
    chatName: {
      type: String,
      required: true,
    },
    messageId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
