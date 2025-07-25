'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Save, 
  X,
  CheckCircle,
  XCircle
} from 'lucide-react'
import type { CronJob } from '@/types'

export default function CronManager() {
  const [cronJobs, setCronJobs] = useState<CronJob[]>([
    {
      id: 1,
      name: 'Daily Backup',
      schedule: '0 2 * * *',
      command: '/scripts/backup.sh',
      enabled: true,
      lastRun: '2025-01-23T02:00:00Z',
      nextRun: '2025-01-24T02:00:00Z',
    },
    {
      id: 2,
      name: 'Log Cleanup',
      schedule: '0 0 * * 0',
      command: 'find /var/log -name "*.log" -mtime +30 -delete',
      enabled: true,
      lastRun: '2025-01-21T00:00:00Z',
      nextRun: '2025-01-28T00:00:00Z',
    },
    {
      id: 3,
      name: 'System Health Check',
      schedule: '*/15 * * * *',
      command: '/scripts/health-check.sh',
      enabled: false,
      lastRun: '2025-01-23T14:45:00Z',
      nextRun: undefined,
    },
  ])

  const [editingJob, setEditingJob] = useState<CronJob | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Traducción de descripciones de cron
  const parseCronSchedule = (schedule: string) => {
    const parts = schedule.split(' ')
    if (parts.length !== 5) return 'Horario inválido'
    const [minute, hour, day, month, weekday] = parts
    if (schedule === '0 0 * * *') return 'Diario a la medianoche'
    if (schedule === '0 2 * * *') return 'Diario a las 2:00 AM'
    if (schedule === '0 0 * * 0') return 'Semanal los domingos a la medianoche'
    if (schedule === '*/15 * * * *') return 'Cada 15 minutos'
    if (schedule === '0 */6 * * *') return 'Cada 6 horas'
    return schedule
  }

  const handleCreateJob = () => {
    setEditingJob({
      id: Date.now(),
      name: '',
      schedule: '',
      command: '',
      enabled: true,
    })
    setIsCreating(true)
  }

  const handleSaveJob = () => {
    if (!editingJob) return

    const nextRun = editingJob.enabled 
      ? new Date(Date.now() + Math.random() * 86400000).toISOString()
      : undefined

    const jobToSave = {
      ...editingJob,
      nextRun,
    }

    if (isCreating) {
      setCronJobs(prev => [...prev, jobToSave])
    } else {
      setCronJobs(prev => prev.map(job => 
        job.id === editingJob.id ? jobToSave : job
      ))
    }

    setEditingJob(null)
    setIsCreating(false)
  }

  const handleDeleteJob = (id: number) => {
    setCronJobs(prev => prev.filter(job => job.id !== id))
  }

  const handleToggleJob = (id: number) => {
    setCronJobs(prev => prev.map(job => {
      if (job.id === id) {
        const enabled = !job.enabled
        return {
          ...job,
          enabled,
          nextRun: enabled 
            ? new Date(Date.now() + Math.random() * 86400000).toISOString()
            : undefined
        }
      }
      return job
    }))
  }

  const handleRunNow = (id: number) => {
    setCronJobs(prev => prev.map(job => 
      job.id === id 
        ? { 
            ...job, 
            lastRun: new Date().toISOString(),
            nextRun: job.enabled 
              ? new Date(Date.now() + Math.random() * 86400000).toISOString()
              : undefined
          }
        : job
    ))
  }

  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return 'Nunca'
    return new Date(dateTime).toLocaleString('es-ES')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      className="space-y-6"
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestor de Tareas Programadas</h2>
        <Button onClick={handleCreateJob} variant="glass" className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva tarea programada
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Lista de tareas */}
        <div className="xl:col-span-2 space-y-4">
          <AnimatePresence>
            {cronJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className={`${job.enabled ? 'border-green-500/30' : 'border-gray-500/30'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {job.enabled ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-400" />
                          )}
                          <h3 className="font-semibold text-white text-lg">{job.name}</h3>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-400" />
                            <span className="text-gray-300">{parseCronSchedule(job.schedule)}</span>
                            <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                              {job.schedule}
                            </code>
                          </div>
                          
                          <div className="text-gray-400">
                            <p><span className="text-gray-500">Comando:</span> {job.command}</p>
                            <p><span className="text-gray-500">Última ejecución:</span> {formatDateTime(job.lastRun)}</p>
                            <p><span className="text-gray-500">Próxima ejecución:</span> {formatDateTime(job.nextRun)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleJob(job.id)}
                          className={job.enabled ? 'text-yellow-400' : 'text-green-400'}
                        >
                          {job.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRunNow(job.id)}
                          disabled={!job.enabled}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingJob(job)
                            setIsCreating(false)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingJob ? (isCreating ? 'Crear tarea programada' : 'Editar tarea programada') : 'Editor de tarea'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingJob ? (
              <>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Nombre de la tarea</label>
                  <Input
                    placeholder="Introduce el nombre de la tarea"
                    value={editingJob.name}
                    onChange={(e) => setEditingJob(prev => 
                      prev ? { ...prev, name: e.target.value } : null
                    )}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Horario (Cron)</label>
                  <Input
                    placeholder="0 2 * * *"
                    value={editingJob.schedule}
                    onChange={(e) => setEditingJob(prev => 
                      prev ? { ...prev, schedule: e.target.value } : null
                    )}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formato: minuto hora día mes día_semana
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Comando</label>
                  <Input
                    placeholder="Introduce el comando a ejecutar"
                    value={editingJob.command}
                    onChange={(e) => setEditingJob(prev => 
                      prev ? { ...prev, command: e.target.value } : null
                    )}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={editingJob.enabled}
                    onChange={(e) => setEditingJob(prev => 
                      prev ? { ...prev, enabled: e.target.checked } : null
                    )}
                    className="rounded"
                  />
                  <label htmlFor="enabled" className="text-sm text-gray-300">
                    Habilitar tarea
                  </label>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveJob} variant="glass" className="gap-2">
                    <Save className="h-4 w-4" />
                    Guardar
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingJob(null)
                      setIsCreating(false)
                    }}
                    variant="ghost"
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                Selecciona una tarea para editar o crea una nueva
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Play className="h-6 w-6" />
              Ejecutar todas
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Pause className="h-6 w-6" />
              Pausar todas
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Clock className="h-6 w-6" />
              Ver logs
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Plus className="h-6 w-6" />
              Importar tareas
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
