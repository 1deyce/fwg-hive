import jwt from 'jsonwebtoken';

interface User {
    userId: string;
}

export const verifyToken = async (token: string): Promise<User | null> => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is required.");
        }

        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        if (decoded.userId && typeof decoded.userId === 'string') {
            const id = decoded.userId;
            return { userId: id };
        } else {
            console.error("User ID not found in token");
            return null;
        }
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};