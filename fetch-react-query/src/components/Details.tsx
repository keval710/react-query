import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();

  const fetchProducts = async () => {
    const data = await (
      await fetch(`https://dummyjson.com/products/${id}`)
    ).json();
    return data.title;
  };

  const { data } = useQuery({
    queryKey: ["details", id],
    queryFn: fetchProducts,
    staleTime: 20000,
  });
  return <div>Details:{data}</div>;
};

export default Details;
