import express from "express";
import { addSweet, listSweets, searchSweets, updateSweet, purchaseSweet, restockSweet } from "../controllers/sweet.controller.js";
import { deleteSweet } from "../controllers/deleteSweet.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", addSweet);
router.get("/", listSweets);
router.get("/search", searchSweets);
router.put("/:id", updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);
router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;


