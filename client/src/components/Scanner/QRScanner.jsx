import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ onScanSuccess }) {
  const scannerRef = useRef(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
      });

      scannerRef.current.render(
        (decodedText) => {
          if (!scanned) {
            setScanned(true);

            // Stop scanner after first successful scan
            scannerRef.current
              .clear()
              .then(() => {
                onScanSuccess(decodedText);
              })
              .catch((err) => console.error("Clear error:", err));
          }
        },
        (error) => {},
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {}); // prevent crash on unmount
      }
    };
  }, [scanned, onScanSuccess]);

  return (
    <div className="max-w-md mx-auto">
      <div id="reader" className="rounded-xl overflow-hidden border-4 border-blue-500"></div>

      {scanned && (
        <button
          onClick={() => {
            setScanned(false);
            scannerRef.current.render(
              (decodedText) => {
                setScanned(true);
                scannerRef.current.clear().then(() => {
                  onScanSuccess(decodedText);
                });
              },
              () => {},
            );
          }}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl"
        >
          Scan Again
        </button>
      )}
    </div>
  );
}
