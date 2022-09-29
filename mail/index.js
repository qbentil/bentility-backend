import WelcomeMessage from "./welcome.js";
import transporter from "./transport.js";

const SendMail = async (user, callback) => {
  const mailOptions = {
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ID}>`,
    to: user.email,
    subject: "Welcome to Bentility Team",
    text: WelcomeMessage.text(user),
    html: WelcomeMessage.html(user),
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    callback(info);
  } catch (error) {
    throw new Error(error);
  }
};

export default SendMail;
