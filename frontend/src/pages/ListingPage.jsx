// import { data, userData } from "../assets/data";
import { formatCurrency } from "../utils/currency";
import Slider from "../components/Slider";
import Map from "../components/Map";
import "./ListingPage.scss";
import { Link, useParams } from "react-router-dom";
import { useGetPost } from "../hooks/useGetPost";
import DOMPurify from "dompurify";
import Loader from "../components/Loader";
import { useSavePost } from "../hooks/useSavePost";
import { useUser } from "../context/UserContext";
// import { useState } from "react";

function ListingPage() {
  const { id } = useParams();
  const { isPending, post } = useGetPost(id);
  const { user } = useUser();
  const { isPending: isSaving, savePost } = useSavePost();
  // const [saved, setSaved] = useState(post?.isSaved);

  const saveHandler = () => {
    // setSaved((prev) => !prev);
    savePost({ postId: post?.id });
  };

  return (
    <>
      {isPending && <Loader />}
      {!isPending && (
        <div className="list-page">
          <div className="details">
            <div className="wrapper">
              <Slider images={post?.images} />
              <div className="info">
                <div className="top">
                  <div className="post">
                    <h1>{post?.title}</h1>
                    <div className="address">
                      <img src="/pin.png" alt="" />
                      <span>{post?.address} </span>
                    </div>
                    <div className="price">{formatCurrency(post?.price)}</div>
                  </div>
                  <div className="user">
                    <img src={post?.user.avatar} alt="" />
                    <span>{post?.user.username} </span>
                  </div>
                </div>
                <div
                  className="bottom"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post?.postDetail?.desc),
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="features">
            <div className="wrapper">
              <p className="title">General</p>
              <div className="list-vertical">
                <div className="feature">
                  <img src="/utility.png" alt="" />
                  <div className="feature-text">
                    <span>Utilities</span>

                    {post?.postDetail?.utilities === "owner" ? (
                      <p>Owner is responsible</p>
                    ) : (
                      <p>Tenant is responsible</p>
                    )}
                  </div>
                </div>
                <div className="feature">
                  <img src="/pet.png" alt="" />
                  <div className="feature-text">
                    <span>Pet Policy</span>
                    {post?.postDetail?.pet === "allowed" ? (
                      <p>Pets Allowed</p>
                    ) : (
                      <p>Pets Not Allowed</p>
                    )}
                  </div>
                </div>
                <div className="feature">
                  <img src="/fee.png" alt="" />
                  <div className="feature-text">
                    <span>Income Policy</span>
                    <p>{post?.postDetail?.income}</p>
                  </div>
                </div>
              </div>
              <p className="title">Sizes</p>
              <div className="sizes">
                <div className="size">
                  <img src="/size.png" alt="" />
                  <span>{post?.postDetail?.size} sqft</span>
                </div>
                <div className="size">
                  <img src="/bed.png" alt="" />
                  <span>{post?.bedroom} beds</span>
                </div>
                <div className="size">
                  <img src="/bath.png" alt="" />
                  <span>{post?.bathroom} bathroom</span>
                </div>
              </div>
              <p className="title">Nearby Places</p>
              <div className="list-horizontal">
                <div className="feature">
                  <img src="/school.png" alt="" />
                  <div className="feature-text">
                    <span>School</span>
                    <p>
                      {post?.postDetail?.school > 999
                        ? post?.postDetail?.school / 100 + "km "
                        : post?.postDetail?.school + "m "}
                      away
                    </p>
                  </div>
                </div>
                <div className="feature">
                  <img src="/pet.png" alt="" />
                  <div className="feature-text">
                    <span>Bus Stop</span>
                    <p>
                      {post?.postDetail?.bus > 999
                        ? post?.postDetail?.bus / 100 + "km "
                        : post?.postDetail?.bus + "m "}
                      away
                    </p>
                  </div>
                </div>
                <div className="feature">
                  <img src="/fee.png" alt="" />
                  <div className="feature-text">
                    <span>Restaurant</span>
                    <p>
                      {post?.postDetail?.restaurant > 999
                        ? post?.postDetail?.restaurant / 100 + "km "
                        : post?.postDetail?.restaurant + "m "}
                      away
                    </p>
                  </div>
                </div>
              </div>
              <p className="title">Location</p>
              <div className="map">
                <Map items={[post]} />
              </div>
              {post?.userId !== user?.id && (
                <div className="buttons">
                  <Link to="/contact">
                    <img src="/chat.png" alt="" />
                    Send an Email
                  </Link>

                  <button
                    onClick={saveHandler}
                    style={{
                      backgroundColor: post?.isSaved ? "#fece51" : "white",
                    }}
                  >
                    <img src="/save.png" alt="" />
                    {isSaving && "Saving..."}
                    {!isSaving && post?.isSaved && "Place Saved"}
                    {!isSaving && !post?.isSaved && "Save the Place"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListingPage;
