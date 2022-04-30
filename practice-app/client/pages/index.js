import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/login");
  }, [])
  
  return (
    <div></div>
  )
}
