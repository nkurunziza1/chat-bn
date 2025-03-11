import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import Chat from "../models/chat.model.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, email } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ message: "A user with this email or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = gender === "male" 
      ? `https://avatar.iran.liara.run/public/boy?username=${username}`
      : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      email,
      profilePic
    });

    await newUser.save();
   const token = await generateTokenAndSetCookie(newUser._id, res);
  
   const allUsers = await User.find().select('-password');
   const allChat = allUsers.map(async(user, index)=>{
     const userChat = await Chat.create({
       participants:[newUser._id, user.id],
       chatName:`${newUser.username} Ⓜ️ ${user.username}`
     })
     await userChat.save();
     return userChat;
   })
   
    
    res.status(201).json({
      message: "User created successfully.",
      username: newUser.username,
      email: newUser.email,
      id: newUser._id,
      profilePic: newUser.profilePic,
      token
    });

  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required." });
    }

    const user = email 
      ? await User.findOne({ email }) 
      : await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = await generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Login successful.",
      username: user.username,
      email: user.email,
      id: user._id,
      profilePic: user.profilePic,
      token
    });

  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.clearCookie('jwt');
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};


export const testUser = async(req, res)=>{
    const {userId} = req.body
 try {
    const user = await User.findById(userId);
    const allUsers = await User.find().select('-password');
    const allChat =  await allUsers.map(async(user, index)=>{
      const userChat = await Chat.create({
        participants:[userId, user.id],
        chatName:`${user.username} Ⓜ️ ${user.username}`
      })
      await userChat.save();
      return userChat;
    })
    
  res.status(200).json(allChat);
 
 } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
    
 }
}