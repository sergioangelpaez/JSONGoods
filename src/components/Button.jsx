const Button = ({ children, onClick, className = '', isOutline = false }) => {
  const baseClasses =
    'flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 transition';

  const variantClasses = isOutline
    ? 'border border-accent text-accent hover:bg-accent/10'
    : 'bg-accent text-white hover:opacity-90 active:bg-accent-active';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
