import HeaderIcons from './HeaderIcons';
import SearchBar from './SearchBar';

const Header = ({ className = '' }) => {
  return (
    <div
      className={`grid grid-cols-[0.35fr_2fr_0.2fr] gap-5 px-10 py-5 ${className} bg-light-bg-main z-30 shadow-md`}
    >
      <h1 className="text-accent text-4xl font-bold whitespace-nowrap">JSON Goods</h1>
      <SearchBar className="col-start-2 col-end-3" />
      <HeaderIcons className="col-start-3" />
    </div>
  );
};

export default Header;
