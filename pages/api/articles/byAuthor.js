import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){

    const {email} = req.query;
    //console.log('parametros',req)

    const q = query(collection(database,"articles"),where("author.email","==",email))
    const docs = await getDocs(q)
    const data = []
    docs.forEach(doc=>{
        data.push({...doc.data(),id:doc.id})
    })
    return res.json(data)
}