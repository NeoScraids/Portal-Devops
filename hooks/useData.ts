'use client'

import { useState, useEffect } from 'react'
import { generateMockSystemData, generateMockLogs, generateMockAlerts } from '@/lib/utils'
import type { SystemStats, LogEntry, Alert } from '@/types'

export function useSystemStats() {
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateStats = () => {
      setStats(generateMockSystemData())
      setLoading(false)
    }

    updateStats()
    const interval = setInterval(updateStats, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLogs = () => {
      setLogs(generateMockLogs())
      setLoading(false)
    }

    loadLogs()
    const interval = setInterval(loadLogs, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return { logs, loading }
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAlerts = () => {
      setAlerts(generateMockAlerts())
      setLoading(false)
    }

    loadAlerts()
    const interval = setInterval(loadAlerts, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ))
  }

  return { alerts, loading, acknowledgeAlert }
}
