import NavigationMenu from './NavigationMenu';
import SearchBar from './SearchBar';
import { useProducts } from '../context/ProductContext';

const Header = ({ className = '' }) => {
  const { reloadApp } = useProducts();
  return (
    <div
      data-testid="header"
      className={`grid grid-cols-[0.35fr_2fr_0.2fr] gap-3 px-5 py-5 md:px-10 ${className} bg-bg-main shadow-accent/50 z-30 shadow-lg`}
    >
      <h1
        onClick={() => reloadApp()}
        className="text-accent dark:text-text-main cursor-pointer text-3xl font-bold whitespace-nowrap md:text-4xl"
        title="Reload app"
      >
        JSON Goods
      </h1>
      <SearchBar className="col-start-2 col-end-3" />
      <NavigationMenu className="col-start-3" />
    </div>
  );
};

export default Header;
