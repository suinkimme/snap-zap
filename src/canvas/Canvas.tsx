import { useEffect, useRef, useState } from 'react';

export default function Canvas(
  props: React.CanvasHTMLAttributes<HTMLCanvasElement>,
) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [endPos, setEndPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setStartPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setEndPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = () => {
    if (ref.current) {
      setIsDrawing(false);
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        // ctx.clearRect(0, 0, ref.current.width, ref.current.height);
        ctx.beginPath();
        ctx.rect(
          startPos.x,
          startPos.y,
          endPos.x - startPos.x,
          endPos.y - startPos.y,
        );
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };

  // 이미지를 붙여넣기 위한 함수
  const pasteImageFromClipboard = (
    event: ClipboardEvent,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) => {
    const items = event.clipboardData?.items;

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const img = new Image();

        img.onload = () => {
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
    const canvas = ref.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const handlePaste = (event: ClipboardEvent) => {
        pasteImageFromClipboard(event, canvas, context);
      };

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('paste', handlePaste);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('paste', handlePaste);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <canvas
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      {...props}
    />
  );
}
