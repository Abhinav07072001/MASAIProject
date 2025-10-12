const express = require("express");
const Note = require("../models/note.model");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create Note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, createdBy: req.user.userId });
    await newNote.save();

    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Notes (Only user's notes)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update Note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOne({ _id: id, createdBy: req.user.userId });
    if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete Note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, createdBy: req.user.userId });

    if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
