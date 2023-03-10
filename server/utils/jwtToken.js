//Create Token and save ir in Cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  //option for cookies
  const options = {
    expiresIn: new Date(
      Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
export default sendToken;
