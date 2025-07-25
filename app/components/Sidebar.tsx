'use client'

import { Button } from '@/app/components/ui/button'
import { 
  BarChart3, 
  Terminal, 
  FileText, 
  Clock, 
  Bell, 
  StickyNote,
  Menu,
  X,
  Activity,
  Settings,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeWidget: string
  onWidgetSelect: (widget: string) => void
}

const menuItems = [
  { id: 'system', label: 'Monitor del Sistema', icon: BarChart3 },
  { id: 'scripts', label: 'Gestor de Scripts', icon: Terminal },
  { id: 'logs', label: 'Monitor de Logs', icon: FileText },
  { id: 'cron', label: 'Tareas Programadas', icon: Clock },
  { id: 'alerts', label: 'Alertas', icon: Bell },
  { id: 'notes', label: 'Notas Rápidas', icon: StickyNote },
]

export default function Sidebar({ isOpen, onToggle, activeWidget, onWidgetSelect }: SidebarProps) {
  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="glass"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={onToggle}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar SIEMPRE visible en desktop y visible en mobile para depuración */}
      <div
        className="w-80 h-full glass-dark border-r border-purple-500/30 z-50 flex flex-col p-6 fixed left-0 top-0 lg:static lg:translate-x-0 lg:z-auto"
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 mt-12 lg:mt-0">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DevOpsHub</h1>
            <p className="text-sm text-gray-400">Panel de Infraestructura</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeWidget === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onWidgetSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 neon-glow'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white"
          >
            <Settings className="h-4 w-4 mr-3" />
            Configuración
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Salir
          </Button>
        </div>
      </div>
    </>
  )
}
