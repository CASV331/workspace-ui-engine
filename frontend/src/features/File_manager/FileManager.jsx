import { useState } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { BUILTIN_SONGS } from "../music_player/songs";
import Folder from "./folders/Folder";
import { PUBLIC_FILES } from "virtual:public-assets";

const IMAGE_EXTENSIONS = new Set([
  "avif",
  "gif",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "webp",
]);

const MUSIC_FILES = BUILTIN_SONGS.map((song) => ({
  id: `Music:${song.id}`,
  name: song.name,
  fileName: song.id,
  extension: "mp3",
  url: song.url,
}));

function publicFiles(folderName) {
  return PUBLIC_FILES[folderName] ?? [];
}

const FOLDERS = [
  { name: "Documents", files: publicFiles("Documents") },
  { name: "Downloads", files: publicFiles("Downloads") },
  { name: "Music", files: MUSIC_FILES },
  { name: "Pictures", files: publicFiles("Pictures") },
  { name: "Videos", files: publicFiles("Videos") },
];

function isImageFile(file) {
  return IMAGE_EXTENSIONS.has(file.extension);
}

function FolderGlyph({ color, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmptyFolder({ name, color, mutedColor }) {
  return (
    <div
      className="flex min-h-full flex-col items-center justify-center gap-2 text-center"
      style={{ color }}
    >
      <FolderGlyph color={color} className="h-10 w-10" />
      <p>This folder is empty</p>
      <p className="max-w-60 text-[10px]" style={{ color: mutedColor }}>
        Files added to {name} will appear here.
      </p>
    </div>
  );
}

function PicturesGrid({ files, colors }) {
  const { bg2, fg0, fg2 } = colors;

  return (
    <div className="grid grid-cols-2 gap-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="overflow-hidden rounded-md"
          style={{ backgroundColor: bg2, border: `1px solid ${fg2}` }}
        >
          {isImageFile(file) ? (
            <img
              src={file.url}
              alt={file.name}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div
              className="flex aspect-video w-full items-center justify-center"
              style={{ color: fg2 }}
            >
              file
            </div>
          )}
          <div className="p-2">
            <p className="truncate" style={{ color: fg0 }}>
              {file.name}
            </p>
            <p className="truncate text-[10px]" style={{ color: fg2 }}>
              {file.fileName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FileList({ files, folderName, colors }) {
  const { accent, bg2, fg0, fg2 } = colors;
  const glyph = folderName === "Music" ? "♪" : "▤";

  return (
    <div className="flex flex-col gap-1">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-2 rounded px-2 py-1.5"
          style={{ backgroundColor: bg2 }}
        >
          <span className="w-4 shrink-0 text-center" style={{ color: accent }}>
            {glyph}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate" style={{ color: fg0 }}>
              {file.name}
            </p>
            <p className="truncate text-[10px]" style={{ color: fg2 }}>
              {file.fileName}
            </p>
          </div>
          <span
            className="shrink-0 text-[10px] uppercase"
            style={{ color: fg2 }}
          >
            {file.extension || "file"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FileManager() {
  const { config } = useConfig();
  const colors = config.colors;
  const { accent, bg2, bg3, fg0, fg1, fg2 } = colors;

  const [activeFolder, setActiveFolder] = useState(null);
  const activeFolderData = FOLDERS.find(
    (folder) => folder.name === activeFolder,
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col font-mono text-xs">
      <nav
        className="flex shrink-0 items-center gap-2 p-1"
        style={{ borderBottom: `1px solid ${fg2}` }}
      >
        <button
          type="button"
          onClick={() => setActiveFolder(null)}
          disabled={!activeFolder}
          className="rounded-sm px-2 py-1 transition-opacity hover:opacity-70 disabled:cursor-default"
          style={{
            border: `1px solid ${fg2}`,
            color: activeFolder ? fg0 : fg2,
            opacity: activeFolder ? 1 : 0.5,
          }}
        >
          ←
        </button>

        <div
          className="min-w-0 flex-1 rounded-sm px-2 py-1 font-bold"
          style={{ backgroundColor: bg2, color: fg0 }}
        >
          <p className="truncate">
            Personal folder
            {activeFolder ? ` / ${activeFolder}` : ""}
          </p>
        </div>

        <span className="shrink-0 text-[10px]" style={{ color: fg2 }}>
          {activeFolderData
            ? `${activeFolderData.files.length} items`
            : `${FOLDERS.length} folders`}
        </span>
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside
          className="w-28 shrink-0 overflow-y-auto p-1"
          style={{ borderRight: `1px solid ${fg2}` }}
        >
          <p
            className="px-2 py-1 text-[10px] uppercase tracking-wider"
            style={{ color: fg2 }}
          >
            Personal folder
          </p>

          {FOLDERS.map((folder) => {
            const isActive = folder.name === activeFolder;

            return (
              <button
                key={folder.name}
                type="button"
                onClick={() => setActiveFolder(folder.name)}
                className="flex w-full items-center gap-2 rounded px-2 py-1 text-left transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: isActive ? bg3 : "transparent",
                  color: isActive ? accent : fg1,
                }}
              >
                <FolderGlyph color={isActive ? accent : fg1} />
                <span className="min-w-0 flex-1 truncate">{folder.name}</span>
                <span className="text-[10px]" style={{ color: fg2 }}>
                  {folder.files.length}
                </span>
              </button>
            );
          })}
        </aside>

        <section className="min-w-0 flex-1 overflow-y-auto p-2">
          {!activeFolderData ? (
            <div className="grid grid-cols-2 gap-2">
              {FOLDERS.map((folder) => (
                <button
                  key={folder.name}
                  type="button"
                  onClick={() => setActiveFolder(folder.name)}
                  className="flex flex-col items-center rounded-md p-2 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: bg2,
                    border: `1px solid ${fg2}`,
                  }}
                >
                  <Folder name={folder.name} />
                  <span className="mt-1 text-[10px]" style={{ color: fg2 }}>
                    {folder.files.length} items
                  </span>
                </button>
              ))}
            </div>
          ) : activeFolderData.files.length === 0 ? (
            <EmptyFolder
              name={activeFolderData.name}
              color={fg1}
              mutedColor={fg2}
            />
          ) : activeFolderData.name === "Pictures" ? (
            <PicturesGrid files={activeFolderData.files} colors={colors} />
          ) : (
            <FileList
              files={activeFolderData.files}
              folderName={activeFolderData.name}
              colors={colors}
            />
          )}
        </section>
      </div>
    </div>
  );
}
