import { connect } from "@/database/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password, email } = reqBody;

        console.log(reqBody);

        // !check if user already exists

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // !hashing password
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            console.log(savedUser);


            // !send verification email


            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

            
            return NextResponse.json({
                message: "User saved successfully",
                success: true,
                savedUser,
            });


        } else {
            return (
                NextResponse.json({ error: "User already exists" }), { status: 400 }
            );
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }), { status: 501 };
    }
}
