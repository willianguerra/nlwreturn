import { Camera, Trash } from "phosphor-react";
import html2Canvas from 'html2Canvas'
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2Canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        className="p-2 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zync-400 hover:text-zync-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 100
        }}
        onClick={() => onScreenshotTook(null)}
        type="button">
        <Trash weight="fill" />
      </button>
    )
  }


  return (
    <button onClick={handleTakeScreenshot} className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500" type="button">
      {isTakingScreenshot ? (<Loading />) : <Camera className="w-6 h-6" />}
    </button>

  )
}