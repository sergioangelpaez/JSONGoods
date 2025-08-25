const CategoryChip = ({ children, className = '' }) => {
  return (
    <span
      className={`from-accent-active to-accent cursor-pointer rounded-md bg-gradient-to-r px-2 py-1 text-xs text-white transition-all duration-300 ease-out hover:opacity-90 ${className}`}
    >
      {children}
    </span>
  );
};

export default CategoryChip;
