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
  const [currentPage, setCurrentPage] = useState(0);
  const {count} = useLoaderData();

  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const {isLoading, data: products = [], refetch} = useQuery({
    queryKey: ["allProducts", searchQuery, currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products?q=${filterQuery}&page=${currentPage}&size=${itemsPerPage}`);
      console.log(res.data);
      return res.data;
    },
  })

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    refetch();
  }

  // search functionality
  const handleSearchChange = (e) =>  {
    setSearchQuery(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilterQuery(searchQuery);
    setCurrentPage(0);
    refetch();
  }

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
          <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl">
          <IoSearchOutline  />
          </button>
        </form>
      </div>

     {/* Products */}
      <div className="mt-4 md:mt-10 lg:mt-12">
        {isLoading ? ( 
          <div className="mb-[100vh]">Loading </div> 
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center md:justify-between gap-y-16 gap-x-4">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        ): (<h4 className="mt-10 text-[var(--clr-warning)]">No Such Product Found <br/> <br/> <small className="text-[var(--clr-primary)] mt-4">Refresh or Search other Products</small> </h4>)}
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