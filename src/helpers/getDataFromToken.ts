import { NextRequest, } from "next/server";
import JWT from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {


    try {
        const token = request.cookies.get('token')?.value || "";

        const deCodedToken: any = JWT.verify(token, 'myToken');
        return deCodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}