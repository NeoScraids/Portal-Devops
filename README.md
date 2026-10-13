# Portal-Devops

Panel web de operaciones hecho con Next.js 14 y Tailwind. Junta en una sola pantalla widgets de monitoreo del sistema, logs, alertas, cron jobs, scripts y notas rapidas.

Los datos son simulados (`lib/utils.ts` genera metricas, logs y alertas falsas). Sirve como base de UI para conectarlo a una fuente real, no como herramienta de monitoreo lista para usar.

## Como probarlo

```bash
git clone https://github.com/NeoScraids/Portal-Devops.git
cd Portal-Devops
npm install
npm run dev
```

Abre http://localhost:3000. Necesita Node 18.17 o superior.

## Widgets

- `SystemMonitor`: CPU, RAM y disco con graficas de Recharts
- `LogMonitor`: logs con busqueda y filtro por nivel y servicio
- `AlertsManager`: alertas por tipo, con opcion de marcarlas como reconocidas
- `CronManager`: crear, editar y borrar cron jobs
- `ScriptManager`: crear y editar scripts, la ejecucion es simulada
- `QuickNotes`: notas con busqueda y pin

Cron jobs, scripts y notas viven solo en el estado de React, se pierden al recargar.

## Estructura

```
app/
  page.tsx        pagina principal, cambia de widget desde el sidebar
  components/     sidebar, fondo animado y componentes base de UI
  widgets/        un archivo por widget
hooks/useData.ts  polling de los datos simulados
lib/utils.ts      helpers y generadores de datos falsos
types/            tipos compartidos
```

## Licencia

MIT
