'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { useAlerts } from '@/hooks/useData'
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  X,
  Archive,
  Filter
} from 'lucide-react'

export default function AlertsManager() {
  const { alerts, loading, acknowledgeAlert } = useAlerts()

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'info': return <Info className="h-5 w-5 text-blue-400" />
      default: return <Bell className="h-5 w-5 text-gray-400" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-red-500/50 bg-red-500/10'
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10'
      case 'success': return 'border-green-500/50 bg-green-500/10'
      case 'info': return 'border-blue-500/50 bg-blue-500/10'
      default: return 'border-gray-500/50 bg-gray-500/10'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded animate-pulse" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Traducción de labels y mensajes
  const resumenTipos = [
    { type: 'error', label: 'Crítico', count: alerts?.filter(a => a.type === 'error').length || 0 },
    { type: 'warning', label: 'Advertencia', count: alerts?.filter(a => a.type === 'warning').length || 0 },
    { type: 'info', label: 'Info', count: alerts?.filter(a => a.type === 'info').length || 0 },
    { type: 'success', label: 'Éxito', count: alerts?.filter(a => a.type === 'success').length || 0 },
  ]

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return 'Hace un momento'
    if (diffInHours < 24) return `hace ${diffInHours}h`
    return `hace ${Math.floor(diffInHours / 24)}d`
  }

  const unacknowledgedAlerts = alerts?.filter(alert => !alert.acknowledged) || []
  const acknowledgedAlerts = alerts?.filter(alert => alert.acknowledged) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      className="space-y-6"
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestor de Alertas</h2>
          <p className="text-gray-400">
            {unacknowledgedAlerts.length} alertas activas, {acknowledgedAlerts.length} reconocidas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="glass" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archivar todas
          </Button>
        </div>
      </div>

      {/* Resumen de alertas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resumenTipos.map((stat) => (
          <Card key={stat.type} className={getAlertColor(stat.type)}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                {getAlertIcon(stat.type)}
              </div>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertas activas */}
      {unacknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-400 animate-pulse" />
              Alertas activas ({unacknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence>
              {unacknowledgedAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)} hover:bg-opacity-20 transition-all`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>{formatTimeAgo(alert.timestamp)}</span>
                          <span className="capitalize">{resumenTipos.find(t => t.type === alert.type)?.label || alert.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* Alertas reconocidas */}
      {acknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Alertas reconocidas ({acknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {acknowledgedAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 rounded-lg border border-gray-600/30 bg-gray-600/10 opacity-75"
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-300 mb-1">{alert.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                        <span className="capitalize">{resumenTipos.find(t => t.type === alert.type)?.label || alert.type}</span>
                        <span className="text-green-400">✓ Reconocida</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* Estado vacío */}
      {alerts && alerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl font-semibold text-white mb-2">¡Todo en orden!</h3>
            <p className="text-gray-400">No hay alertas en este momento. Tus sistemas funcionan correctamente.</p>
          </CardContent>
        </Card>
      )}

      {/* Configuración de alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg glass border border-purple-500/30">
              <h4 className="font-medium text-white mb-2">Uso de CPU</h4>
              <p className="text-sm text-gray-400 mb-2">Alerta cuando CPU &gt; 80%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Activa</span>
              </div>
            </div>
            <div className="p-4 rounded-lg glass border border-purple-500/30">
              <h4 className="font-medium text-white mb-2">Uso de Memoria</h4>
              <p className="text-sm text-gray-400 mb-2">Alerta cuando RAM &gt; 90%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Activa</span>
              </div>
            </div>
            <div className="p-4 rounded-lg glass border border-purple-500/30">
              <h4 className="font-medium text-white mb-2">Espacio en Disco</h4>
              <p className="text-sm text-gray-400 mb-2">Alerta cuando disco &gt; 85%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-yellow-400">Advertencia</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
