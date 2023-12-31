import Image from "next/image";
import Link from "next/link";
import { RiLinksFill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import DeleteButton from "./DeleteButton";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
interface PostProps {
  id: string;
  author: string;
  images: string;
  date: string;
  thumbnail?: string;
  authorEmail?: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
}
export default async function Post({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
}: PostProps) {
  const session = await getServerSession(authOptions);
  const dateObj= new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year:'numeric'
  }
  const formattedDate = dateObj.toLocaleDateString("en-US", options)
  const isEditable = session && session?.user?.email=== authorEmail;
  const userImage = session && session?.user?.email=== authorEmail;
  return (
    <div className="container mx-auto">
      <div className="flex flex-col px-4 py-4 bg-slate-800 rounded-lg my-5 shadow-xl">
        <div className="flex justify-between items-center">
        
          <div className="flex items-center gap-4">
         {userImage ?  <Image className="w-10 h-10 rounded-full" src={session?.user?.image || ''} width={60} height={60} alt="image"/> : <>
         
         </>}
          <div>
          <h3 className="font-semibold text-xl">{author}</h3>
            <p className="text-sm text-slate-400">{formattedDate}</p>
          </div>
       
          </div>
          <p className=" font-medium bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-2 py-1 rounded-lg">
            {category && (
              <Link href={`/categories/${category}`}>{category}</Link>
            )}
          </p>
        </div>
        <div className="w-full h-96 mt-2 rounded-lg overflow-hidden relative">
          {thumbnail ? (
            <Image
              className="object-cover object-center"
              src={thumbnail}
              fill
              alt={title}
            />
          ) : (
            <Image
              className="object-cover object-center"
              src={"/thumbnails.png"}
              fill
              alt="thumbnail"
            />
          )}
        </div>
        <h2 className="text-lg font-medium my-2">{title}</h2>
        <p>{content}</p>
        <div>
          {links?.map((link, i) => (
            <div
              className="flex items-center gap-2 text-cyan-500 underline"
              key={i}
            >
              <RiLinksFill />
              <Link href={link}>{link}</Link>
            </div>
          ))}
          {isEditable && (
            <div className="flex items-center justify-end gap-2">
              <Link href={`/edit-post/${id}`}>
                <Button className="text-white" color="success" variant="shadow">
                  <BiSolidMessageSquareEdit />
                  Edit
                </Button>
              </Link>
              <DeleteButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
