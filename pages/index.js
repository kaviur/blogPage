import axios from 'axios'
import Link from 'next/link'

export async function getServerSideProps(context){
  const secure = context.req.connection.encrypted

  const highlightsUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/articles/featured`
  const highlightsRes = await axios.get(highlightsUrl)

  const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
  const categoriesRes = await axios.get(categoryUrl)


  return {
      props: {
          categories: categoriesRes.data,
          highlights: highlightsRes.data,
      }
  }
}


export default function Home({highlights,categories}) {
  return (
    <div>
      <header>
            <article>
              <Link href={"/articles/"}>
                <div className="h-96 bg-fixed bg-no-repeat bg-cover"
                style={{backgroundImage:`url(https://media.istockphoto.com/photos/school-supplies-picture-id481604342?k=20&m=481604342&s=612x612&w=0&h=TjKHxVZAO5EVO0nheLdd3IGAqkuUkoB6jbQTeCoG_WQ=)`}}
                  >
                  <div className='w-full h-full bg-slate-900 flex flex-col justify-center items-center bg-opacity-40'>
                    <h1 className='font-bold text-4xl text-white'>Encuentra aquí recursos educativos totalmente gratis</h1>
                    <p className='mt-5 text-2xl font-semibold text-fuchsia-300'>Ver todas las categorías</p>
                  </div>
                </div>
              </Link>
            </article>
      </header>
      <h2 className="text-3xl font-bold mt-20 mb-10 text-center text-gray-500">Escoge la categoría</h2>
      <h4 className="text-center text-blue-400">y descubre los recursos que tenemos para tí</h4>
      <section className="grid grid-cols-5 justify-around gap-5 mb-10 bg-green-500 container mx-auto">
      {console.log(highlights)}
      {
        categories == ""? <p className='font-fgrotesque text-lg tracking-widest p-3 h-20 flex items-center justify-center'>No hay categorías</p>
        : 
        categories.map((category)=>{
          return <article className='relative container justify-center items-center w-[284px] h-[300px] rounded-md flex flex-col transition-shadow duration-700 shadow-lg shadow-black hover:bg-gray-200 hover:opacity-90' key={category.id}>
              <img className="h-full w-full object-cover object-center transition-all hover:object-bottom duration-1000 rounded-md" src={category.img}></img>
              <Link key={category.id} href={`/admin/articles?category=${category.name.toLowerCase()}`}><label className='leading-[1.5] font-bold cursor-pointer text-center'>{category.title}</label></Link>
              <div className={`absolute hover:px-4 duration-1000 bg-sky-300 border-2 border-red-500 text-2xl p-3 rounded-full flex text-black`}>
                {category.name}
              </div>
          </article>
        })
      }
      </section>
    </div>
  )
}