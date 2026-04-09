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
    showAvatar: true,
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
    const dummyString =
      "UklGRjoCAABXRUJQVlA4IC4CAABwEwCdASpOAGQAP2WgwVizLKejszVdsmAsiWMAzjhtiwbpy0p0rrTiu4iSs5t0YUqF6o0FN9NIGV_q1VndjZn_JRilJmeBOWo6J5WIEDozqjOnFQTbs1_FpSseNUA2WMHALzbGZT-QRvj5Ez1JeG1qG0Nl8DIGjDSzKSno77DhCt14YN9iGs5bc1L7uc4khsBFS4qGKj6ICh0ljysMUuGXEGRfAAD-8EKn3r5a_R6s9OOpNUeULYLJkLtEhr-BjscTjO2jbYthe-B22n-U0uCH7Rz82NDARjXhSYFhMwQGz3UZfGPjKq3t9XiXuGVfIfl0iS-qeqOxVdVla8CEM0PWeeQMaM24S1l9GfL0i4oHskc1m4e3Ka_ehrtffW9KTFrvLZdiaAtre9L65A9NcYlZxC9qh5AAyufYegeU7WjAWPCC1mBraVAA7Q3tO3Rpfcw1QRz6nWAFdFx4EykVItku8d7I4tp-R054l706QZAxfTps3sXn7VzCM8qAU53ZGDi7HOB8ZLSq4CQysnjFfb6a3VioaX54UlQ8-96NrsFjBAfuevsO76fbyzqdIF1mEnjFPHl27-3u-JLL23AO87yTe18UTLRLbUOZpdLZYj1YsPFZZEXQ9-aeEQhMAT87Jj4zypOSzttn-vbMPRx2fNr-VfxdJH38LhHHZCXS38uHMNwYlojdxqlZyoon62BWvUI2Ypngu1DOQUMOCY_vIjdBANTY4BwufiRUohSYkAA:DLT:Eyuel Kebede Zegeye :V:4:G:M:A:3870417260512897:D:2002/06/05:SIGN:eyJhbGciOiJSUzI1NiJ9..bPeVOtsuKs-5xXeiNYXR_PdP84rgGL5010SR_hKPuOlRFRNY-tda10QVeK_9lvjxxNXbuusyG9zgNj6oPuI5KhASIppsDM_EMuviB4pPHDD2a_29DHiXixt54DPViQEw5QK73yc3a3LaNJs0O0HD6RHFzDw8BNJfIsrgkoRwEp0IW_QjTu9RTA1ButbsBKBXLvD786DnUlNFuw4mgtKoLjQZkyy7Cs9QAmuSVCyVcE9-lCw8umORYPXtNIKOaUctqMnAuV5VKgJiDMwVI2TRpXYU9F4lB5tZj6I0PWNRfhRv3PpYg9mo7vudZhgJX84BMUijKtlD1y0m7FTgkWamj";
    handleDecode(dummyString);
  };
  const toggleAvatar = () => setDemoData((prev) => ({ ...prev, showAvatar: !prev.showAvatar }));

  const handlePrint = () => {
    window.print();
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
    toggleAvatar,
    handlePrint,
  };
}
