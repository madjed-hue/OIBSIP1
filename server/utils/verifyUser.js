import sendEmail from "./sendEmail.js";

const sendVerificationUrl = async (user, req) => {
  const verifyToken = user.getResetPasswordToken();

  const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verifyToken}`;

  const message = `Your verification link is :- \n\n ${verifyUrl} \n\n If you do not request this email, please ignore it.`;

  return await sendEmail({
    email: user.email,
    subject: `Pizzario Store verification link`,
    message,
  });
};
export default sendVerificationUrl;
