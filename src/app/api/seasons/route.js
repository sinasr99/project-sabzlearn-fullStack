import {checkUserNavbar} from "@/functions";
import seasons from "@/models/seasons";
import {isValidObjectId} from "mongoose";

export const DELETE = async req => {
    const user = await checkUserNavbar()

    if (user.role === "User") {
        return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 411})
    }

    const {seasonId} = await req.json()

    if (!isValidObjectId(seasonId)) {
        return Response.json("آیدی معتبری نیست", {status: 40})
    }

    const removeResponse = await seasons.findOneAndDelete({_id: seasonId}, {new: true})

    if (!removeResponse) {
        return Response.json("آیتم پیدا نشد", {status: 404})
    }
    return Response.json("آیتم حدف شد", {status: 200})
}