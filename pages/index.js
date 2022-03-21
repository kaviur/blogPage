import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div>
      <p>{session?"Sesion iniciada "+session?.user.name+" Role: "+session?.user.role:"Sin sesion"}</p>
      {console.log(session?.user)}
        <button onClick={() => signIn()}>Sign in</button>
        <button onClick={() => signOut()}>Sign out</button>
        <Link href="/editor">Editor</Link>
    </div>
  )
}
