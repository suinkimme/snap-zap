import { useEffect, useRef } from "react";

export default function Canvas(
  props: React.CanvasHTMLAttributes<HTMLCanvasElement>
) {
  const ref = useRef<HTMLCanvasElement>(null);

  const draw = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "red";
    context.fillRect(10, 10, 100, 100);
  };

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (context) {
      draw(context);
    }
  }, []);

  return <canvas ref={ref} {...props} />;
}
