'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { 
  Play, 
  Plus, 
  Edit, 
  Trash2, 
  Terminal, 
  Save, 
  X,
  FileText,
  Code
} from 'lucide-react'
import type { Script } from '@/types'

export default function ScriptManager() {
  const [scripts, setScripts] = useState<Script[]>([
    {
      id: 1,
      name: 'System Health Check',
      content: '#!/bin/bash\necho "Checking system health..."\ndf -h\nfree -m\nuptime',
      language: 'bash',
      lastModified: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Clean Logs',
      content: 'find /var/log -name "*.log" -mtime +7 -delete\necho "Old logs cleaned"',
      language: 'bash',
      lastModified: new Date().toISOString(),
    },
  ])

  const [editingScript, setEditingScript] = useState<Script | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)

  const handleCreateScript = () => {
    setEditingScript({
      id: Date.now(),
      name: '',
      content: '',
      language: 'bash',
      lastModified: new Date().toISOString(),
    })
    setIsCreating(true)
  }

  const handleSaveScript = () => {
    if (!editingScript) return

    if (isCreating) {
      setScripts(prev => [...prev, editingScript])
    } else {
      setScripts(prev => prev.map(script => 
        script.id === editingScript.id 
          ? { ...editingScript, lastModified: new Date().toISOString() }
          : script
      ))
    }

    setEditingScript(null)
    setIsCreating(false)
  }

  const handleDeleteScript = (id: number) => {
    setScripts(prev => prev.filter(script => script.id !== id))
  }

  const handleRunScript = async (script: Script) => {
    setIsRunning(true)
    setOutput('Running script...\n')
    
    // Simulate script execution
    setTimeout(() => {
      const mockOutput = `Script: ${script.name}
Language: ${script.language}
Status: Executed successfully
Output:
---
System check completed
Memory usage: 67%
Disk usage: 45%
All services running normally
---
Execution time: 2.34s`
      setOutput(mockOutput)
      setIsRunning(false)
    }, 2000)
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'bash': return 'text-green-400'
      case 'python': return 'text-blue-400'
      case 'javascript': return 'text-yellow-400'
      case 'powershell': return 'text-purple-400'
      default: return 'text-gray-400'
    }
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
        <h2 className="text-2xl font-bold text-white">Gestor de Scripts</h2>
        <Button onClick={handleCreateScript} variant="glass" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Script
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biblioteca de Scripts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Biblioteca de Scripts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {scripts.map((script) => (
                <motion.div
                  key={script.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className={`p-4 rounded-xl border glass flex flex-col gap-2 bg-gradient-to-br from-[#2e1065]/60 to-[#1e1b4b]/60`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-purple-400" />
                      <span className="font-semibold text-white">{script.name}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded bg-purple-900/40 ${getLanguageColor(script.language)}`}>{script.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditScript(script)} className="text-blue-400 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteScript(script.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-gray-300 text-xs mt-1">Última modificación: {new Date(script.lastModified).toLocaleString('es-ES')}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {editingScript ? (isCreating ? 'Crear Script' : 'Editar Script') : 'Editor de Script'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingScript ? (
              <>
                <Input
                  placeholder="Nombre del script"
                  value={editingScript.name}
                  onChange={(e) => setEditingScript(prev => 
                    prev ? { ...prev, name: e.target.value } : null
                  )}
                />
                <Input
                  placeholder="Lenguaje (bash, python, etc)"
                  value={editingScript.language}
                  onChange={(e) => setEditingScript(prev => 
                    prev ? { ...prev, language: e.target.value as Script['language'] } : null
                  )}
                />
                <Textarea
                  placeholder="Código del script"
                  value={editingScript.content}
                  onChange={(e) => setEditingScript(prev => 
                    prev ? { ...prev, content: e.target.value } : null
                  )}
                  rows={6}
                />
                <div className="flex gap-2 justify-end">
                  <Button onClick={handleSaveScript} variant="glass" className="gap-2">
                    <Save className="h-4 w-4" />
                    Guardar
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingScript(null)
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
              <div className="text-gray-400 text-center py-8">Selecciona o crea un script para editar</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Salida del Script */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Salida del Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm min-h-32">
            {isRunning ? (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-yellow-400"
              >
                Ejecutando script...
              </motion.div>
            ) : (
              <pre className="text-green-400 whitespace-pre-wrap">
                {output || 'Sin salida aún. Ejecuta un script para ver resultados.'}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
