'use strict'
const mongoose = require('../database/db');
const schema   = mongoose.Schema;

const userModel = new schema({
    user_ip: { type: String, trim: true },
    user_agent:    { type: String, trim: true },
    views: { type: Number, default: 1 },
    openMenuClicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
},{ versionKey: false });



userModel.pre('save', (next) => {
    let now = new Date();
    if (!this.createdAt)
        this.createdAt = now;
    next();
});

userModel.index({ user_ip: 1 });

module.exports = mongoose.model('Users', userModel);