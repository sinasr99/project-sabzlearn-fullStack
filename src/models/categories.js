import {model, models, Schema} from "mongoose"

const schema = new Schema({
    title: {
        type: String,
        required: true,
    }
})

export default models.Categories || model("Categories", schema)