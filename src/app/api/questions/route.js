import {checkUserNavbar} from "@/functions";
import questions from "@/models/questions";
import connectToMongo from "@/database/connectToMongo";
import {isValidObjectId} from "mongoose";

export const POST = async req => {
    const userRequested = await checkUserNavbar()

    if (!userRequested) {
        return Response.json("قبل از پرسیدن سوال احراز هویت کنید", {status: 411})
    }

    const {creator, message, episodeId} = await req.json()

    if (!isValidObjectId(creator) || !isValidObjectId(episodeId) || !message) {
        return Response.json('فیلد ها اجباری هستند', {status: 411})
    }

    const createResponse = await questions.create({creator, message, episodeId})

    if (!createResponse) {
        return Response.json("سوال ارسال نشد", {status: 404})
    }
    return Response.json("سوال ارسال شد", {status: 200})
}

export const GET = async req => {
    connectToMongo()

    const questionsResult = await questions.find().populate('creator').populate("episodeId")

    if (!questionsResult) {
        return Response.json("مشکلی در دریافت اطلاعات پیش امده", {status: 404})
    }
    return Response.json(questionsResult, {status: 200})
}

export const PUT = async req => {
    const userRequested = await checkUserNavbar()

    if (userRequested === "User") {
        return Response.json("شما اجازه جواب دادن ندارید", {status: 411})
    }

    const {creator, questionId, answer} = await req.json()

    if (!isValidObjectId(questionId) || !isValidObjectId(creator) || !answer) {
        return Response.json("تمامی فید ها اجباری هستند")
    }

    const answerResponse = await questions.findOneAndUpdate(
        { _id: questionId },
        {
            $set: {
                answer: {
                    creator: userRequested._id,
                    message: answer
                }
            }
        },
        { new: true }
    );


    if (!answerResponse) {
        return Response.json("سوالی یافت نشد", {status: 404})
    }
    return Response.json("سوال پاسخ داده شد", {status: 200})
}

export const DELETE = async req => {
    const userRequested = await checkUserNavbar()

    if (userRequested === "User") {
        return Response.json("شما اجازه جواب دادن ندارید", {status: 411})
    }

    const {questionId} = await req.json()

    if (!isValidObjectId(questionId)) {
        return Response.json("آیدی معتبر نیست", {status: 404})
    }

    const removeResponse = await questions.findOneAndDelete({_id: questionId}, {new: true})

    if (!removeResponse) {
        return Response.json("سوال یافت نشد", {status: 404})
    }
    return Response.json("سوال حذف شد", {status: 200})
}