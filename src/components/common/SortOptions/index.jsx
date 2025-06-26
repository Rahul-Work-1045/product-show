import { SORT_OPTIONS } from "../../../utils/constants";
import Select from "../UI/Select";

export const SortOptions = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center justify-end mb-6">
      <label htmlFor="sort" className="mr-2 font-medium">
        Sort by:
      </label>
      <Select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        options={SORT_OPTIONS}
        className="w-[200px]"
      />
    </div>
  );
};
