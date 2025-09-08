import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from 'react';

type QrCodeData = {
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  filename: string;
}

function App() {
  const [qrValue, setQrValue] = useState("https://www.frontendmentor.io/");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#2c7dfa");
  const [qrSize, setQrSize] = useState(55);
  const [fileName, setFileName] = useState(`qrcode-${new Date().toISOString().replace(/[-:T]/g, '').split('.')[0]}`);
  const [savedQrCodes, setSavedQrCodes] = useState<QrCodeData[]>([]);

  const resetCustomization = () => {
    setQrValue("https://www.frontendmentor.io/");
    setFgColor("#ffffff");
    setBgColor("#2c7dfa");
    setQrSize(55);
    setFileName(`qrcode-${new Date().toISOString().replace(/[-:T]/g, '').split('.')[0]}`);
  };

  const handleSave = () => {
    const newQrCode = {
      text: qrValue,
      foregroundColor: fgColor,
      backgroundColor: bgColor,
      size: qrSize,
      filename: fileName
    }
    
    const stored = localStorage.getItem("qrcodes");
    const existingData: QrCodeData[] = stored ? JSON.parse(stored) : [];
    const index = existingData.findIndex(item => item.filename === fileName);
    let updatedData;
    if (index !== -1) {
      existingData[index] = newQrCode;
      updatedData = [...existingData];
    } else {
      updatedData = [...existingData, newQrCode];
    }
    localStorage.setItem("qrcodes", JSON.stringify(updatedData));
    setSavedQrCodes(updatedData);
    resetCustomization();
  };

  const ref = useRef(null);
  const handleDownload = () => {
    if (ref.current) {
      toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
    }
  };

  const handleDelete = () => {
    const stored = localStorage.getItem("qrcodes");
    if (stored) {
      const existingData: QrCodeData[] = JSON.parse(stored);
      const updatedData = existingData.filter(item => item.filename !== fileName);
      localStorage.setItem("qrcodes", JSON.stringify(updatedData));
      setSavedQrCodes(updatedData);
      resetCustomization();
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("qrcodes");
    stored && setSavedQrCodes(JSON.parse(stored));
  }, []);

  return (
    <main className="bg-component-bg p-8 m-8 rounded-2xl shadow-xl flex flex-col tl:grid tl:grid-cols-2 gap-8">
      <h1 className="text-header-fg text-3xl font-bold col-span-full text-center">QR Code Generator</h1>
      <section className="aspect-square flex justify-center rounded-2xl overflow-hidden" style={{backgroundColor: bgColor}} ref={ref}>
        <QRCode value={qrValue} level="M" bgColor={bgColor} fgColor={fgColor} style={{width: `${qrSize}%`, height: "auto"}} />
      </section>
      <section className="tl:aspect-square flex flex-col gap-4">
        <div className="criteria">
          <label>Enter text or URL:</label>
          <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} />
        </div>
        <div className="share">
          <div className="criteria">
            <label>Foreground:</label>
            <input type="color" className="h-10 rounded-lg border border-solid border-page-bg bg-gray-200" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
          </div>
          <div className="criteria">
            <label>Background:</label>
            <input type="color" className="h-10 rounded-lg border border-solid border-page-bg bg-gray-200" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </div>
        <div className="criteria">
          <label>Size:</label>
          <div className="share">
            <input className="appearance-reset" type="range" value={qrSize} min={50} max={100} onChange={(e) => setQrSize(Number(e.target.value))} />
            <input type="number" className="w-16" value={qrSize} min={50} max={100} onChange={(e) => setQrSize(Number(e.target.value))} />
            <span>%</span>
          </div>
        </div>
        <div className="criteria">
          <label>Enter file name:</label>
          <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </div>
      </section>
      <section id="buttons" className="flex flex-col gap-4">
        <button className="bg-text-fg" onClick={handleSave} disabled={!qrValue.trim() || !fileName.trim()}>Save</button>
        <button className="bg-accent-bg" onClick={handleDownload} disabled={!qrValue.trim() || !fileName.trim()}>Download</button>
        <button className="bg-header-fg" onClick={resetCustomization}>Reset</button>
        <button className="bg-text-fg" onClick={handleDelete} disabled={savedQrCodes.length === 0}>Delete</button>
      </section>
      {savedQrCodes.length === 0 ? (
        <section id="load" className="bg-disable-bg rounded-lg flex justify-center items-center h-60">
          <p>No QR codes saved.</p>
        </section>
      ) : (
        <section id="load" className="bg-disable-bg rounded-lg p-2">
          <div className="flex flex-col gap-2 max-tl:min-h-56 tl:h-56 tl:overflow-auto">
            {savedQrCodes.map((item, index) => (
              <button className="bg-component-bg p-1 text-left text-header-fg" key={index} onClick={() => {
                setQrValue(item.text);
                setFgColor(item.foregroundColor);
                setBgColor(item.backgroundColor);
                setQrSize(item.size);
                setFileName(item.filename);
              }}>{item.filename}</button>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default App