import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){

    //TODO: sacar el correo del usuario de la sesi+on
    const q = query(collection(database,"articles"),where("author.email","==","quemojojojo@gmail.com"))
    const docs = await getDocs(q)
    const data = []
    docs.forEach(doc=>{
        data.push({...doc.data(),id:doc.id})
    })
    return res.json(data)
}