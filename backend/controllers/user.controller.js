import { User } from '../models/user.model.js';

export const UpdateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    // Basic validation
    if (!userId || !newRole) {
      return res.status(400).json({ message: 'userId and newRole are required' });
    }

    // Check for valid roles
    if (!["seeker", "expert"].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User role updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
 
}
