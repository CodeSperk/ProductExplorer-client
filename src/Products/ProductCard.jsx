import { Rating } from "@mui/material";

const ProductCard = ({product}) => {
  const {_id, productName, productImage, brandName, description, price, category, creationDate, ratings } =
  product;

  return (
    <div className="w-72 mx-auto border-2 flex flex-col bg-white shadow-sm hover:shadow-md rounded-lg hover:rounded-none cursor-pointer overflow-hidden">

      {/* product  Image */}
      <div className="w-full overflow-hidden relative">
      <img src={productImage} alt={productName} className="rounded-t-lg hover:scale-110 duration-500"/>
      <small className="absolute top-4 left-0  bg-[var(--clr-focussed)] text-white px-1 rounded-r">{brandName}</small>
      </div>

      {/* Product info */}
      <div className="flex-1 p-6 flex flex-col gap-2 justify-between items-center">
        <small>{category}</small>
        <h4 className="hover:underline cursor-pointer">{productName}</h4>
        <p className="flex-1">{description.length > 42 ? `${description.slice(0, 42)}...` : description}</p>
        <h4 className="text-[var(--clr-focussed)]">${price}</h4>
        <Rating name="half-rating-read" value={ratings} precision={0.5} readOnly/>
      </div>
    </div>
  );
};

export default ProductCard;