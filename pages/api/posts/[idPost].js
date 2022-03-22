import { doc, getDoc } from "firebase/firestore"
import { database } from "../../../database"

export default async function getPost(req,res){

    const post =  await getDoc(doc(database,"posts",req.query.idPost))

    return res.json(post.data())
} 