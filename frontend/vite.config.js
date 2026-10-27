import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

// Carpetas públicas que FileManager muestra. Las que aún no existen
// devuelven una lista vacía y aparecerán automáticamente al crearlas.
const PUBLIC_FOLDERS = {
  Documents: 'documents',
  Downloads: 'downloads',
  Pictures: 'wallpapers',
  Videos: 'videos',
}

function publicAssetsManifest() {
  const virtualId = 'virtual:public-assets'
  const resolvedId = `\0${virtualId}`

  return {
    name: 'public-assets-manifest',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    configureServer(server) {
      const publicAssetsRoot = path.join(projectRoot, 'public', 'assets')

      const invalidateManifest = (file) => {
        if (!file.startsWith(publicAssetsRoot)) return

        const module = server.moduleGraph.getModuleById(resolvedId)
        if (module) server.moduleGraph.invalidateModule(module)
      }

      server.watcher.add(publicAssetsRoot)
      server.watcher.on('add', invalidateManifest)
      server.watcher.on('unlink', invalidateManifest)
    },
    async load(id) {
      if (id !== resolvedId) return

      const folders = {}

      for (const [folderName, directoryName] of Object.entries(PUBLIC_FOLDERS)) {
        const directory = path.join(
          projectRoot,
          'public',
          'assets',
          directoryName,
        )

        if (!existsSync(directory)) {
          folders[folderName] = []
          continue
        }

        const fileNames = (await readdir(directory, { withFileTypes: true }))
          .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
          .map((entry) => entry.name)
          .sort((a, b) => a.localeCompare(b))

        folders[folderName] = fileNames.map((fileName) => {
          const extensionIndex = fileName.lastIndexOf('.')
          const extension =
            extensionIndex > 0
              ? fileName.slice(extensionIndex + 1).toLowerCase()
              : ''

          return {
            id: `${folderName}:${fileName}`,
            name: fileName
              .replace(/\.[^.]+$/, '')
              .replace(/[-_]/g, ' '),
            fileName,
            extension,
            url: `/assets/${directoryName}/${encodeURIComponent(fileName)}`,
          }
        })
      }

      return `export const PUBLIC_FILES = ${JSON.stringify(folders)}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), publicAssetsManifest()],
})
