import {checkUserNavbar} from "@/functions";
import seasons from "@/models/seasons";
import courses from "@/models/courses";

export const POST = async (req, {params}) => {
    try {
        const {title, number} = await req.json()
        const {id: courseId} = params

        if (!title) {
            return Response.json("ارسال تمام فیلد ها اجباری است", {status: 410})
        }

        const userRequested = await checkUserNavbar()

        if (userRequested?.role === 'User' || !userRequested || userRequested?.isBlock) {
            return Response.json("شما اجازه دسترسی به این API را ندارید", {status: 412})
        }

        const createSeasonResponse = await seasons.create({title, number: number || 0})

        if (!createSeasonResponse) {
            return Response.json("فصل ایجاد نشد", {status: 500})
        }

        const updateResponse = await courses.findByIdAndUpdate(
            courseId,
            { $push: { parts: createSeasonResponse._id } },
            { new: true }
        )

        if (!updateResponse) {
            return Response.json("دوره آپدیت نشد", {status: 500})
        }

        return Response.json("دوره آپدیت شد", {status: 200})
    } catch (error) {
        console.log("error => ", error)
        return Response.json("مشکلی پیش آمده !!", {status: 500})
    }
}