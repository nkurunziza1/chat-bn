import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSockectId, io } from "../soket.io/soket.js";

const sendMessage = async (req, res) => {
  try {
		const { content } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let chat = await Chat.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!chat) {
       const user =  await User.findById(receiverId)
			chat = await Chat.create({
				participants: [senderId, receiverId],
        chatName:`${user.username} Ⓜ️ ${req.user.username}`        
			});
		}

		const newMessage = new Message({
      chatId:chat._id,
			senderId,
			receiverId,
			content,
		});

		if (newMessage) {
			chat.messageId.push(newMessage._id);
		}

		// await chat.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([chat.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId =  getReceiverSockectId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};







const getMessages = async(req, res)=>{
  try {
		const receiverId = req.params.id;
		const senderId = req.user._id;
    // console.log({receiverId}, {senderId})

		const chat = await Chat.findOne({
			participants: { $all: [senderId, receiverId]},
		}).populate("messageId"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!chat) return res.status(200).json([]);

		const messages = chat.messageId;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
} 

export {
     sendMessage,
     getMessages,

};
