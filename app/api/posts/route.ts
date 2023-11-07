import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req: Request) {
  const session = await  getServerSession(authOptions)
  if(!session){
    return NextResponse.json({error: "Not Authentecated"},{status:401})
  }
  const { title, content, links, selectedCategory, imageUrl, publicId, } =
    await req.json();
    const authorEmail = session?.user?.email as string
  if (!title || !content) {
    return NextResponse.json(
      {
        error: "title and content are required",
      },
      { status: 500 }
    );
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        catName: selectedCategory,
        authorEmail,
      },
    });
    console.log('====================================');
    console.log('post created');
    console.log('====================================');
    return NextResponse.json(newPost)
  } catch (error) {
    return NextResponse.json({message: "could not create Posts"})
  }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({include:{author: {select:{name:true}}},orderBy:{createdAt:'desc'}});
return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({message:'some error occurred'},{status:500})
    }
}