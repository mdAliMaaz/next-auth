import { connect } from '@/database/dbConfig'
import User from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';





connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);


        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 400 });
        }

        console.log(user)


        user.isVarified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'email verified' }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}