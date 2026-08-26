import Folder from "./folders/Folder";
export function FileManager() {

  const places = [
    "Personal folder",
    "Desktop",
    "Documents",
    "Downloads",
    "Music",
    "Pictures",
    "Videos",
    "Recycle bin"
  ]

  const folders = [
    "Documents",
    "Downloads",
    "Music",
    "Pictures",
    "Videos",
  ]

  return (
    <div className="flex-1">
      <nav className="flex flex-1 gap-5 p-1 items-center border-b">
        <div className="flex p-1 items-center justify-center gap-1">
          <button className="border-[0.5px] rounded-sm px-1">{"<"}</button>
          <button className="border-[0.5px] rounded-sm px-1">{">"}</button>
        </div>
        <div className="flex px-1 rounded-sm items-center font-bold border-[0.5px] flex-1">
          <p>Personal folder</p>
        </div>
      </nav>
      <div className="flex flex-1 h-full">
        <div className="w-1/5 border-r h-full">
          {places.map((place) => {
            return (
              <div>
                <p>{`${place}`}</p>
              </div>
            )
          })}
        </div>
        <div className="flex-1 grid grid-cols-4 grid-rows-2  justify-center">
          {folders.map((folder) => {
            return (
              <div key={folder}>
              <Folder
                name = {folder}
              />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
