import bcrypt from "bcryptjs";

export async function verifyPassword(
    inputPassword: string,
    storedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
}
