import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, "jwt", {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // more secure
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "Lax",
    secure: false, // CSRF
  });

  return token;
};

export default generateTokenAndSetCookie;
