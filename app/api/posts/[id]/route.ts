import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Could not Fetch post" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authentecated" }, { status: 401 });
  }
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  const id = params.id;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Error editng post" });
  }
}
export async function DELETE(
  res: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authentecated" }, { status: 401 });
  }
  const id = params.id;
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
