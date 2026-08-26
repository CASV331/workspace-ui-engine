// import { createContext, useContext, useMemo } from "react";
// import { buildFilesystem } from "../core/filesystem/filesystem";

// const FilesystemContext = createContext(null);

// export function FilesystemProvider({ children }) {
//   const filesystem = useMemo(() => buildFilesystem(), []);

//   return (
//     <FilesystemContext.Provider value={{ filesystem }}>
//       {children}
//     </FilesystemContext.Provider>
//   );
// }

// export function useFilesystem() {
//   const context = useContext(FilesystemContext);
//   if (!context) {
//     throw new Error("useFilesystem debe usarse dentro de un FilesystemProvider");
//   }
//   return context;
// }