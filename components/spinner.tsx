import React from 'react'
import { MoonLoader } from 'react-spinners'

export function Loading() {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <MoonLoader
          color='#6181FF'
          size={60}
        />
      </div>
    </div>
  )
}