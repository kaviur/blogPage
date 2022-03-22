import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const q = query(collection(database,"posts"),where("highlight","==",true))
    const docs = await getDocs(q)
    const highlights = []
    docs.forEach(doc=>{
        highlights.push({...doc.data(),id:doc.id})
    })
    const q2 = query(collection(database,"posts"),where("highlight","!=",true))
    const docs2 = await getDocs(q2)
    const posts = []
    docs2.forEach(doc=>{
        posts.push({...doc.data(),id:doc.id})
    })
    return res.json({highlights,posts})
}