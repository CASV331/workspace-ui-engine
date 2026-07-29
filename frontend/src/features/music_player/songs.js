const songsModules = import.meta.glob("/assets/music/*.mp3", {
    eager: true,
    query: "?url",
    import: "default"
})

export const BUILTIN_SONGS = Object.entries(songsModules).map(([path, url]) => {
    const filename = path.split("/").pop()
    const name = filename.split(".")[0].replace(/-/g, " ")
    return { id: filename, name, url}
})