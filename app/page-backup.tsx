'use client'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">DevOpsHub - Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-gray-800 border border-purple-500/30">
          <h3 className="text-lg font-medium text-white mb-4">CPU Usage</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">67%</div>
            <p className="text-sm text-gray-400">CPU Load</p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gray-800 border border-purple-500/30">
          <h3 className="text-lg font-medium text-white mb-4">Memory Usage</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400">45%</div>
            <p className="text-sm text-gray-400">Memory Load</p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gray-800 border border-purple-500/30">
          <h3 className="text-lg font-medium text-white mb-4">Disk Usage</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">23%</div>
            <p className="text-sm text-gray-400">Disk Load</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-lg bg-gray-800 border border-purple-500/30">
        <h3 className="text-lg font-medium text-white mb-4">Network Activity</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">1.2 MB/s</p>
            <p className="text-sm text-gray-400">Upload</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">5.8 MB/s</p>
            <p className="text-sm text-gray-400">Download</p>
          </div>
        </div>
      </div>
    </div>
  )
}
