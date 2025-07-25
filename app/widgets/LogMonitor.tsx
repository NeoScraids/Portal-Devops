'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { useLogs } from '@/hooks/useData'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  AlertCircle,
  Info,
  AlertTriangle,
  Bug
} from 'lucide-react'
import type { LogEntry } from '@/types'

export default function LogMonitor() {
  const { logs, loading } = useLogs()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedService, setSelectedService] = useState<string>('all')

  const filteredLogs = useMemo(() => {
    if (!logs) return []
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.service.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel
      const matchesService = selectedService === 'all' || log.service === selectedService
      return matchesSearch && matchesLevel && matchesService
    })
  }, [logs, searchTerm, selectedLevel, selectedService])
  const services = useMemo(() => {
    if (!logs) return []
    return Array.from(new Set(logs.map(log => log.service)))
  }, [logs])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return <AlertCircle className="h-4 w-4 text-red-400" aria-label="Error" />
      case 'WARN': return <AlertTriangle className="h-4 w-4 text-yellow-400" aria-label="Advertencia" />
      case 'INFO': return <Info className="h-4 w-4 text-blue-400" aria-label="Info" />
      case 'DEBUG': return <Bug className="h-4 w-4 text-gray-400" aria-label="Depuración" />
      default: return <Info className="h-4 w-4 text-gray-400" aria-label="Info" />
    }
  }

  // Dropdown custom para nivel y servicio: solo uno abierto a la vez
  const [showLevelDropdown, setShowLevelDropdown] = useState(false)
  const [showServiceDropdown, setShowServiceDropdown] = useState(false)
  const handleLevelDropdown = () => {
    setShowLevelDropdown(v => !v)
    setShowServiceDropdown(false)
  }
  const handleServiceDropdown = () => {
    setShowServiceDropdown(v => !v)
    setShowLevelDropdown(false)
  }

  const levelOptions = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'ERROR', label: 'Error' },
    { value: 'WARN', label: 'Advertencia' },
    { value: 'INFO', label: 'Info' },
    { value: 'DEBUG', label: 'Depuración' },
  ]

  return (
    <Card className="bg-gradient-to-br from-[#2e1065]/80 to-[#1e1b4b]/80 border border-purple-900/40 shadow-xl">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
        >
          <CardTitle className="text-2xl font-bold text-white">Monitor de Logs</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 60, delay: 0.08 }}
          className="flex flex-col gap-4 mb-4"
        >
          <div className="flex w-full">
            <Input
              placeholder="Buscar mensaje o servicio..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full glass border border-purple-500/30"
            />
            {/* Filtros alineados al final, visual destacado */}
            <div className="flex gap-2 ml-auto items-center">
              {/* Dropdown personalizado para nivel */}
              <div className="relative" style={{ minWidth: 180, maxWidth: 200 }}>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 70, delay: 0.15 }}
                  className={`
                    flex items-center justify-between w-full px-4 py-2 rounded-xl
                    border border-purple-500/60
                    bg-gradient-to-br from-[#2e1065]/60 to-[#1e1b4b]/60
                    text-white shadow-xl
                    backdrop-blur-2xl
                    transition-all duration-200
                    ring-1 ring-inset ring-purple-700/30
                    hover:shadow-[0_0_16px_2px_rgba(168,85,247,0.4)]
                    hover:border-purple-400/80
                    hover:bg-purple-900/50
                    focus:outline-none focus:ring-2 focus:ring-purple-400/70
                    group
                  `}
                  style={{ boxShadow: showLevelDropdown ? '0 0 16px 2px #a855f7aa' : undefined, minWidth: 180, maxWidth: 200 }}
                  onClick={handleLevelDropdown}
                >
                  <span className="flex items-center gap-2 truncate w-full">
                    <Filter className="h-4 w-4 text-purple-300 group-hover:text-purple-400 group-focus:text-purple-400 transition-colors duration-200" />
                    <span className="font-semibold tracking-wide text-sm drop-shadow-md truncate w-full text-left">
                      {levelOptions.find(opt => opt.value === selectedLevel)?.label}
                    </span>
                  </span>
                  <svg className={`ml-2 h-4 w-4 transition-transform ${showLevelDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </motion.button>
                <AnimatePresence>
                  {showLevelDropdown && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-full z-30 bg-gradient-to-br from-[#2e1065]/95 to-[#1e1b4b]/95 rounded-xl shadow-2xl border border-purple-500/40 glass backdrop-blur-xl overflow-hidden"
                    >
                      {levelOptions.map(opt => (
                        <li
                          key={opt.value}
                          className={`px-4 py-2 cursor-pointer hover:bg-purple-700/40 text-white transition-all ${selectedLevel === opt.value ? 'bg-purple-700/30 font-bold' : ''}`}
                          onClick={() => { setSelectedLevel(opt.value); setShowLevelDropdown(false) }}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              {/* Dropdown personalizado para servicio */}
              <div className="relative" style={{ minWidth: 180, maxWidth: 200 }}>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 70, delay: 0.22 }}
                  className={`
                    flex items-center justify-between w-full px-4 py-2 rounded-xl
                    border border-purple-500/60
                    bg-gradient-to-br from-[#2e1065]/60 to-[#1e1b4b]/60
                    text-white shadow-xl
                    backdrop-blur-2xl
                    transition-all duration-200
                    ring-1 ring-inset ring-purple-700/30
                    hover:shadow-[0_0_16px_2px_rgba(168,85,247,0.4)]
                    hover:border-purple-400/80
                    hover:bg-purple-900/50
                    focus:outline-none focus:ring-2 focus:ring-purple-400/70
                    group
                  `}
                  style={{ boxShadow: showServiceDropdown ? '0 0 16px 2px #a855f7aa' : undefined, minWidth: 180, maxWidth: 200 }}
                  onClick={handleServiceDropdown}
                >
                  <span className="flex items-center gap-2 truncate w-full">
                    <Filter className="h-4 w-4 text-purple-300 group-hover:text-purple-400 group-focus:text-purple-400 transition-colors duration-200" />
                    <span className="font-semibold tracking-wide text-sm drop-shadow-md truncate w-full text-left">
                      {selectedService === 'all' ? 'Todos los servicios' : selectedService}
                    </span>
                  </span>
                  <svg className={`ml-2 h-4 w-4 transition-transform ${showServiceDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </motion.button>
                <AnimatePresence>
                  {showServiceDropdown && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-full z-30 bg-gradient-to-br from-[#2e1065]/95 to-[#1e1b4b]/95 rounded-xl shadow-2xl border border-purple-500/40 glass backdrop-blur-xl overflow-hidden max-h-56 overflow-y-auto"
                    >
                      <li
                        className={`px-4 py-2 cursor-pointer hover:bg-purple-700/40 text-white transition-all ${selectedService === 'all' ? 'bg-purple-700/30 font-bold' : ''}`}
                        onClick={() => { setSelectedService('all'); setShowServiceDropdown(false) }}
                      >
                        Todos los servicios
                      </li>
                      {services.map(service => (
                        <li
                          key={service}
                          className={`px-4 py-2 cursor-pointer hover:bg-purple-700/40 text-white transition-all ${selectedService === service ? 'bg-purple-700/30 font-bold' : ''}`}
                          onClick={() => { setSelectedService(service); setShowServiceDropdown(false) }}
                        >
                          {service}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Tarjetas de logs en vez de tabla */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 60, delay: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2"
        >
          {filteredLogs.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8 text-lg font-semibold bg-gradient-to-br from-[#2e1065]/60 to-[#1e1b4b]/60 rounded-2xl border border-purple-900/20 shadow-lg">
              No hay logs para mostrar
            </div>
          )}
          <AnimatePresence>
            {filteredLogs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.44, delay: idx * 0.05, type: 'spring', stiffness: 50 }}
                className="relative flex flex-col gap-2 p-4 rounded-2xl bg-gradient-to-br from-[#2e1065]/80 to-[#1e1b4b]/80 border border-purple-900/30 shadow-xl glass backdrop-blur-xl hover:shadow-[0_0_24px_4px_rgba(168,85,247,0.25)] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-sm font-bold text-purple-300">
                    {getLevelIcon(log.level)}
                    <span className="uppercase tracking-wide">{log.level}</span>
                  </span>
                  <span className="text-xs text-purple-200 font-mono bg-purple-900/30 px-2 py-1 rounded-lg">
                    {new Date(log.timestamp).toLocaleString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-purple-400 bg-purple-900/40 px-2 py-1 rounded-md">
                    Servicio:
                  </span>
                  <span className="text-sm text-purple-100 font-mono">{log.service}</span>
                </div>
                <div className="text-base text-white font-medium break-words">
                  {log.message}
                </div>
                {/* Extra: badge de ID o detalles si se quiere */}
                <div className="absolute top-2 right-2 text-[10px] text-purple-500 bg-purple-900/60 px-2 py-0.5 rounded-full select-none opacity-70">
                  ID: {log.id}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </CardContent>
    </Card>
  )
}
