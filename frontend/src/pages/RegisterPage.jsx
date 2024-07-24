import ClipLoader from "react-spinners/ClipLoader";
import { useRegister } from "../hooks/useRegister";
import "./RegisterPage.scss";
import { Link } from "react-router-dom";

function Register() {
  const { register, isRegister } = useRegister();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    register({ username, email, password });
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isRegister}>
            {isRegister ? <ClipLoader color="white" size={20} /> : "Register"}
          </button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
