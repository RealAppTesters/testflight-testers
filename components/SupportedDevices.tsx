export default function SupportedDevices() {
  const devices = [
    { icon: "fa-mobile-alt", label: "iPhone" },
    { icon: "fa-mobile-alt", label: "iPhone Plus" },
    { icon: "fa-mobile-alt", label: "iPhone Pro" },
    { icon: "fa-mobile-alt", label: "iPhone Pro Max" },
    { icon: "fa-tablet-alt", label: "iPad" },
    { icon: "fa-tablet-alt", label: "iPad Air" },
    { icon: "fa-tablet-alt", label: "iPad Pro" },
    { icon: "fa-clock", label: "Apple Watch", coming: "Soon" },
    { icon: "fa-tv", label: "Apple TV", coming: "Soon" },
    { icon: "fa-eye", label: "Vision Pro", coming: "Soon" },
    { icon: "fa-laptop", label: "Mac", coming: "Soon" },
  ];

  return (
    <div className="devices-grid">
      {devices.map((device, index) => (
        <div className="device-chip" key={index}>
          <i className={`fas ${device.icon}`}></i> {device.label}
          {device.coming && <span className="coming">{device.coming}</span>}
        </div>
      ))}
    </div>
  );
}
