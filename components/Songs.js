import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtoms"
import Song from "./Song"


function Songs() {

    const playlist = useRecoilValue(playlistState)

  return (
    <div>
      <div className=" px-8 pb-28 space-y-1 flex flex-col text-white">
        {playlist?.tracks.items.map((track, i) => <Song key={track.track.id} track={track} order={i} />)}
      </div>
    </div>
  )
}

export default Songs
