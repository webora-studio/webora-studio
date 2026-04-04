'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-[#FDFDFD] rounded-3xl" style={{ border: '1px solid rgba(0,0,0,0.03)' }}>
          <div className="animate-pulse flex flex-col items-center gap-6">
             <div className="w-32 h-32 rounded-full bg-slate-100"></div>
             <div className="w-48 h-1 rounded-full bg-slate-50"></div>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
