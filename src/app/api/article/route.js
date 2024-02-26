import { NextResponse } from "next/server";
import { getArticles, insertArticle } from '../../../lib/prisma/article-prisma';

export const GET = async () => {
     const articles = await getArticles();
     return NextResponse.json({articles,status: 201});
}

export const POST = async (req) => {
     const request = await req.json();
     const article = await insertArticle(request);
     return NextResponse.json({article,status: 201})
}