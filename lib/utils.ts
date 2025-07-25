import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function generateMockSystemData() {
  return {
    cpu: Math.floor(Math.random() * 100),
    ram: Math.floor(Math.random() * 100),
    disk: Math.floor(Math.random() * 100),
    network: {
      upload: Math.floor(Math.random() * 1000),
      download: Math.floor(Math.random() * 1000),
    },
    uptime: Math.floor(Math.random() * 86400000), // milliseconds
  }
}

export function generateMockLogs() {
  const levels: ('INFO' | 'WARN' | 'ERROR' | 'DEBUG')[] = ['INFO', 'WARN', 'ERROR', 'DEBUG']
  const services = ['nginx', 'postgresql', 'redis', 'api-server', 'worker']
  const messages = [
    'Service started successfully',
    'Connection established',
    'Request processed',
    'Cache miss detected',
    'Database query executed',
    'Authentication failed',
    'Resource not found',
    'Timeout occurred',
  ]
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    level: levels[Math.floor(Math.random() * levels.length)],
    service: services[Math.floor(Math.random() * services.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
  }))
}

export function generateMockAlerts() {
  const types: ('warning' | 'error' | 'info' | 'success')[] = ['warning', 'error', 'info', 'success']
  const titles = [
    'High CPU Usage',
    'Memory Warning',
    'Disk Space Low',
    'Service Down',
    'Network Latency',
    'SSL Certificate Expiring',
    'Backup Completed',
    'Update Available',
  ]
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: types[Math.floor(Math.random() * types.length)],
    title: titles[Math.floor(Math.random() * titles.length)],
    message: 'This is a mock alert message for demonstration purposes.',
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    acknowledged: Math.random() > 0.5,
  }))
}
