import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) return res.json({ success: false, message: "Not Authorized. Please log in again." });

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    
    req.user = { id: token_decode.id };  // Attach decoded doctor ID
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default authDoctor;