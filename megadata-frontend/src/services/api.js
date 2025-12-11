import axios from "axios";


export const api = axios.create({
baseURL: "https://megadata-user.onrender.com/api/users", // Backend Java
});