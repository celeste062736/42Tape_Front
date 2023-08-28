"use client"
type ProfileProps = {
    intra_pic: string;
    level: number;
    user_id: string;
  };
  
  export function Profile({ intra_pic, level, user_id }: ProfileProps) {
    return (
      <div className="profile">
        <div className="centered-container">
          <img id="intra_picture" src={intra_pic} alt="intra picture" className="rounded-circle"/>
          <div id="profile_level">
            Lv. {level}
          </div>
          <div id="profile_intra_id">
            {user_id}
          </div>
        </div>
      </div>
    )
  }