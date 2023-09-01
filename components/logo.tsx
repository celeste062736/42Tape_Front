"use client"
import Link from 'next/link'
export function LogoImg() {
    var path = "/";
    return (
      <svg width="66" height="60" viewBox="0 0 66 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <a href={path}>
          <svg width="66" height="60" viewBox="0 0 66 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M66 49C60.4258 45.0381 59 33 59 27L45 38C45.0384 48.3866 45.9182 55.68 56.5 60V54.5L62 55.5L61 50.5L66 49Z" fill="#6181FF"/>
            <path d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM38.5 21.5C33.8056 16.8056 26.1944 16.8056 21.5 21.5C16.8056 26.1944 16.8056 33.8056 21.5 38.5C26.1944 43.1944 33.8056 43.1944 38.5 38.5C43.1944 33.8056 43.1944 26.1944 38.5 21.5Z" fill="#6181FF"/>
            <circle cx="30" cy="30" r="16" stroke="white" strokeWidth="2"/>
          </svg>
        </a>
      </svg>
    )
  }
  
  export function LogoName() {
    return (
      <Link id="logo" href="/">42TAPE</Link>
    )
  }