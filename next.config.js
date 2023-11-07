/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            'images.pexels.com',
            'img.freepik.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    },
    // redirects:async()=>{
    //     return[
    //         {
    //             source:'/signin',
    //             destination:'/dashboard',
    //             permanent:false
    //         }
    //     ]
    // }
}

module.exports = nextConfig
