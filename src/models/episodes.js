import {model, models, Schema, Types} from "mongoose"

const schema = new Schema({
    creator: {
        type: Types.ObjectId,
        ref: "Users",
        required: true
    },
    number: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: false
    }
})

export default models.Episodes || model("Episodes", schema)