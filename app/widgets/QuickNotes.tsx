'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { 
  StickyNote, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Pin,
  PinOff,
  Search
} from 'lucide-react'
import type { Note } from '@/types'

export default function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Server Maintenance Schedule',
      content: 'Remember to update the production servers this weekend. Schedule downtime from 2 AM to 4 AM EST.',
      created: new Date(Date.now() - 86400000).toISOString(),
      modified: new Date(Date.now() - 3600000).toISOString(),
      pinned: true,
    },
    {
      id: 2,
      title: 'Database Backup Locations',
      content: '/backup/db/production\n/backup/db/staging\n/backup/db/development\n\nDaily backups at 3 AM',
      created: new Date(Date.now() - 172800000).toISOString(),
      modified: new Date(Date.now() - 172800000).toISOString(),
      pinned: false,
    },
    {
      id: 3,
      title: 'API Keys to Rotate',
      content: '- AWS Access Keys (expires March 15)\n- SendGrid API Key\n- Stripe Test Keys\n- MongoDB Connection String',
      created: new Date(Date.now() - 259200000).toISOString(),
      modified: new Date(Date.now() - 86400000).toISOString(),
      pinned: false,
    },
  ])

  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pinnedNotes = filteredNotes.filter(note => note.pinned)
  const unpinnedNotes = filteredNotes.filter(note => !note.pinned)

  const handleCreateNote = () => {
    setEditingNote({
      id: Date.now(),
      title: '',
      content: '',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      pinned: false,
    })
    setIsCreating(true)
  }

  const handleSaveNote = () => {
    if (!editingNote) return

    const noteToSave = {
      ...editingNote,
      modified: new Date().toISOString(),
    }

    if (isCreating) {
      setNotes(prev => [noteToSave, ...prev])
    } else {
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id ? noteToSave : note
      ))
    }

    setEditingNote(null)
    setIsCreating(false)
  }

  const handleDeleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const handleTogglePin = (id: number) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, pinned: !note.pinned, modified: new Date().toISOString() }
        : note
    ))
  }

  // Traducción de textos y placeholders
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Justo ahora'
    if (diffInHours < 24) return `hace ${diffInHours}h`
    if (diffInHours < 48) return 'Ayer'
    return date.toLocaleDateString('es-ES')
  }

  const NoteCard = ({ note }: { note: Note }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={`p-4 rounded-lg glass border transition-all hover:border-purple-500/50 ${
        note.pinned ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-white truncate flex-1">{note.title}</h3>
        <div className="flex gap-1 ml-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleTogglePin(note.id)}
            className={note.pinned ? 'text-yellow-400' : 'text-gray-400'}
          >
            {note.pinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setEditingNote(note)
              setIsCreating(false)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDeleteNote(note.id)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-3 line-clamp-3 whitespace-pre-wrap">
        {note.content}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Modificado {formatDate(note.modified)}</span>
        {note.pinned && (
          <span className="text-yellow-400 font-medium">Anclado</span>
        )}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Notas rápidas y recordatorios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button onClick={handleCreateNote} variant="glass" className="self-end mb-2">
              <Plus className="h-4 w-4 mr-2" /> Nueva nota
            </Button>
            <Input
              placeholder="Buscar nota..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            {/* Lista de notas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.length === 0 && (
                <div className="text-center text-gray-400 col-span-2">No hay notas</div>
              )}
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg glass border ${note.pinned ? 'border-yellow-400' : 'border-purple-500/30'} relative`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white truncate max-w-[70%]">{note.title}</h4>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleTogglePin(note.id)} title={note.pinned ? 'Desanclar' : 'Anclar'}>
                        {note.pinned ? <PinOff className="h-4 w-4 text-yellow-400" /> : <Pin className="h-4 w-4 text-yellow-400" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => { setEditingNote(note); setIsCreating(false); }} title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteNote(note.id)} title="Eliminar">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-300 whitespace-pre-line mb-2">{note.content}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Creada: {formatDate(note.created)}</span>
                    <span>Modificada: {formatDate(note.modified)}</span>
                  </div>
                  {note.pinned && (
                    <span className="absolute top-2 right-2 text-yellow-400 font-medium text-xs">Anclada</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Modal de edición/creación */}
          <AnimatePresence>
            {(isCreating || editingNote) && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md glass border border-purple-500/30">
                  <h3 className="text-lg font-bold mb-4">{isCreating ? 'Nueva nota' : 'Editar nota'}</h3>
                  <Input
                    placeholder="Título de la nota"
                    value={editingNote?.title || ''}
                    onChange={e => setEditingNote({ ...editingNote!, title: e.target.value })}
                    className="mb-2"
                  />
                  <Textarea
                    placeholder="Contenido de la nota..."
                    value={editingNote?.content || ''}
                    onChange={e => setEditingNote({ ...editingNote!, content: e.target.value })}
                    className="mb-2"
                    rows={5}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" onClick={() => { setEditingNote(null); setIsCreating(false); }}>Cancelar</Button>
                    <Button variant="glass" onClick={handleSaveNote}>
                      <Save className="h-4 w-4 mr-2" /> Guardar
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
