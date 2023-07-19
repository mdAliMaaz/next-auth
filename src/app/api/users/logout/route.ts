import { NextResponse } from "next/server";



export async function GET() {
    try {
        const response = NextResponse.json({
            message: 'Logout Successfull',
            success: true
        })
        // !removing token after successful logging out
        response.cookies.set('token', "", { httpOnly: true, expires: new Date(0) })
        console.log('token removed successfully')
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}