export const logoutUser = () => {
    localStorage.removeItem("token");
};