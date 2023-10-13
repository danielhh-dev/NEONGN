import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuSettings2 } from "react-icons/lu";
import CategoriesFilter from "../components/CategoriesForFilters";
import SearchCard from "../components/Cards/SearchCard";
import FilterSortRange from "../components/FilterSortRange";
import fetchProducts from "../redux/actions/getProducts";
import getFilter from '../redux/actions/getFilter';
import { addToWishlist, removeFromWishlist } from "../redux/slices/WishlistSlice";

const Search = () => {
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productFiltered = useSelector((state) => state.filter);
  console.log("productFiltered", productFiltered);
  const wishlist = useSelector((state) => state.wishlist);
  console.log("wishlist en view Search",wishlist);
  const [showFilter, setShowFilter] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  console.log("addedProducts en view Search",addedProducts);


  const toFilter = () => {
    setShowFilter(!showFilter);
  };

  
  
  const toggleWishlist = (productId) => {
    const product = productFiltered.filterResult.results.find(
      (product) => product.id === productId
    );
    if (product) {
      if (addedProducts.some((p) => p.id === product.id)) {
        alert('This item is already on the wishlist.');
        return; // No hagas nada si el producto ya está en addedProducts
      }
      dispatch(addToWishlist(product));
      setAddedProducts([...addedProducts, product]);
      alert('Added to Wishlist');
    }
  };

const handleSelection = (category) => {
  setSelectCategory(category);
  
  // Verificar si el estado de getFilter está vacío
  if (isEmpty(getFilterState)) {
    dispatch(getFilter({ category: category }));
  }
}

// La función isEmpty puede ser una función personalizada que verifica si el estado está vacío
// Por ejemplo, podrías definirla así:
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

  return (
    <div className="h-full pb-32">
      <div className="font-jakarta-sans w-auto flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
          By Category
        </h1>
        <button onClick={toFilter}>
          <LuSettings2 className="text-black-500 text-[30px] font-semibold" />
        </button>
      </div>
      {showFilter && <FilterSortRange />} 
      <div className="w-auto h-auto m-6">
        <CategoriesFilter />
      </div>
      <div className="font-jakarta-sans w-auto flex justify-between items-center mx-10 my-6">
        <h1 className="text-stone-900 text-[18px] font-bold tracking-wide">
          Products
        </h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-auto h-0 grid grid-cols-1 gap-1 justify-center mx-3 border font-bold">
          {Array.isArray(productFiltered.filterResult.results) ? (
            productFiltered.filterResult.results.map((product) => (
              <SearchCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
                description={product.description}
                smallCard={true}
                toggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <p>No results.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;