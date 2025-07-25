'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { useSystemStats } from '@/hooks/useData'
import { formatBytes } from '@/lib/utils'
import { Cpu, HardDrive, Wifi, Clock } from 'lucide-react'
import { Skeleton } from '@/app/components/ui/skeleton'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { useRef, useEffect, useState } from 'react'

interface ProgressRingProps {
  progress: number
  size: number
  strokeWidth: number
  color: string
}

function ProgressRing({ progress, size, strokeWidth, color }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * Math.PI * 2
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="drop-shadow-lg"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{progress}%</span>
      </div>
    </div>
  )
}

const formatUptime = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  return `${hours}h ${minutes}m`;
}

export default function SystemMonitor() {
  const { stats, loading } = useSystemStats()
  const [history, setHistory] = useState<any[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!loading && stats) {
      setHistory(prev => [
        ...prev.slice(-29),
        {
          time: new Date().toLocaleTimeString(),
          cpu: stats.cpu,
          ram: stats.ram,
          disk: stats.disk,
        }
      ])
    }
  }, [stats, loading])

  console.log('SystemMonitor render:', { stats, loading })

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-20 w-20 rounded-full mx-auto" />
            </Card>
          ))}
        </div>
      </motion.div>
    )
  }

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-400">No hay datos disponibles</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CPU */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Uso de CPU</CardTitle>
            <Cpu className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ProgressRing
              progress={stats.cpu}
              size={120}
              strokeWidth={8}
              color="#a78bfa"
            />
            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={history}>
                  <Line type="monotone" dataKey="cpu" stroke="#a78bfa" strokeWidth={3} dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 8px #a78bfa)' }} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip contentStyle={{ background: '#2e1065', border: 'none', color: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* RAM */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Uso de Memoria</CardTitle>
            <HardDrive className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ProgressRing
              progress={stats.ram}
              size={120}
              strokeWidth={8}
              color="#38bdf8"
            />
            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={history}>
                  <Line type="monotone" dataKey="ram" stroke="#38bdf8" strokeWidth={3} dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip contentStyle={{ background: '#2e1065', border: 'none', color: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* Disco */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Uso de Disco</CardTitle>
            <HardDrive className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ProgressRing
              progress={stats.disk}
              size={120}
              strokeWidth={8}
              color="#f472b6"
            />
            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={history}>
                  <Line type="monotone" dataKey="disk" stroke="#f472b6" strokeWidth={3} dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 8px #f472b6)' }} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip contentStyle={{ background: '#2e1065', border: 'none', color: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Red */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Actividad de Red</CardTitle>
          <Wifi className="h-5 w-5 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {formatBytes(stats.network.upload * 1024)}
              </p>
              <p className="text-sm text-gray-400">Subida/s</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {formatBytes(stats.network.download * 1024)}
              </p>
              <p className="text-sm text-gray-400">Descarga/s</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uptime */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Tiempo en funcionamiento</CardTitle>
          <Clock className="h-5 w-5 text-purple-400" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">
              {formatUptime(stats.uptime)}
            </p>
            <p className="text-sm text-gray-400">Activo</p>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-800/20">
              <p className="text-sm text-gray-400">Carga promedio</p>
              <p className="text-lg font-bold">0.{Math.floor(Math.random() * 99)}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-800/20">
              <p className="text-sm text-gray-400">Procesos</p>
              <p className="text-lg font-bold">{150 + Math.floor(Math.random() * 50)}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-600/20 to-green-800/20">
              <p className="text-sm text-gray-400">Temperatura</p>
              <p className="text-lg font-bold">{45 + Math.floor(Math.random() * 20)}°C</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-600/20 to-orange-800/20">
              <p className="text-sm text-gray-400">Hilos</p>
              <p className="text-lg font-bold">{800 + Math.floor(Math.random() * 200)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
