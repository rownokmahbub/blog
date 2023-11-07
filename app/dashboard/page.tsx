import CreatePostForm from '@/components/CreatePostForm'
import Post from '@/components/Post'
import { postsData } from '@/data'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

import React from 'react'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
export default async function page() {
    const session = await getServerSession(authOptions);
      if(!session){
        redirect('/')
      }
      
  return (
    <div>
          {postsData&& postsData.length>0 ?
    postsData.map((post)=> <Post key={post.id} id={post.id} author={post.author} authorEmail={'test@email.com'} date={post.datepublished} thumbnail={post.thumbnail} category={post.category} title={post.title} content={post.content} links={post.links || []}/>)
     : 
    <div className='flex my-20 flex-col justify-center gap-10 items-center md:h-[70vh] text-lg font-semibold'>
        <div className='w-full  mt-2 rounded-lg overflow-hidden relative flex justify-center items-center'>
        <Image className='rounded-2xl' src='https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544943.jpg?w=1060&t=st=1698039528~exp=1698040128~hmac=6fb0feb57ecf2f8a4a48f6fe9cd4d489b4abd4835a7dd5907133bc2ee0c292d8' alt='no page found' width={500} height={500} />
        </div>
      
    No Post Created Yet 
  <CreatePostForm/>
      </div>}
    </div>
  )
}
