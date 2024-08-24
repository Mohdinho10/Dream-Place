/* eslint-disable react/prop-types */
import Card from "./Card";
import "./List.scss";

function List({ posts }) {
  return (
    <div className="list">
      {posts?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
