import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function getAll(req,res){
    const q = query(collection(database,"posts"),where("author.email","==","quemojojojo.com"))
    const docs = await getDocs(q)
    const data = []
    docs.forEach(doc=>{
        data.push({...doc.data(),id:doc.id})
    })
    return res.json(data)
}