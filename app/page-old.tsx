'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Sidebar from './components/Sidebar'
import SystemMonitor from './widgets/SystemMonitor'
import SimpleSystemMonitor from './widgets/SimpleSystemMonitor'
import ScriptManager from './widgets/ScriptManager'
import LogMonitor from './widgets/LogMonitor'
import CronManager from './widgets/CronManager'
import AlertsManager from './widgets/AlertsManager'
import QuickNotes from './widgets/QuickNotes'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeWidget, setActiveWidget] = useState('system')
  const renderWidget = () => {
    switch (activeWidget) {
      case 'system':
        return <SimpleSystemMonitor />
      case 'scripts':
        return <ScriptManager />
      case 'logs':
        return <LogMonitor />
      case 'cron':
        return <CronManager />
      case 'alerts':
        return <AlertsManager />
      case 'notes':
        return <QuickNotes />
      default:
        return <SimpleSystemMonitor />
    }
  }

  const getWidgetTitle = () => {
    switch (activeWidget) {
      case 'system': return 'System Monitor'
      case 'scripts': return 'Script Manager'
      case 'logs': return 'Log Monitor'
      case 'cron': return 'Cron Jobs'
      case 'alerts': return 'Alert Manager'
      case 'notes': return 'Quick Notes'
      default: return 'System Monitor'
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          activeWidget={activeWidget}
          onWidgetSelect={(widget) => {
            setActiveWidget(widget)
            setSidebarOpen(false) // Close sidebar on mobile after selection
          }}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {getWidgetTitle()}
                  </h1>
                  <p className="text-gray-400">
                    Welcome to DevOpsHub - Your infrastructure control center
                  </p>
                </div>
                
                {/* Status Indicator */}
                <div className="hidden lg:flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-green-500/30">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">All Systems Operational</span>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <p>Last updated</p>
                    <p>{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Widget Content */}
            <motion.div
              key={activeWidget}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderWidget()}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Status Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="flex items-center justify-between px-4 py-2 rounded-lg glass border border-green-500/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Systems OK</span>
          </div>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}
