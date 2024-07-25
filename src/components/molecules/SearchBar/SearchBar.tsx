import React, { useState, useEffect } from "react";
import {
  SearchContainer,
  Input,
  SuggestionsList,
  SuggestionItem,
} from "./SearchBar.styles";
import { Product } from "../../../types";
import { isApproximateMatch } from "../../../utils/MatchUtils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  allProducts: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, allProducts }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (query.length >= 2) {
      const filteredSuggestions = allProducts.filter(
        (product) =>
          isApproximateMatch(query, product.name) ||
          isApproximateMatch(query, product.description)
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, allProducts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
