const mongoose = require("mongoose");
const { Schema } = mongoose;

const towTruckSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        coords: {
            lat: { type: Number },
            lng: { type: Number },
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TowTruck", towTruckSchema);
