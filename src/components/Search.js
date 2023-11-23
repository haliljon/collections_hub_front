// Search.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchInput from 'react-search-input';
import { FaSearch } from 'react-icons/fa';
import { useDarkMode } from './DarkModeContext';

const Search = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const data = useSelector((state) => state.tags.tags);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const allTags = data;

  // Use a Set to store unique tag names
  const uniqueTagNames = new Set();

  const filteredTags = allTags.filter((tag) => {
    const tagName = tag.name.toLowerCase();
    const isMatch = tagName.includes(searchTerm.toLowerCase());
    // If it's a match and the tag name hasn't been added to the set yet, add it
    if (isMatch && !uniqueTagNames.has(tagName)) {
      uniqueTagNames.add(tagName);
      return true;
    }

    return false;
  });

  const handleTagClick = (tagName) => {
    setSearchTerm('');
    navigate(`/search-result/${tagName}`);
  };

  return (
    <div className="search-container">
      <div className="input-group rounded">
        <SearchInput
          aria-describedby="search-addon"
          className="form-control rounded border-0 p-0"
          placeholder="Search..."
          onChange={handleSearch}
          searchText={searchTerm}
        />
        <span className={`input-group-text bg-${isDarkMode ? 'dark' : 'success'} border-0`} id="search-addon">
          <FaSearch className="text-white" />
        </span>
      </div>
      {searchTerm && (
        <div className="search-results list-group position-absolute">
          {filteredTags.map((tag) => (
            <button
              type="button"
              className="list-group-item list-group-item-action border-0"
              key={tag.id}
              onClick={() => handleTagClick(tag.name.toLowerCase())}
            >
              {tag.name.toLowerCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
