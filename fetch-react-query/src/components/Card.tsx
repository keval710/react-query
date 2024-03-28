import { Link } from "react-router-dom";
import { APIDataInterface } from "../interface/apiInterface";

interface Props {
  data: APIDataInterface;
}

const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className="m-5 w-80 h-96 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <Link to={`/detail/${data.id}`}>
        <img
          className="h-48 w-full object-cover object-center"
          src={data.thumbnail}
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
            {data.title}
          </h2>
          <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
            {data.description}
          </p>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
              ${data.price}
            </p>
            <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
              $25.00
            </p>
            <p className="ml-auto text-base font-medium text-green-500">
              20% off
            </p>
          </div>
        </div>
    </Link>
      </div>
  );
};

export default Card;
