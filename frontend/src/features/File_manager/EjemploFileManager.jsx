import { useState, useMemo } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { useFilesystem } from "../../contexts/FilesystemContext";
import { FILE_ASSOCIATIONS } from "../../core/filesystem/filesystem";

/**
 * FileManager - Simula un gestor de archivos como Dolphin.
 * Navegación por directorios, breadcrumbs, iconos y apertura de archivos con doble clic.
 */
export default function FileManager() {
  const { config, openWindow } = useConfig();
  const { filesystem } = useFilesystem(); // Raíz del árbol virtual

  // Ruta actual como string "/home/user"
  const [currentPath, setCurrentPath] = useState("/home/user");

  // Obtener el nodo del directorio actual
  const currentNode = useMemo(() => {
    if (!filesystem) return null;
    const parts = currentPath.split("/").filter(Boolean);
    let node = filesystem;
    for (const part of parts) {
      if (!node || node.type !== "dir") return null;
      node = node.children?.find((child) => child.name === part);
    }
    return node;
  }, [filesystem, currentPath]);

  // Contenido del directorio actual (directorios primero, luego archivos)
  const contents = useMemo(() => {
    if (!currentNode || !currentNode.children) return [];
    const dirs = currentNode.children.filter((c) => c.type === "dir");
    const files = currentNode.children.filter((c) => c.type === "file");
    return [...dirs, ...files];
  }, [currentNode]);

  // Navegación
  const navigateTo = (path) => setCurrentPath(path);
  const goBack = () => {
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length <= 1) return;
    parts.pop();
    setCurrentPath("/" + parts.join("/"));
  };
  const goHome = () => setCurrentPath("/home/user");

  // Abrir archivo con doble clic
  const handleFileDoubleClick = (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const association = FILE_ASSOCIATIONS[ext];
    if (!association) return;

    const { app, icon } = association;
    const props = {};

    switch (app) {
      case "rmpc":
        if (file.meta?.song?.index !== undefined) {
          props.songIndex = file.meta.song.index;
        }
        break;
      case "imageview":
        props.url = file.url;
        props.name = file.name;
        break;
      case "texteditor":
        props.content = file.content || "";
        props.name = file.name;
        break;
      default:
        break;
    }

    openWindow(app, props);
  };

  // Breadcrumbs
  const breadcrumbs = useMemo(() => {
    const parts = currentPath.split("/").filter(Boolean);
    return parts.map((part, index) => {
      const path = "/" + parts.slice(0, index + 1).join("/");
      return { name: part, path };
    });
  }, [currentPath]);
    export function buildFilesystem() {
  // Cargar canciones reales desde /public/assets/music
  const songModules = import.meta.glob('/assets/music/*.mp3', {
    eager: true,
    query: '?url',
    import: 'default',
  });
}

  return (
    <div
      className="flex flex-col h-full w-full text-sm select-none"
      style={{
        backgroundColor: config.colors.surface,
        color: config.colors.onSurface,
        border: `1px solid ${config.colors.outline}`,
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {/* Barra de herramientas */}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: config.colors.outline }}>
        <button
          onClick={goBack}
          className="px-2 py-1 rounded hover:bg-opacity-10"
          style={{ color: config.colors.onSurface }}
          title="Atrás"
        >
          ←
        </button>
        <button
          onClick={goHome}
          className="px-2 py-1 rounded hover:bg-opacity-10"
          style={{ color: config.colors.onSurface }}
          title="Inicio"
        >
          ⌂
        </button>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.path} className="flex items-center gap-1">
              {index > 0 && <span style={{ color: config.colors.outline }}>›</span>}
              <button
                onClick={() => navigateTo(crumb.path)}
                className="px-1 rounded hover:bg-opacity-10"
                style={{ color: index === breadcrumbs.length - 1 ? config.colors.primary : config.colors.onSurface }}
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Lista de archivos y directorios */}
      <div className="flex-1 overflow-auto p-2">
        <div className="grid grid-cols-1 gap-1">
          {contents.map((item) => (
            <div
              key={item.path}
              className="flex items-center gap-3 px-2 py-1 rounded cursor-default hover:bg-opacity-10"
              style={{ color: config.colors.onSurface }}
              onClick={() => {
                if (item.type === "dir") navigateTo(item.path);
              }}
              onDoubleClick={() => {
                if (item.type === "file") handleFileDoubleClick(item);
              }}
              title={item.path}
            >
              <span className="text-lg" style={{ width: "24px", textAlign: "center" }}>
                {item.type === "dir" ? "📁" : FILE_ASSOCIATIONS[item.name.split(".").pop().toLowerCase()]?.icon || "📄"}
              </span>
              <span>{item.name}</span>
            </div>
          ))}
          {contents.length === 0 && (
            <div className="text-center py-4" style={{ color: config.colors.outline }}>
              Carpeta vacía
            </div>
          )}
        </div>
      </div>
    </div>
  );
}