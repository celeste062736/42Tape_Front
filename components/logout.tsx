"use client"
import { signOut } from "next-auth/react";

export function LogoutButton() {
    return <button className="AllBackgroundColor" id="logout_btn" style={{padding: '0px'}} onClick={(e) => {
        signOut()
    }}>LOGOUT</button>;
}