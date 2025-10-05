const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
title: { type: String, required: true, unique: true, trim: true },
description: { type: String, default: '' },
priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
isCompleted: { type: Boolean, default: false },
completionDate: { type: Date, default: null },
dueDate: { type: Date, default: null },
}, { timestamps: true });


module.exports = mongoose.model('Task', taskSchema);