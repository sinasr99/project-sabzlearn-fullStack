import { serialize } from "cookie"
import { NextResponse } from "next/server"

export const GET = async () => {
    const res = NextResponse.json("کاربر خارج شد")
    res.headers.set(
        "Set-Cookie",
        serialize("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
        })
    )
    return res
}
