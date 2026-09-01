import { useConfig } from "../../contexts/ConfigContext";
import Folder from "./folders/Folder";

export function FileManager() {
  const { config } = useConfig();
  const { fg0 } = config.colors;
  const places = [
    "Personal folder",
    "Desktop",
    "Documents",
    "Downloads",
    "Music",
    "Pictures",
    "Videos",
    "Recycle bin",
  ];

  const folders = ["Documents", "Downloads", "Music", "Pictures", "Videos"];

  return (
    <div className="flex-1">
      <nav className="flex gap-5 p-1 items-center border-b">
        <div className="flex p-1 items-center justify-center gap-1">
          <button className="border-[0.5px] rounded-sm px-1">{"<"}</button>
          <button className="border-[0.5px] rounded-sm px-1">{">"}</button>
        </div>
        <div className="flex px-1 rounded-sm items-center font-bold border-[0.5px] flex-1">
          <p>Personal folder</p>
        </div>
      </nav>
      <div className="flex flex-1">
        <div className="w-1/5 border-r h-full">
          {/* Personal folder */}
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={fg0}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5.77778 10.2222V18c0 1.1046.89543 2 2 2H12M5.77778 10.2222l5.51512-5.51509a2 2 0 0 1 2.8284 0L17.5 9.5M5.77778 10.2222L4 12M18.2222 10.2222V18c0 1.1046-.8954 2-2 2H12m6.2222-9.7778L20 12m-1.7778-2.2222L17.5 9.5m0-3.5v-.5M12 20v-5" />
              </svg>
            </div>
            Personal folder
          </div>
          {/* Deskop */}
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={fg0}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.50108 7.72905v5.14195c-.04644 1.8459 1.41117 3.3805 3.257 3.429h7.485c1.8462-.0479 3.3044-1.5827 3.258-3.429V7.72905c.0464-1.84588-1.4112-3.38047-3.257-3.429H8.75808c-1.84583.04853-3.30344 1.58312-3.257 3.429Z"
                />
                <path d="M7.5011 19.3h10" />
              </svg>
            </div>
            Desktop
          </div>
          {/* Documents */}
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke={fg0}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.3635 4.51A1.9944 1.9944 0 0 0 8.4189 6.5043v35.0013a1.9945 1.9945 0 0 0 1.9446 1.9944h27.2232a1.9944 1.9944 0 0 0 1.9944-1.9944V14.4719H31.6036a1.9945 1.9945 0 0 1-1.9446-1.9944V4.5Z" />
                <path d="M29.5693 4.51 39.5312 14.4719" />
                <path d="M15.838 22.928h16.2741M15.838 34.994h16.2741M15.838 28.961h16.2741" />
              </svg>
            </div>
            Documents
          </div>
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke={fg0}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              >
                {/* Flecha de descarga */}
                <path
                  d="M6 0v6H0"
                  transform="translate(12 13.757) rotate(45)"
                />
                {/* Línea vertical */}
                <path d="M1 8V0" transform="translate(11 12.5)" />
                {/* Nube */}
                <path
                  d="M12.994 12H16a4 4 0 0 0 0-8h0a3 3 0 0 0-4.957-2.274A4.5 4.5 0 0 0 3.256 6H3a3 3 0 0 0 0 6h3.494"
                  transform="translate(2 3)"
                />
              </svg>
            </div>
            Downloads
          </div>
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={fg0}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7" />
              </svg>
            </div>
            Music
          </div>
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
                  <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill={fg0}
      stroke="none"
    >
      <path d="M28 8v16c0 1.104-0.896 2-2 2h-21c0 1.104 0.896 2 2 2h21c1.104 0 2-0.896 2-2v-16c0-1.104-0.896-2-2-2zM27 23v-16c0-1.104-0.896-2-2-2h-21c-1.104 0-2 0.896-2 2v16c0 1.104 0.896 2 2 2h21c1.104 0 2-0.896 2-2zM4 7h21v16h-21v-16zM15.627 17.311l-2.988-3.181-2.989 5.104-2.242-2.343-2.429 5.129h19.055l-4.297-11.245-4.11 6.536zM8 14c1.104 0 2-0.896 2-2s-0.896-2-2-2-2 0.896-2 2 0.896 2 2 2z" />
    </svg>
            </div>
            Pictures
          </div>
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={fg0}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 10l2.5768-1.54608C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051c.2845.02652.5441.17349.7132.40382C21 8.43848 21 8.90095 21 9.8259v4.3482c0 .9249 0 1.3874-.194 1.6516-.1691.2303-.4287.3773-.7132.4038-.3263.0304-.7229-.2075-1.516-.6834L16 14M6.2 18h6.6c1.1201 0 1.6802 0 2.108-.218.3763-.1917.6823-.4977.874-.874.218-.4278.218-.9879.218-2.108V9.2c0-1.1201 0-1.6802-.218-2.108-.1917-.3763-.4977-.6823-.874-.874C14.4802 6 13.9201 6 12.8 6H6.2c-1.1201 0-1.6802 0-2.108.218-.3763.1917-.6823.4977-.874.874C3 7.51984 3 8.0799 3 9.2v5.6c0 1.1201 0 1.6802.218 2.108.1917.3763.4977.6823.874.874C4.51984 18 5.0799 18 6.2 18Z" />
              </svg>
            </div>
            Videos
          </div>
          <div className="flex p-1 items-center font-light">
            <div className="w-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={fg0}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6v10.2c0 1.6802 0 2.5202-.327 3.162-.2876.5645-.7465 1.0234-1.311 1.311-.6418.327-1.4818.327-3.162.327h-2.4c-1.6802 0-2.5202 0-3.162-.327-.5645-.2876-1.0234-.7465-1.311-1.311C6 18.7202 6 17.8802 6 16.2V6M4 6h16M16 6l-.2706-1.81193c-.2623-.78682-.3935-1.18023-.6367-1.47109-.2148-.25685-.4906-.45566-.8022-.5782C13.9376 3 13.523 3 12.6936 3h-1.3872c-.8294 0-1.244 0-1.5969.13878-.3116.12254-.5914.32135-.8062.5782-.2432.29086-.3743.68427-.6366 1.47109L8 6" />
              </svg>
            </div>
            Trash
          </div>
        </div>
        <div className="flex-1 grid grid-cols-4 grid-rows-2  justify-center">
          {folders.map((folder) => {
            return (
              <div key={folder}>
                <Folder name={folder} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
