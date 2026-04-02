import { useState, useRef } from "react";
import jsQR from "jsqr";

export function useDemoState() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [inputMode, setInputMode] = useState("manual");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const printRef = useRef();

  const [demoData, setDemoData] = useState({
    bgImage: null,
    faydaString: "",
    name: "",
    avatar: null,
    role: "",
    position: "top-left",
    avatarPosition: "left", // NEW: left, top, right
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDemoData({ ...demoData, bgImage: URL.createObjectURL(file) });
    }
  };

  const handleDecode = (text) => {
    if (!text) return;
    const parts = text.split(":");

    if (parts.length >= 13) {
      let base64Image = parts[0].replace(/-/g, "+").replace(/_/g, "/");
      while (base64Image.length % 4 !== 0) {
        base64Image += "=";
      }

      setDemoData((prev) => ({
        ...prev,
        avatar: `data:image/webp;base64,${base64Image}`,
        name: parts[2],
        faydaString: text,
      }));
      setError(null);
    } else {
      setError("Invalid Fayda format.");
    }
  };

  const handleQRImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setDemoData((prev) => ({ ...prev, faydaString: code.data }));
          handleDecode(code.data);
        } else {
          setError("No QR code detected.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const loadDummyFayda = () => {
    const dummyString = "UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJaQAA3AA/v3zgAA=:dummy:Tsegazeab Kebede:dummy:dummy:dummy:Male:dummy:FEY-1234-5678:dummy:2000-01-01:dummy:sig";
    handleDecode(dummyString);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return {
    step,
    setStep,
    error,
    setError,
    inputMode,
    setInputMode,
    isPreviewMode,
    setIsPreviewMode,
    demoData,
    setDemoData,
    printRef,
    handleImageUpload,
    handleQRImageUpload,
    handleDecode,
    loadDummyFayda,
    handlePrint,
  };
}
