import {isValidObjectId} from "mongoose";
import {checkUserNavbar} from "@/functions";
import comments from "@/models/comments";
import connectToMongo from "@/database/connectToMongo";
import {NextResponse} from "next/server";

export const POST = async req => {
    try {
        const { creator, message, itemId, isForArticle } = await req.json();

        const userRequested = await checkUserNavbar();
        if (!userRequested) {
            return NextResponse.json("شما احراز هویت نکرده‌اید", { status: 411 });
        }

        if (
            !isValidObjectId(creator) ||
            !isValidObjectId(itemId) ||
            typeof isForArticle !== "boolean" ||
            !message?.trim()
        ) {
            return NextResponse.json("فیلدها اجباری هستند", { status: 400 });
        }

        const commentData = {
            creator,
            message,
            ...(isForArticle ? { articleId: itemId } : { courseId: itemId }),
        };

        const createResponse = await comments.create(commentData);

        if (!createResponse) {
            return NextResponse.json("کامنت ثبت نشد", { status: 500 });
        }

        return NextResponse.json("کامنت ثبت شد", { status: 200 });
    } catch (err) {
        console.error("POST /api/comments error:", err);
        return NextResponse.json("خطای سرور", { status: 500 });
    }
};

export const PUT = async req => {
    const {commentId, message, creator} = await req.json()

    const userRequested = await checkUserNavbar()

    if (!userRequested) {
        return Response.json("شما احراز هویت نکرده اید", {status: 411})
    }

    if (!message || !isValidObjectId(creator) || !isValidObjectId(commentId)) {
        return Response.json("فیلد ها اجباری هستند", {status: 400})
    }

    const replyResponse = await comments.findOneAndUpdate({_id: commentId}, {$push: {reply: {creator, message}}},{new: true})

    if (!replyResponse) {
        return Response.json("پاسخ ایجاد نشد", {status: 404})
    }

    return Response.json("پاسخ ارسال شد", {status: 200})
}

export const GET = async () => {
    connectToMongo()

    const commentResult = await comments.find({
        creator: { $exists: true, $ne: null },
        $or: [
            { courseId: { $exists: true, $ne: null } },
            { articleId: { $exists: true, $ne: null } }
        ]
    }).populate("creator").populate("courseId").populate("articleId")

    return Response.json(commentResult, {status: 200})
}

export const DELETE = async req => {
    const userRequested = await checkUserNavbar()

    if (!userRequested) {
        return Response.json("شما احراز هویت نکرده اید", {status: 411})
    }

    const {commentId} = await req.json()

    if (!isValidObjectId(commentId)) {
        return Response.json("کامنت آیدی معتبر نبود", {status: 400})
    }

    const removeResponse = await comments.findOneAndDelete({_id: commentId}, {new: true})

    if (!removeResponse) {
        return Response.json("کامنت یافت نشد", {status: 404})
    }
    return Response.json("کامنت حذف شد", {status: 200})
}