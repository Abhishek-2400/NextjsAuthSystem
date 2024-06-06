import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connect();

export async function POST(request: NextRequest) {


    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        const Userdata = await User.findOne({ email });
        if (Userdata) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password, salt);

        const newUser = {
            username: username,
            email: email,
            password: hashpassword
        }

        const registerUser = await User.create(newUser)
        return NextResponse.json({ message: "UserSuccessfully Registered", registerUser })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}