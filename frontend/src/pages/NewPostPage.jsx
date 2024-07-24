import ReactQuill from "react-quill";
import "./NewPostPage.scss";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useAddPost } from "../hooks/useAddPost";
import ClipLoader from "react-spinners/ClipLoader";
import uploadMultipleImageCloudinary from "../utils/uploadCloudinary";
// import { useNavigate } from "react-router-dom";

function NewPostPage() {
  // const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);
  const { addPost, isAddPost } = useAddPost();

  // console.log(imagesArr);
  const imgSecureUrls = imagesArr.map((item) => item.secure_url);
  console.log(imgSecureUrls);
  // console.log(images);

  const fileInputHandler = async (e) => {
    const files = e.target.files;
    setImages(files);

    try {
      let arr = [];
      for (let i = 0; i < images.length; i++) {
        const data = await uploadMultipleImageCloudinary(images[i]);
        // console.log(data);
        arr.push(data);
      }
      setImagesArr(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    console.log(inputs);

    addPost({
      postData: {
        title: inputs.title,
        price: parseInt(inputs.price),
        address: inputs.address,
        city: inputs.city,
        bedroom: parseInt(inputs.bedroom),
        bathroom: parseInt(inputs.bathroom),
        type: inputs.type,
        property: inputs.property,
        // latitude: inputs.latitude,
        // longitude: inputs.longitude,
        images: imgSecureUrls,
      },
      postDetail: {
        desc: value,
        utilities: inputs.utilities,
        pet: inputs.pet,
        income: inputs.income,
        size: parseInt(inputs.size),
        school: parseInt(inputs.school),
        bus: parseInt(inputs.bus),
        restaurant: parseInt(inputs.restaurant),
      },
    });
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={submitHandler}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            {/* <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div> */}
            {/* <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div> */}
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">
              {isAddPost ? <ClipLoader color="white" size={20} /> : "Add Post"}
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {imagesArr.map((image, index) => (
          <img src={image.secure_url} key={index} alt="" />
        ))}
        {imagesArr.length === 0 && (
          <div className="upload ">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg,.png"
              multiple
              onChange={fileInputHandler}
            />
            <label htmlFor="customFile">Add Images</label>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPostPage;
