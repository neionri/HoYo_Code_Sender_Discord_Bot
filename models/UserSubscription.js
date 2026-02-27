const mongoose = require('mongoose');

const userSubscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    games: {
        genshin: { type: Boolean, default: true },
        hkrpg: { type: Boolean, default: true },
        nap: { type: Boolean, default: true }
    },
    language: { type: String, default: 'en' }
}, {
    timestamps: true
});

// Add index for faster lookups
userSubscriptionSchema.index({ userId: 1 });
userSubscriptionSchema.index({ active: 1 });

module.exports = mongoose.model('UserSubscription', userSubscriptionSchema);
