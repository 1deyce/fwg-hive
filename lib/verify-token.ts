import jwt from 'jsonwebtoken';

export const verifyToken = async (token: string) => {
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        return { id: decoded.id, name: decoded.name };
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};