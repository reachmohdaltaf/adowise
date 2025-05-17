import { Service } from "../models/service.model.js";

/**
 * @function CreateService
 * @description Creates a new service
 * @route POST /api/CreateService
 * @access Private
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains title, duration, and amount
 * @param {Object} res - Express response object
 * @returns {Object} 201 Created with service data or error message
 */

/**
 * @function getAllServices
 * @description Gets all services
 * @route GET /api/getAllServices
 * @access Private
 * 
 * @returns {Object} 200 OK with service data or error message
 */


export const CreateService = async (req, res) => {
  try {
    const { title, duration, amount, type } = req.body;
    const expertId = req.user._id; // logged-in user ka ID

    // @step Validate required fields
    if (!title  || !amount || !type || !expertId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // @step Create new service
    const service = await Service.create({ title, amount, type, expertId, duration });
    if (!service) {
      return res.status(500).json({ error: "Internal server error" });
    }
    // @success Return created service
    res.status(201).json(service);
  } catch (error) {
    // @error Handle errors
    console.error("Error in CreateService:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const MyServices = async (req, res) => {
  try {
    const expertId = req.user._id; // logged-in user ka ID
    const services = await Service.find({ expertId }); // sirf us expert ke services
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in MyServices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const UpdateServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { title, tags, description, duration, amount, type } = req.body;

    // Check if service exists
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Update fields if they are provided
    if (title !== undefined) existingService.title = title;
    if (tags !== undefined) existingService.tags = tags;
    if (description !== undefined) existingService.description = description;
    if (duration !== undefined) existingService.duration = duration;
    if (amount !== undefined) existingService.amount = amount;
    if (type !== undefined) existingService.type = type;

    // Save updated service
    const updatedService = await existingService.save();

    // Return updated service
    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error in UpdateService:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetServiceById = async (req, res) =>{
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    res.status(200).json(service);
  } catch (error) {
    console.error("Error in GetServiceById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const DeleteServiceById = async (req, res) =>{
  try {
    const { serviceId } = req.params;
    const service = await Service.findByIdAndDelete(serviceId);
    res.status(200).json(service);
  } catch (error) {
    console.error("Error in DeleteServiceById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

