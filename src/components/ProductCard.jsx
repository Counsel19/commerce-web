import { formatToNaira } from "../utils/formatToNiara";

/* eslint-disable react/prop-types */
const ProductCard = ({ name, sellingPrice, actualPrice, image }) => {
  return (
    <div className="h-[20rem]  text-ellipsis p-4 flex  flex-col space-y-6 border rounded-xl hover:shadow-md">
      <img src={image} alt={name} className="object-cover h-[12rem] " />

      <div className="space-y-1 ">
        <h5 className="font-bold  truncate w-[100%]">{name}</h5>

        <span className="flex">{formatToNaira.format(sellingPrice)}</span>
        <span className="line-through flex">
          {formatToNaira.format(actualPrice)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
