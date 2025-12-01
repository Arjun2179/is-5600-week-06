// CardList.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const limit = 10;

const CardList = ({ data }) => {
  // pagination state
  const [offset, setOffset] = useState(0);

  // products currently shown
  const [products, setProducts] = useState(data.slice(0, limit));

  // search/filter input
  const [searchTerm, setSearchTerm] = useState("");

  // FILTER BY TAGS (Lab requirement)
  const filterTags = (term) => {
    setSearchTerm(term);
    setOffset(0); // reset pagination
  };

  // EFFECT: runs whenever offset or search changes
  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = data.filter((product) =>
        product.tags &&
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setProducts(filtered.slice(offset, offset + limit));
  }, [offset, searchTerm, data]);

  // SINGLE pagination function (Lab instruction)
  const changePage = (direction) => {
    if (direction === "next") {
      if (offset + limit < data.length) setOffset(offset + limit);
    } else if (direction === "prev") {
      if (offset > 0) setOffset(offset - limit);
    }
  };

  // disable NEXT when at end
  const isAtEnd = offset + limit >= data.length;

  return (
    <div className="cf pa2">

      {/* Search ABOVE cards */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => changePage("prev")}
        />
        <Button
          text="Next"
          handleClick={() => changePage("next")}
          disabled={isAtEnd}
        />
      </div>
    </div>
  );
};

export default CardList;
