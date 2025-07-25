'use client'

import SimpleSystemMonitor from './widgets/SimpleSystemMonitor'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">DevOpsHub - Sistema Monitor</h1>
      <SimpleSystemMonitor />
    </div>
  )
}
