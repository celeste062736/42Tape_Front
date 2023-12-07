"use client"
import Link from 'next/link'

type ButtonProps = {
    name: "vote" | "rank" | "reward" | "vote_in_list_box" | "rank_in_list_box" | "reward_in_list_box";
  };
  
  export function Button(props: ButtonProps) {
    if (props.name === "vote") {
      return (
        <Link href='/vote'><button className="btn btn-primary AllBackgroundColor" style={{width: '200px', height: '50px'}}>Vote</button></Link>
      );
    } else if (props.name === "rank") {
      return (
        <Link href='/rank'><button className="btn btn-primary AllBackgroundColor" style={{width: '200px', height: '50px'}}>Rank</button></Link>
      );
    } else if (props.name === "reward") {
      return (
        <Link href='/reward'><button className="btn btn-primary AllBackgroundColor" style={{width: '200px', height: '50px'}}>Reward</button></Link>
      );
    } else if (props.name === "vote_in_list_box") {
      return (
        <Link href='/vote'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Vote</button></Link>
      )
    } else if (props.name === "rank_in_list_box") {
      return (
        <Link href='/rank'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Rank</button></Link>
      )
    } 
    // else if (props.name === "reward_in_list_box") {
    //   return (
    //     <Link href='/reward'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Reward</button></Link>
    //   )
    // }
    else {
      return null;
    }
  }

// "use client"
// import Link from 'next/link'

// type ButtonProps = {
//     name: "vote" | "rank" | "reward" | "vote_in_list_box" | "rank_in_list_box" | "reward_in_list_box";
//   };
  
//   export function Button(props: ButtonProps) {
//     if (props.name === "vote") {
//       return (
//         <Link href='/vote'><button className="btn btn-primary AllBackgroundColor" style={{width: '200px', height: '50px'}}>Vote</button></Link>
//       );
//     } else if (props.name === "rank") {
//       return (
//         <Link href='/rank'><button className="btn btn-primary AllBackgroundColor" style={{width: '200px', height: '50px'}}>Rank</button></Link>
//       );
//     } else if (props.name === "reward") {
//       return (
//         <Link href='/reward'><button className="btn btn-primary AllBackgroundColor" style={{width: '200px', height: '50px'}}>Reward</button></Link>
//       );
//     } else if (props.name === "vote_in_list_box") {
//       return (
//         <Link href='/vote'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Vote</button></Link>
//       )
//     } else if (props.name === "rank_in_list_box") {
//       return (
//         <Link href='/rank'><button className="btn btn-secondary btn-sm" style={{width: '120px', height: '40px'}}>Rank</button></Link>
//       )
//     } else {
//       return null;
//     }
//   }