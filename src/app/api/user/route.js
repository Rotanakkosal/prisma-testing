
// /**
//  * @swagger
//  * /api/user:
//  *   get:
//  *     description: Returns the hello world
//  *     responses:
//  *       200:
//  *         description: Hello World!
//  */

import { NextResponse } from "next/server";
import { getUsers, insertUser } from '../../../lib/prisma/user-prisma';

export const GET = async () => {
     const users = await getUsers();
     return NextResponse.json({users,status: 201},{status: 201});
}

export const POST = async (req) => {
     const res = await req.json();
     const users = await insertUser(res);
     return NextResponse.json({users,status: 201},{status: 201});
}