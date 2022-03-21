interface Props {
  href: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const Icon = ({ href, onClick, style = {}, className = "" }: Props) => {
  return (
    <svg
      className={`${className} icon`}
      aria-hidden="true"
      style={style}
      onClick={() => onClick?.()}
    >
      <use xlinkHref={`#${href}`}></use>
    </svg>
  );
};

export default Icon;
