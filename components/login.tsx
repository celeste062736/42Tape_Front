"use client"
import { signIn } from 'next-auth/react'
import { LogoImg, LogoName } from './logo';

export function LoginTopBar() {
    return (
      <div className="row align-items-center" style={{margin: '0px', height:'100px'}}>
        <div id="logo_img" className="col-1 d-flex justify-content-center align-items-center" style={{width: '60px'}}>
          <LogoImg></LogoImg>
        </div>
        <div className="col-2" style={{width: '120px'}}>
          <LogoName></LogoName>
        </div>
      </div>
    )
  }
  
  export function LoginLayout() {
    return (
      <div className="row">
        <div className="col"></div>
        <div id="login_button_align" className="col">
            <button id="login_button" className="btn btn-secondary" onClick={(e) => {
                    signIn('42-school')
                  }}>Login</button>
        </div>
        <div className="col"></div>
      </div>
    )
  }