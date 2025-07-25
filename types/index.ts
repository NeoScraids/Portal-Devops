export interface SystemStats {
  cpu: number
  ram: number
  disk: number
  network: {
    upload: number
    download: number
  }
  uptime: number
}

export interface LogEntry {
  id: number
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  service: string
  message: string
}

export interface Alert {
  id: number
  type: 'warning' | 'error' | 'info' | 'success'
  title: string
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface CronJob {
  id: number
  name: string
  schedule: string
  command: string
  enabled: boolean
  lastRun?: string
  nextRun?: string
}

export interface Script {
  id: number
  name: string
  content: string
  language: 'bash' | 'python' | 'javascript' | 'powershell'
  lastModified: string
}

export interface Note {
  id: number
  title: string
  content: string
  created: string
  modified: string
  pinned: boolean
}
