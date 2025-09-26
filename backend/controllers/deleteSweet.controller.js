import Sweet from "../models/sweet.model.js";

// Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    console.error("Error deleting sweet:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
