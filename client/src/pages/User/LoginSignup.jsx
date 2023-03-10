import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import Layout from "../../components/layout/Layout";
import { login, register } from "../../actions/userAction";
import Loader from "../../components/layout/Loader";
import { useAlert } from "react-alert";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { userContext } from "../../App";
import MetaData from "../../components/layout/MetaData";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const userInfo = useContext(userContext);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const [avatar, setAvatar] = useState("./Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  const redirectVerify = location.search
    ? location.search.split("=")[1]
    : "/verify";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isAuthenticated) {
      userInfo && userInfo?.verified
        ? navigate(redirect)
        : navigate(redirectVerify);
    }
  }, [
    alert,
    dispatch,
    error,
    isAuthenticated,
    navigate,
    redirect,
    redirectVerify,
    userInfo,
  ]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <MetaData title={"Login & Signup"} />
          <Fragment>
            <div className="LoginSignUpContainer">
              <div className="LoginSignUpBox">
                <div>
                  <div className="login_signUp_toggle">
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                  </div>
                  <button ref={switcherTab}></button>
                </div>
                <form
                  className="loginForm"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <div className="loginEmail">
                    <MailOutlinedIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type={isShow ? "text" : "password"}
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {isShow ? (
                      <AiFillEye
                        size={24}
                        className="eye"
                        onClick={() => setIsShow(!isShow)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        size={24}
                        className="eye"
                        onClick={() => setIsShow(!isShow)}
                      />
                    )}
                  </div>
                  <Link to="/password/forgot">Forget Password ?</Link>
                  <input type="submit" value="Login" className="loginBtn" />
                </form>
                <form
                  className="signUpForm"
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                    <MailOutlinedIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type={isShow ? "text" : "password"}
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                    {isShow ? (
                      <AiFillEye
                        size={24}
                        className="eye"
                        onClick={() => setIsShow(!isShow)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        size={24}
                        className="eye"
                        onClick={() => setIsShow(!isShow)}
                      />
                    )}
                  </div>
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                  <input type="submit" value="Register" className="signUpBtn" />
                </form>
              </div>
            </div>
          </Fragment>
        </Layout>
      )}
    </Fragment>
  );
};

export default LoginSignup;
