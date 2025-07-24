import { model, models, Schema, Types } from "mongoose";
import users from "@/models/users";
import articles from "@/models/articles";
import courses from "@/models/courses";
// زیر اسکیمای replies
const replySchema = new Schema({
    creator: {
        type: Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false }) // برای اینکه هر reply آی‌دی جدا نداشته باشه

// اسکیمای اصلی کامنت
const schema = new Schema({
    isAgree: {
        type: Boolean,
    },
    creator: {
        type: Types.ObjectId,
        ref: 'Users',
        required: true
    },
    courseId: {
        type: Types.ObjectId,
        ref: "Courses",
        required: false
    },
    articleId: {
        type: Types.ObjectId,
        ref: "Articles",
        required: false
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reply: [replySchema] // استفاده درست از زیر اسکیمای replies
})

export default models.Comments || model("Comments", schema);
