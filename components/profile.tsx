"use client"

import Image from "next/image";

type ProfileProps = {
    intra_pic: string;
    level: number;
    user_id: string;
  };
  
  export function Profile({ intra_pic, level, user_id }: ProfileProps) {
    return (
      <div id="profile">
        <Image id="intra_picture" src={intra_pic} width={500} height={500} alt="intra picture" className="rounded-circle justi"/>
        <div id="profile_level">
          Lv. {level}
        </div>
        <div id="profile_intra_id">
          {user_id}
        </div>
      </div>
    )
  }