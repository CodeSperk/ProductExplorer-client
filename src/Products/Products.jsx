/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { IoSearchOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { useLoaderData } from "react-router-dom";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData();

  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  console.log(typeof maxPrice);

  const {
    isLoading,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: [
      "allProducts",
      searchQuery,
      brand,
      category,
      minPrice,
      maxPrice,
      sortBy,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      const res = await axios.get("https://product-explorer-server.vercel.app/products", {
        params: {
          q: filterQuery,
          brand,
          category,
          minPrice,
          maxPrice,
          sortBy,
          page: currentPage,
          size: itemsPerPage,
        },
      });
      console.log(res.data);
      return res.data;
    },
  });

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    refetch();
  };

  // search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setFilterQuery(searchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilterQuery(searchQuery);
    setCurrentPage(0);
  };

  return (
    <div>
      {/* search bar */}
      <div className="border bg-[var(--bg-secondary)] py-16 px-4 md:px-10 lg:px-12 flex flex-col gap-6 justify-center items-center text-center">
        <h1>Discover What You Need</h1>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="border-2 py-3 px-6 rounded-full outline-none min-w-72 md:min-w-96"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl"
          >
            <IoSearchOutline />
          </button>
        </form>
      </div>

      {/* Filter and Sort Options */}
      <div className="flex md:justify-center flex-wrap gap-2">
        <select
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--clr-focussed)] w-full md:w-44"
        >
          <option value="">All Brands</option>
          <option value="SoundMagic">SoundMagic</option>
          <option value="SoundWave">SoundWave</option>
          <option value="TimeTech">TimeTech</option>
          <option value="CaptureIt">CaptureIt</option>
        </select>

        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--clr-focussed)] w-full md:w-44"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Kitchen Appliances">Kitchen Appliances</option>
          <option value="Office Accessories">Office Accessories</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Personal Care">Personal Care</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--clr-focussed)] w-full md:w-44"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--clr-focussed)] w-full md:w-44"
        />

        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--clr-focussed)] w-full md:w-44"
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="dateAdded">Newest First</option>
        </select>
      </div>

      {/* Products */}
      <div className="mt-4 md:mt-10 lg:mt-12">
        {isLoading ? (
          <div className="mb-[100vh]">Loading </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center md:justify-between gap-y-16 gap-x-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <h4 className="mt-10 text-[var(--clr-warning)]">
            No Such Product Found <br /> <br />{" "}
            <small className="text-[var(--clr-primary)] mt-4">
              Refresh or Search other Products
            </small>{" "}
          </h4>
        )}
      </div>

      {/* Pagination */}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={numberOfPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="pagination-list"
        pageLinkClassName="pagination-anchor"
        previousLinkClassName="previous-anchor"
        nextLinkClassName="next-anchor"
      />
    </div>
  );
};

export default Products;
