import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import Center from "../components/Center"
import { getSession } from 'next-auth/react';
import Player from '../components/Player';

const inter = Inter({ subsets: ['latin'] })

export default function Home({session}) {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        {/*SideBar*/}
        <Sidebar/>
        {/*Center*/}
        <Center/>
      </main>
      <div className='sticky bottom-0'>
        {/*Player*/} 
        <Player session={session}/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}
