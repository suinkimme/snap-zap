// components
import IconButton from './components/IconButton/IconButton';

export default function App() {
  return (
    <div className="h-screen w-screen bg-[#000000]">
      <IconButton
        iconPath="/icons/ic-square-white.svg"
        iconAlt="rectangle"
        onClick={console.log}
      />
    </div>
  );
}
