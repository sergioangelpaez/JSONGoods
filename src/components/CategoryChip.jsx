const CategoryChip = ({ children, className = '' }) => {
  return (
    <span className={`bg-accent rounded-md px-2 py-1 text-xs text-white ${className}`}>
      {children}
    </span>
  );
};

export default CategoryChip;
