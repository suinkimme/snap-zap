import { useEffect, useRef } from "react";

export default function Canvas(
  props: React.CanvasHTMLAttributes<HTMLCanvasElement>
) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  // 이미지를 붙여넣기 위한 함수
  const pasteImageFromClipboard = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const img = new Image();

        img.onload = () => {
          const canvas = ref.current;
          const context = canvas?.getContext("2d");
          if (canvas && context) {
            const { width: cwidth, height: cheight } = canvas;
            const centerX = cwidth / 2;
            const centerY = cheight / 2;
            const startX = centerX - img.width / 2;
            const startY = centerY - img.height / 2;

            context.clearRect(0, 0, cwidth, cheight);
            context.drawImage(img, startX, startY, img.width, img.height);
          }
        };

        if (blob) {
          img.src = URL.createObjectURL(blob);
        }

        break;
      }
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      pasteImageFromClipboard(event);
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return <canvas ref={ref} {...props} />;
}
