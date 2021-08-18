import axios from "axios";

const api = axios.create({
    baseURL: "",
});

export const apiCourses = {
    get: async() => {
        const response = await api.get(
            `localhost:3000/course/`
        );
        console.log(response)
        return response.data;
    },
};