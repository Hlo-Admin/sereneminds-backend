const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

// Document routes
router.post("/", documentController.createDocument);
router.get("/", documentController.getDocuments);
router.get("/:id", documentController.getDocumentById);
router.get("/:id/download", documentController.downloadDocument);
router.delete("/:id", documentController.deleteDocument);
router.patch("/:id/toggle-status", documentController.toggleStatus);

module.exports = router;


