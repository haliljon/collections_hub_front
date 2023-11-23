import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SearchResultCard from '../components/SearchResultCard';

const SearchResult = () => {
  const { tagName } = useParams();
  const allTags = useSelector((state) => state.tags.tags);
  const allItems = useSelector((state) => state.items.items);
  const filteredTags = allTags.filter((tag) => tag.name.toLowerCase() === tagName);
  const itemIds = filteredTags.map((tag) => tag.item_id);
  const filteredItems = allItems.filter((item) => itemIds.includes(item.id));

  return (
    <div className="mt-5 p-5 container">
      <h1 className="text-center p-3">
        Search results for
        {tagName}
      </h1>
      {filteredItems.map((item) => (
        <SearchResultCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default SearchResult;
