import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";



connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 500 })
        }

        user.isVerfied = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        const saveduser = await user.save();

        return NextResponse.json({
            message: "User Found",
            successf: true,
            data: saveduser
        })


    } catch (error: any) {
        console.log(1)
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}