import { useEffect, useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Map from "../components/Map";
import { useGetPosts } from "../hooks/useGetPosts";
import "./ListingsPage.scss";
import { useSearchParams } from "react-router-dom";

function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  console.log(debounceQuery);
  const { isPending, posts } = useGetPosts(debounceQuery);
  console.log(posts);

  return (
    <>
      {isPending && <Loader />}

      {!isPending && (
        <div className="list-page">
          <div className="list-container">
            <div className="wrapper">
              <Filter
                query={query}
                setQuery={setQuery}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              {posts?.length === 0 && <p>No post found</p>}
              {posts?.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="map-container">
            <Map items={posts} />
          </div>
        </div>
      )}
    </>
  );
}

export default ListingsPage;
