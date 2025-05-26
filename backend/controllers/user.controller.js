import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary/cloudinary.js";
export const UpdateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    // Basic validation
    if (!userId || !newRole) {
      return res
        .status(400)
        .json({ message: "userId and newRole are required" });
    }

    // Check for valid roles
    if (!["seeker", "expert"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      email,
      profession,
      about,
      socialLinks,
      image, // Base64 or direct URL
    } = req.body;

    // First, fetch the current user to check if they have an existing image
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    let imageUrl;

    // If a new image is provided, handle Cloudinary upload
    if (image) {
      // If the user already has an image in Cloudinary, delete it first
      if (currentUser.image) {
        // Extract the public_id from the Cloudinary URL
        const publicId = currentUser.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
      }

      // Upload the new image
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'user_profiles',
      });
      imageUrl = uploadResult.secure_url;
    }

    // Build update object
    const allowedUpdates = {
      ...(name && { name }),
      ...(email && { email }),
      ...(profession && { profession }),
      ...(about && { about }),
      ...(socialLinks && { socialLinks }),
      ...(imageUrl && { image: imageUrl }),
    };

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Something went wrong', 
      error: process.env.NODE_ENV === 'development' ? error.message : null 
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    req.user = req.user._id;

    // Find user by ID
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}