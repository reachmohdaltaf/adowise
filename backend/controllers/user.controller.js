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

    let imageUrl;

    // If image is provided, upload to Cloudinary
    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'user_profiles',
      });

      imageUrl = uploadResult.secure_url;
    }

    // Dynamically build update object
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

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
