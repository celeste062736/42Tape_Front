"use client"
type BlankProps = {
    name: 'top' | 'main' | string;
  };
  
  export function Blank(props: BlankProps) {
    if (props.name === "top") {
      return <div className="col-2 d-none d-xl-block"></div>;
    } else if (props.name === "main") {
      return <div className="col-2 d-none"></div>;
    } else {
      return null;
    }
  }
  