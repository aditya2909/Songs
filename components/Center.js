import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtoms";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import Link from "next/link";


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null); 
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => console.log("Something Went Wrong: ", err))
    }, [spotifyApi, playlistId])

    console.log(playlist)

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <h1>This is Center</h1>
        <Link href="/login" className="absolute top-10 right-8"> 
            <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 p-1 pr-2 cursor-pointer rounded-full">
                <img className="w-10 h-10 rounded-full" src={session?.user.image} alt="Profile" />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className="w-5 h-5" />
            </div>
        </Link>
        <section className={`flex items-end space-x-7 p-8 bg-gradient-to-b to-black ${color} h-80 text-white`}>
            <img src={playlist?.images?.[0]?.url} className="h-44 w-44 shadow-2xl" alt="Album" />
            <div>
                <p>PLAYLIST</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
            </div>
        </section>
        <div>
            <Songs/>
        </div>
    </div>
  )
}

export default Center

