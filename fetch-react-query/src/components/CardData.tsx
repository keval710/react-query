import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIDataInterface } from "../interface/apiInterface";
import Card from "./Card";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

interface SearchParams {
  skip: number;
  limit: number;
  search: string;
}

const CardData = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [searchParams, setSearchParams] = useSearchParams<SearchParams>({
    skip: 0,
    limit: 8,
    search: "",
  });

  const skip: number = parseInt(searchParams.get("skip") || "0");
  const limit: number = parseInt(searchParams.get("limit") || "4");
  const q: string | null = searchParams.get("search" || "");

  const fetchProduct = async () => {
    return await (
      await fetch(
        `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`
      )
    ).json();
  };

  const { data, isPending } = useQuery({
    queryKey: ["products", limit, skip, q],
    queryFn: fetchProduct,
    staleTime: 10000,
    placeholderData: keepPreviousData,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    // gcTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  const handleClick = (moveCount: number) => {
    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0).toString());
      return prev;
    });
  };

  return (
    <>
      <div className="min-h-screen dark:bg-gray-500">
        <div className="p-5 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg f w-72 p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white"
            onChange={debounce((e: { target: { value: string } }) => {
              setSearchParams((prev) => {
                prev.set("`search`", e.target.value);
                return prev;
              });
            }, 400)}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:ml-14">
          {data &&
            data?.products.map((val: APIDataInterface) => {
              return (
                <div key={val.id}>
                  <Card data={val} />
                </div>
              );
            })}
        </div>
        <div className="flex justify-center p-10">
          <div className="inline-flex">
            <button
              disabled={skip < limit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => handleClick(-limit)}
            >
              Prev
            </button>
          </div>
          <div>
            <button
              disabled={limit + skip >= data?.total}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => handleClick(limit)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardData;
