import {model, models, Schema} from "mongoose"

const schema = new Schema({
        isBlock: {
            type: Boolean,
            default: false
        },
        limitProfile: {
            type: Number,
            default: 0
        },
        profile: {
            type: String,
            default: "/images/account-image.jpg"
        },
        username: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "User"
        }
    }, {timestamps: true}
)

export default models.Users || model("Users", schema)