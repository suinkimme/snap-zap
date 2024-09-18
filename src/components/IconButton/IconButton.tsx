interface IIconButtonProps {
  iconPath: string;
  iconAlt: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({
  iconPath,
  iconAlt,
  onClick,
}: IIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-100 active:bg-[#1A1A1A]"
    >
      <img src={iconPath} alt={iconAlt} />
    </button>
  );
}
