import jwt from "jsonwebtoken";

export const generateActiveToken = (payload : object) : string => {
    return jwt.sign(payload, `${
        process.env.ACTIVE_TOKEN_SECRET
    }`, {expiresIn: "5m"});
};