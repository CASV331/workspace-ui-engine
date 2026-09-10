export function DeviceInfo({powered, state}) {
  return (
    <fieldset
      className="mb-2 border px-3 pb-2"
      style={{ borderColor: "var(--text-primary)" }}
    >
      <legend className="px-2">
        Device
      </legend>

      <div className="grid grid-cols-6 text-center font-bold">
        <span>Name</span>
        <span>Mode</span>
        <span>Powered</span>
        <span>State</span>
        <span>Frequency</span>
        <span>Security</span>
      </div>

      <div className="grid grid-cols-6 text-center">
        <span>wlan0</span>
        <span>station</span>
        <span>{powered ? "On" : "Off"}</span>
        <span>{state ? "Connected" : "Disconected"}</span>
        <span>5.28 GHz</span>
        <span>WPA2-Personal</span>
      </div>
    </fieldset>
  );
}