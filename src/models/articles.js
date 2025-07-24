import {model, models, Schema, Types} from "mongoose"

const schema = new Schema({
    isReady: {
      type: Boolean,
      default: false,
      required: false
    },
    poster: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    creator: {
        type: Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

export default models.Articles || model("Articles", schema)