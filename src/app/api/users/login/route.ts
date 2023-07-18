import { connect } from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import JWT from 'jsonwebtoken'

connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody;
        console.log(reqBody)

        // !checking user exists or not

        const user = await User.findOne({ email })

        if (user) {
            // !checking user password
            const varifedPassword = bcryptjs.compareSync(password, user.password)
            if (varifedPassword) {
                //! creating token using jwt
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                const token = await JWT.sign(tokenData, "my-token", { expiresIn: '1d' })

                const response = NextResponse.json({
                    message: 'user login successful',
                    success: true,
                })
                response.cookies.set('token', token, { httpOnly: true })

                return response;
            }
            else {
                return NextResponse.json({ message: 'Wrong password' }), { status: 500 };
            }
        } else {
            return NextResponse.json({ message: 'User not found' }), { status: 404 }
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }), { status: 500 }
    }
}
