import axios from "axios";

const api = axios.create({});

export const apiCourses = {
    get: async() => {
        try {
            const response = await api.get(
                `http://localhost:3000/course`
            )
            return response.data.map((c) => ({
                value: c.n.id,
                text: c.n.name,
            }));
        } catch (error) {
            return error
        }
    },
};

export const apiCand = {
    create: async({ request }) => {
        try {
            const response = await api.post(
                `http://localhost:3000/user/create`,
                request
            )
            return response.data;
        } catch (error) {
            return error
        }
    },
};