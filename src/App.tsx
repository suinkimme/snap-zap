import Canvas from "./canvas/Canvas";

export default function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
      <Canvas className="bg-transparent rounded-md w-full h-full" />
    </div>
  );
}
