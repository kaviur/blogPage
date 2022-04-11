import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const usersCollection = collection(database, 'users')
    const snapshot = await getDocs(usersCollection)
    
    return res.json(snapshot.size)
}