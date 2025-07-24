import {model, models, Schema, Types} from "mongoose"
import Episodes from "@/models/episodes"
import Users from "@/models/users";

const schema = new Schema({
    creator: {
        type: Types.ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    episodeId: {
        type: Types.ObjectId,
        ref: "Episodes",
        required: true
    },
    answer: {
        creator: {
            type: Types.ObjectId,
            ref: "Users",
            required: false
        },
        message: {
            type: String,
            required: false
        }
    }
})

export default models.Questions || model("Questions", schema)