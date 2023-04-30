import { ArrowLeftIcon, HomeIcon, MagnifyingGlassIcon, BookOpenIcon, PlusCircleIcon, RssIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtoms";
import logo from "./logo.jpg";
import Image from "next/image";


function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  console.log("You picked the playlist >>>", playlistId)

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi])

  console.log(playlists);

  return (
    <div className="pb-36 text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <div>
          <Image className="w-50" src={logo} alt="Logo" />
        </div>
        <Link href="/login" className="flex items-center space-x-2 hover:text-white">
            <ArrowLeftIcon className="h-5 w-5"/>
            <p> Log Out </p>
        </Link>
        <button className="flex items-center space-x-2 hover:text-white">
            <HomeIcon className="h-5 w-5"/>
            <p> Home </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
            <MagnifyingGlassIcon className="h-5 w-5"/>
            <p> Search </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
            <BookOpenIcon className="h-5 w-5"/>
            <p> Your Library </p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>
        
        <button className="flex items-center space-x-2 hover:text-white">
            <PlusCircleIcon className="h-5 w-5"/>
            <p> Create Playlist </p>
        </button>
        <button className="flex items-center space-x-2 text-blue-500 hover:text-white">
            <HeartIcon className="h-5 w-5 text-blue-500"/>
            <p> Liked Songs </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
            <RssIcon className="h-5 w-5 text-green-500"/>
            <p> Your Episodes </p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        {/*Playlist*/}
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
        ))}
        
      </div>
    </div>
  )
}

export default Sidebar


