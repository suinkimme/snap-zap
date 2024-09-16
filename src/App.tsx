// components
import IconButton from './components/IconButton/IconButton';

// canvas
import Canvas from './canvas/Canvas';

export default function App() {
  return (
    <div className="h-screen w-screen bg-[#000000]">
      <div className="absolute left-1/2 top-9 flex -translate-x-1/2 items-center justify-center gap-9 bg-transparent">
        <IconButton
          iconPath="/icons/ic-square-white.svg"
          iconAlt="rectangle"
          onClick={console.log}
        />
        <IconButton
          iconPath="/icons/ic-square-white.svg"
          iconAlt="rectangle"
          onClick={console.log}
        />
      </div>
      <Canvas />
    </div>
  );
}
