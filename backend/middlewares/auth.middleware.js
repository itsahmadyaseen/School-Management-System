import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    console.log("Provide token", token);
    return res.status(401).json({ message: "Provide token", data: error });
  }
  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      console.log("Forbidden verification", decodedToken);
      return res
        .status(403)
        .json({ message: "Forbidden verification", data: decodedToken });
    }
    req.user = decodedToken;
    console.log("User verified", decodedToken);
    next();
  } catch (error) {
    console.log("Error verifying", error);
    return res.status(500).json({ message: "Error verifying", data: error });
  }
};

export default verifyJWT;
