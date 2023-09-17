import { useState } from "react";

export default function Search({
  search,
  setSearch,
  label,
  autocompleteList,
  setAutocompleteList,
  setPage,
  placeholder,
  data,
  setMenu,
}) {
  const [hasFocus, setFocus] = useState(false);

  // Initialization of an array for the autocomplete searchBar
  let arrayAutocomplete = [];

  if (data?.results) {
    data.results.map((item) => {
      // for research marvel's characters
      if (item.name) {
        arrayAutocomplete.push(item.name.split("(")[0].trim());
        //for research marvel's comics
      } else {
        arrayAutocomplete.push(item.title.split("(")[0].trim());
      }

      let sortArray = new Set(arrayAutocomplete);
      arrayAutocomplete = Array.from(sortArray);
    });
  }

  const getItem = (item) => {
    setSearch(() => item);
    setAutocompleteList(false);
  };

  return (
    <div className="navsearch">
      <label htmlFor="search">{label}</label>
      <div className="autocomplete-bloc">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          onChange={(event) => {
            setAutocompleteList(true);
            setSearch(event.target.value);
            setMenu(() => false);
            setPage(1);
          }}
          value={search}
        />
        {autocompleteList && (
          <div className="autocomplete">
            {arrayAutocomplete.map((item, index) => {
              let regex = new RegExp(search, "i");

              if (search.length > 0) {
                if (item.match(regex)) {
                  return (
                    <div
                      tabIndex={0}
                      className="autocomplete__item"
                      key={index}
                      onClick={() => getItem(item)}
                      onFocus={() => setFocus(() => true)}
                      onBlur={() => setFocus(() => false)}
                      onKeyUp={(event) => {
                        event.code === "Enter" && getItem(item);
                      }}
                    >
                      {item}
                    </div>
                  );
                }
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}