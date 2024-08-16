import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductCard from "./ProductCard";

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
      


     {/* Products */}
      <div className="">
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