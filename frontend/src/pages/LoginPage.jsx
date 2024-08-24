import { Link } from "react-router-dom";
import "./LoginPage.scss";
import { useLogin } from "../hooks/useLogin";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const { login, isLogin } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    login({ email, password });
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h1>Welcome back</h1>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLogin}>
            {isLogin ? <ClipLoader color="white" size={20} /> : "Login"}
          </button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
