const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={`bg-accent ${className} active:bg-accent-active flex cursor-pointer items-center justify-center gap-3 rounded-md px-5 py-2 text-white transition hover:opacity-90`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
