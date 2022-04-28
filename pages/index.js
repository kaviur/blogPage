import axios from 'axios'
import Link from 'next/link'
import CategoryList from '../components/CategoryList'
import Loading from '../components/Loading'

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
    <>
      <div className='pb-8 pt-20'>
        {
            categories
            ? <CategoryList categoryList={categories} />
            : <Loading />
        }
      </div>
      <article>
          <Link href={"/articles/"}>
            <div className="h-96 bg-fixed bg-no-repeat bg-cover"
            style={{backgroundImage:`url(https://media.istockphoto.com/photos/school-supplies-picture-id481604342?k=20&m=481604342&s=612x612&w=0&h=TjKHxVZAO5EVO0nheLdd3IGAqkuUkoB6jbQTeCoG_WQ=)`}}
              >
              <div className='w-full h-full bg-slate-900 flex flex-col justify-center items-center bg-opacity-75'>
                <h1 className='text-4xl text-white'>Encuentra recursos educativos totalmente gratis</h1>
                <p className='mt-5 text-2xl font-semibold text-fuchsia-300'>y aprende de una forma divertida</p>
              </div>
            </div>
          </Link>
        </article>
    </>
  )
}