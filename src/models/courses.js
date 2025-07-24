import {model, models, Schema, Types} from "mongoose"

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shortCaption: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    introductionVideo: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    category: {
        type: Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    introductionPoster: {
        type: String,
        required: true,
    },
    canDownload: {
        type: Boolean,
        required: true,
    },
    parts: [
        {
            type: Types.ObjectId,
            required: false,
            ref: "Seasons"
        }
    ],
    creator: {
        type: Types.ObjectId,
        required: true,
        ref: "Users"
    }
}, {timestamps: true})

export default models.Courses || model("Courses", schema)