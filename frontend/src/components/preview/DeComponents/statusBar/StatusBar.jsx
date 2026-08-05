import { useState, useEffect, useMemo } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";
import { BarIcon } from "./shared/BarIcon";
import { Battery } from "./right/ Battery";

export function StatusBar() {
    const { config, desktopState, switchDesktop } = useConfig();
    const { activeDesktop, desktops } = desktopState
    const {
        background,
        backgroundOpacity,
        textColor,
        fontSize,
        borderColor,
        borderOpacity,
        borderWidth,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight
    } = config.statusBar;


    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="items-center max-h-9">
            <div
                className="flex items-center"
                style={{
                    backgroundColor: background,
                    // borderTop: '0px',
                    // border: `${borderWidth}px solid ${borderColor}`,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    // margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
                }}
            >
                <div className="flex flex-1 justify-start items-center px-2">
                    <div className="flex">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].filter(desktop =>
                            desktops[desktop].windows.length > 0 || desktop === activeDesktop
                        )
                            .map(desktop => (
                                <button
                                    key={desktop}
                                    onClick={() => switchDesktop(desktop)}
                                    className={"px-2 py-1 border rounded-lg mx-0.5"}
                                    style={{
                                        backgroundColor: desktop === activeDesktop ? background : "transparent",
                                        border: `1px solid ${desktop === activeDesktop ? borderColor : background}`,
                                        hover: {
                                            border: borderColor,
                                            background
                                        }
                                    }}
                                >
                                    {desktop}
                                </button>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-1 justify-center items-center">
                    <div className="text-center rounded-lg font-bold"
                        style={{
                            backgroundColor: background,
                            padding: "4px 14px"
                        }}>
                        {formattedTime}
                    </div>
                </div>

                <div className="flex flex-1 justify-end items-center px-2">
                    <div className="flex flex-1 items-center justify-end gap-4">
                        <div className="flex items-center gap-1">
                            SSID Name
                            <BarIcon>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 7.43643C21.6134 7.14433 17.7646 4 12 4C6.2268 4 2.3866 7.14433 2 7.43643L12 19.8935L22 7.43643Z" fill={`${textColor}`}></path> </g></svg>
                            </BarIcon>
                        </div>
                        <div className="flex items-center gap-1">
                            <BarIcon>
                                <svg fill={`${textColor}`} viewBox="0 -2 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>volume1</title> <path d="M23.67 10.583l-0.99 2.019c0.947 0.812 1.547 2.017 1.547 3.361 0 1.482-0.336 2.822-1.453 3.626l0.957 1.707c1.461-1.311 2.381-3.213 2.381-5.331-0.001-2.145-0.946-4.071-2.442-5.382zM31.018 3.513l-1.393 1.69c2.598 2.836 4.242 6.615 4.242 10.764 0 4.142-1.641 7.916-4.23 10.751l1.391 1.725c2.963-3.336 4.758-7.648 4.758-12.476-0.001-4.815-1.819-9.12-4.768-12.454zM27.322 6.966l-1.24 1.783c1.842 1.85 3.010 4.4 3.010 7.217 0 2.874-1.215 5.469-3.123 7.329l1.289 1.711c2.305-2.354 3.693-5.484 3.693-9.039 0-3.489-1.398-6.658-3.629-9.001zM0 12.007v8.090c0 1.031 0.896 2.354 2 2.354h6.027v-12.939h-6.027c-1.104 0-2 1.465-2 2.495zM17.341 3.619l-8.381 5.777v13.25l8.381 5.84c1.104 0 2.688-0.836 2.688-1.867v-21.133c0-1.031-1.584-1.867-2.688-1.867z"></path> </g></svg>
                            </BarIcon>
                            100%
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <Battery textColor={textColor} />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <BarIcon>
                                <svg className="w-full h-full" fill={`${textColor}`} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M28.3 22.247c-1.167-1.419-2.765-3.429-2.765-5.48v-6.53c0-5.625-4.207-10.202-9.584-10.202-5.378 0-9.552 4.577-9.552 10.202v6.53c0 2.016-1.734 3.921-2.833 5.4-0.989 1.328-1.77 2.378-1.242 3.427 0.463 0.923 1.624 1.041 2.583 1.041h5.73c0.002 2.944 2.389 5.331 5.333 5.331s5.333-2.386 5.334-5.331h5.864c0.61 0 2.036 0 2.527-1.038 0.495-1.050-0.297-2.016-1.395-3.351zM15.969 29.871c-1.788 0-3.239-1.448-3.241-3.235h6.482c-0.003 1.787-1.452 3.235-3.241 3.235zM27.168 24.506h-22.262c-0.153 0-0.281-0.005-0.386-0.012 0.206-0.319 0.508-0.727 0.755-1.058 1.218-1.637 3.255-3.949 3.255-6.669v-6.53c0-4.452 3.22-8.073 7.423-8.073s7.455 3.622 7.455 8.073v6.53c0 2.813 1.878 5.164 3.249 6.832 0.231 0.281 0.507 0.617 0.722 0.905-0.064 0.002-0.134 0.003-0.209 0.003z"></path> </g></svg>
                            </BarIcon>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}