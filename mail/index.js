import Templates from "./templates.js";
import transporter from "./transport.js";

const OnboardingMail = async (user, callback) => {
  // add site url to user object
  user.site = process.env.SITE_URL;
  const mailOptions = {
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ID}>`,
    to: user.email,
    subject: "Welcome to Bentility Team",
    text: Templates.WelcomeTEXT(user),
    html: Templates.WelcomeHTML(user),
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    callback(info);
  } catch (error) {
    throw new Error(error);
  }
};

const SendMail = async (data, callback) => {
  const mailOptions = {
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ID}>`,
    to: data.email,
    subject: data.subject,
    text: data.message,
    html: Templates.HTML(data),
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    callback(info);
  } catch (error) {
    throw new Error(error);
  }
}
const publicMail = async (data, callback) => {
  const mailOptions = {
    from: `${data.sender_name} <${data.sender_email}>`,
    to: data.email,
    subject: data.subject,
    text: data.message,
    html: Templates.HTML(data),
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    callback(info);
  } catch (error) {
    throw new Error(error);
  }
}


const ContactMail = async (data, callback) => {
  const mailOptions = {
    from: `${data.name} <${data.email}>`,
    to: process.env.EMAIL_ID,
    subject: data.subject,
    text: data.message,
    html: data.htmlText,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    callback(info);
  } catch (error) {
    throw new Error(error);
  }
};

const Mail = {
  OnboardingMail,
  SendMail,
  publicMailer: publicMail,
  CONTACTMAIL: ContactMail,

}

export default Mail;

