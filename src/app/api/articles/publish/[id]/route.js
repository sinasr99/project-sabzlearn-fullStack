import {checkUserNavbar} from "@/functions";
import {isValidObjectId} from "mongoose";
import articles from "@/models/articles";

export const GET = async (req, {params}) => {
    const userRequested = await checkUserNavbar()

    if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
    }

    const {id: articleId} = params

    if (!isValidObjectId(articleId)) {
        return Response.json("آیدی مقاله معتبر نیست", {status: 400})
    }

    const requestArticle = await articles.findOneAndUpdate({_id: articleId, creator: userRequested._id}, {$set: {isReady: true}}, {new: true})

    if (!requestArticle) {
        return Response.json("همچین مقاله ای یافت نشد", {status: 404})
    }

    return Response.json("مقاله شما منتشر شد", {status: 200})
}