import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore"
import { database } from "../../../database"

export default async function getPost(req,res){

    // const post =  await getDoc(doc(database,"articles",req.query.idArticle))
    // return res.json(post.data())

    if(req.method == 'GET'){
        const post =  await getDoc(doc(database,"articles",req.query.idArticle))
        return res.json({id:post.id, ...post.data()})
    }

    if(req.method == 'DELETE'){
        console.log(req.query.id)
        await deleteDoc(doc(database,"articles",req.query.idArticle))
        return res.status(200).json({message:'post deleted'}) 
    }

    if(req.method == 'PUT'){
        await setDoc(doc(database,"articles",req.query.idArticle), req.body)
        return res.status(200).json({message:'post edited'}) 
    }

    return res.status(200).json({message:'operacion no disponible'})
} 