const Button = ({ children, onClick, className = '', isOutline = false }) => {
  const baseClasses =
    'flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 transition-all duration-300 ease-out hover:scale-102 active:scale-97';

  const variantClasses = isOutline
    ? 'border border-accent text-text-main hover:bg-accent/10 hover:scale-102 active:scale-95 bg-accent/30'
    : 'bg-gradient-to-r from-accent-active to-accent text-white active:bg-accent-active';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
