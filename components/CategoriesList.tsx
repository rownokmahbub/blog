import Link from "next/link";
import { TCategory } from "@/app/types";
const getCategories = async (): Promise<TCategory[] | null> =>{
     try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
        if(res.ok){
            const categories = await res.json()
            return categories; 
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }   
    return null;
}
export default async function CategoriesList() {
    const categories = await getCategories()
 
  return (
    <div className="flex bg-slate-800/80 backdrop-blur-2xl mt-4 sticky top-6 z-50 left-0 w-full max-w-xl mx-auto rounded-full py-3 flex-col md:flex-row items-center justify-center gap-5">
          {categories && categories.map((category: TCategory)=>(
             <Link key={category.id} color="foreground" href={`/categories/${category.catName}`}>
             <div>{category.catName}</div>
           </Link>
          ))}
    </div>
  )
}
