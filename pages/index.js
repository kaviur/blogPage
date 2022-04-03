import axios from 'axios'
import Link from 'next/link'

export async function getServerSideProps(context){
  const secure = context.req.connection.encrypted

  const highlightsUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/articles/featured`
  const highlightsRes = await axios.get(highlightsUrl)

  console.log(highlightsRes.data)

  return {
      props: {
          highlights: highlightsRes.data,
      }
  }
}


export default function Home({highlights}) {
  return (
    <div>
      <header>
        {highlights.map(post=>{
            return <article>
              <Link href={"/articles/"+post.id}>
                <div className="h-96 mt-10 bg-fixed bg-no-repeat bg-cover"
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
      {console.log(highlights)}
      </section>
    </div>
  )
}