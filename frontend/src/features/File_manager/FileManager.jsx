export function FileManager() {
  return (
    <div className="flex-1">
      <nav className="flex flex-1 gap-5 p-1 items- border-b">
        <div className="flex p-1 items-center justify-center gap-1">
          <button className="border-[0.5px] rounded-sm px-1">{"<"}</button>
          <button className="border-[0.5px] rounded-sm px-1">{">"}</button>
        </div>
        <div className="flex px-1 rounded-sm items-center font-bold border-[0.5px] flex-1">
          <p>Personal folder</p>
        </div>
      </nav>
      <div>
        
      </div>
    </div>
  );
}
