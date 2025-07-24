import {model, models, Schema, Types} from "mongoose"

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: false,
    },
    episodes: [
        {
            type: Types.ObjectId,
            ref: "Episodes",
            required: false
        }
    ]
})

export default models.Seasons || model("Seasons", schema)