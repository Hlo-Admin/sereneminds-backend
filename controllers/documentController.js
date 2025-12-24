const { Document, School } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/documents");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only documents and images are allowed."));
    }
  },
}).single("file");

// CREATE
exports.createDocument = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      const fileType = path.extname(file.originalname).substring(1).toUpperCase();

      const documentData = {
        name: file.originalname,
        type: fileType,
        size: fileSize,
        filePath: file.path,
        uploadedBy: req.body.uploadedBy || "Admin",
        schoolId: req.body.schoolId || null,
      };

      const document = await Document.create(documentData);
      const documentWithRelations = await Document.findByPk(document.id, {
        include: [{ model: School, as: "school" }],
      });
      res.status(201).json(documentWithRelations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// READ ALL
exports.getDocuments = async (req, res) => {
  try {
    const { schoolId, status, search } = req.query;
    const where = {};
    
    if (schoolId) where.schoolId = schoolId;
    if (status !== undefined) where.status = status === "true";
    if (search) {
      where[require("sequelize").Op.or] = [
        { name: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { type: { [require("sequelize").Op.iLike]: `%${search}%` } },
      ];
    }

    const documents = await Document.findAll({
      where,
      include: [{ model: School, as: "school" }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    if (!document) return res.status(404).json({ error: "Document not found" });
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DOWNLOAD
exports.downloadDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: "Document not found" });

    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    res.download(document.filePath, document.name);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: "Document not found" });

    // Delete file from filesystem
    if (document.filePath && fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await document.destroy();
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: "Document not found" });

    document.status = !document.status;
    await document.save();

    const updatedDocument = await Document.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.json(updatedDocument);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


