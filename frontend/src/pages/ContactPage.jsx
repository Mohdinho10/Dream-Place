import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import "./ContactPage.scss";

function ContactPage() {
  const [message, setMessage] = useState("");
  const { user } = useUser();
  console.log(user);
  // const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>
      {user && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">
              <span style={{ color: "#555" }}>Contact:</span> {user?.username}
            </p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={messageHandler}
              ></textarea>
            </div>
            <a
              href={`mailto:${user.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default ContactPage;
