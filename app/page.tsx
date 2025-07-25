'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Sidebar from './components/Sidebar'
import SystemMonitor from './widgets/SystemMonitor'
import ScriptManager from './widgets/ScriptManager'
import LogMonitor from './widgets/LogMonitor'
import CronManager from './widgets/CronManager'
import AlertsManager from './widgets/AlertsManager'
import QuickNotes from './widgets/QuickNotes'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeWidget, setActiveWidget] = useState('system')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const update = () => setCurrentTime(new Date().toLocaleTimeString())
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const renderWidget = () => {
    switch (activeWidget) {
      case 'system':
        return <SystemMonitor />
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
        return <SystemMonitor />
    }
  }

  const getWidgetTitle = () => {
    switch (activeWidget) {
      case 'system': return 'Monitor del Sistema'
      case 'scripts': return 'Gestor de Scripts'
      case 'logs': return 'Monitor de Logs'
      case 'cron': return 'Tareas Programadas'
      case 'alerts': return 'Notificaciones y Alertas'
      case 'notes': return 'Notas Rápidas'
      default: return 'Monitor del Sistema'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      className="min-h-screen relative"
    >
      {/* Fondo dinámico tipo neón/partículas */}
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
              transition={{ duration: 0.5, type: 'spring', stiffness: 60, delay: 0.05 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {getWidgetTitle()}
                  </h1>
                  <p className="text-gray-400">
                    DevOpsHub - Tu panel de control de infraestructura
                  </p>
                </div>
                {/* Indicador de estado */}
                <div className="hidden lg:flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-green-500/30">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">Todos los sistemas operativos</span>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <p>Última actualización</p>
                    <p>{currentTime}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Widget dinámico */}
            <motion.div
              key={activeWidget}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 60, delay: 0.1 }}
            >
              {renderWidget()}
            </motion.div>
          </div>
        </main>
      </div>
      {/* Barra de estado móvil */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="flex items-center justify-between px-4 py-2 rounded-lg glass border border-green-500/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Sistemas OK</span>
          </div>
          <span className="text-xs text-gray-400">
            {currentTime}
          </span>
        </div>
      </div>
    </motion.div>
  )
}