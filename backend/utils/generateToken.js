import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
    });
};

const passwordResetToken = (res, id) => {
    const passwordToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });

    // Set JWT as HTTP-Only cookie
    res.cookie("rpt", passwordToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 10 * 60 * 1000, // 10 minutes
    });
};

export default generateToken;
export { passwordResetToken };
