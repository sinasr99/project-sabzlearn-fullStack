import {checkUserNavbar} from "@/functions";
import connectToMongo from "@/database/connectToMongo";
import {isValidObjectId} from "mongoose";
import comments from "@/models/comments";

export const PUT = async req => {
    const userRequested = await checkUserNavbar()

    if (!userRequested) {
        return Response.json("شما احراز هویت نکرده اید", {status: 411})
    }

    const {commentId} = await req.json()

    if (!isValidObjectId(commentId)) {
        return Response.json('آیدی کامنت معتبر نیست', {status: 411})
    }

    connectToMongo()

    const agreeResponse = await comments.findOneAndUpdate({_id: commentId}, {$set: {isAgree: true}})

    if (!agreeResponse) {
        return Response.json("کامنت پیدا نشد", {status: 404})
    }
    return Response.json("کامنت تایید شد", {status: 200})
}