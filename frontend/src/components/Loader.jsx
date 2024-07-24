import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        height: "h-full",
        width: "w-full",
        alignItems: "center",
        justifyContent: "left",
      }}
    >
      <ClipLoader color="#22222" />
    </div>
  );
}

export default Loader;
