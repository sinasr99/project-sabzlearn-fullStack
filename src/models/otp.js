import {model, models, Schema} from "mongoose"

const schema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        length: 4
    },
    expireTime: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

export default models.Otp || model("Otp", schema)