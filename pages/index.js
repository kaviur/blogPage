import axios from 'axios'
import Link from 'next/link'

export async function getServerSideProps(context){
  const secure = context.req.connection.encrypted
  const url = `${secure?"https":"http"}://${context.req.headers.host}/api/articles`
  const res = await axios.get(url)
  
  return {
      props:res.data
  }
}


export default function Home({articles:posts,highlights}) {
  return (
    <div>
      <header>
        {highlights.map(post=>{
            return <article>
              <Link href={"/articles/"+post.id}>
                <div className="h-96 mt-10 bg-fixed"
                style={{backgroundImage:`url(${post.image})`}}
                  >
                  <div className='w-full h-full bg-slate-900 flex flex-col justify-center items-center bg-opacity-20'>
                    <h1 className='font-bold text-4xl text-white'>{post.title}</h1>
                    <p className='mt-5'>Lee mi ultima publicación aquí</p>
                  </div>
                </div>
              </Link>
            </article>
          })
        }
      </header>
      <h2 className="text-4xl font-bold mt-20 mb-10 text-center">Publicaciones más recientes</h2>
      <section className="grid grid-cols-2 gap-5 mb-10">
      {posts.map(post=>{
          return <article key={post.id} className='cursor-pointer'>
            <Link href={"/articles/"+post.id}>
              <div className='h-72 overflow-hidden relative'>
                <img className='absolute -inset-y-1/2' src={post.image}></img>
                <div className='absolute w-full h-full bg-slate-900 flex flex-col justify-center items-center bg-opacity-10 hover:bg-opacity-40'>
                  <h3 className='font-bold text-4xl'>{post.title}</h3>
                  <p className='mt-5'>Lee mi ultima publicación aquí</p>
                </div>
              </div>
            </Link>
          </article>
        })
      }
      {console.log(highlights)}
      {console.log(posts)}
      </section>
    </div>
  )
}