import { Search } from "lucide-react";

const SearchBar = ({ placeholder, onChange }) => {
  return (
    <div
      className={
        "flex items-center  border border-white rounded-3xl px-4 py-2 w-full "
        
      }
    >
      <Search className="text-white" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="ml-2 w-full outline-none bg-transparent text-white"
      />
    </div>
  );
};

export default SearchBar;
