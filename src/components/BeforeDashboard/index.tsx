import React from 'react'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h2>Resumen</h2>
      <div className={`${baseClass} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2`}></div>
    </div>
  )
}

export default BeforeDashboard
