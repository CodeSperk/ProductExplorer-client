import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { IoSearchOutline } from "react-icons/io5";

const Products = () => {
  const [filterQuery, setFilterQuery] = useState("");

  const {isLoading, data: products = [], refetch} = useQuery({
    queryKey: ["allProducts", filterQuery],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products`);
      console.log(res.data);
      return res.data;
    }
  })


  return (
    <div>
      
       {/* search bar */}
       <div className="border bg-[var(--bg-secondary)] py-16 px-4 md:px-10 lg:px-12 flex flex-col gap-6 justify-center items-center text-center">
          <h1>Discover What You Need</h1>
        <form className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="border-2 py-3 px-6 rounded-full outline-none min-w-72 md:min-w-96"
          />
          <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl">
          <IoSearchOutline  />
          </button>
        </form>
      </div>

     {/* Products */}
      <div className="mt-4 md:mt-10 lg:mt-12">
        {isLoading ? ( 
          <div>Loading </div> 
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center md:justify-between gap-y-16 gap-x-4">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </div>


    </div>
  );
};

export default Products;