import axios from "axios";

const api = axios.create({}),
    BASE_URL = "https://api-shopping-cidadao-2.herokuapp.com"
    //BASE_URL = "http://localhost:3000"

export const apiCourses = {
    get: async() => {
        try {
            const response = await api.get(
                `${BASE_URL}/course`
            )
            return response.data.map((c) => ({
                value: c.n.id,
                text: c.n.name,
            }));
        } catch (error) {
            return error
        }
    },
    getLanguages: async() => {
        try {
            const response = await api.get(
                `${BASE_URL}/course/languages`
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
    get: async() => {
        try {
            const response = await api.get(
                `${BASE_URL}/user`
            )
            return response.data.map((c) => ({
                name: c.user.name,
                type: c.user.type,
                courses: c.courses
            }));
        } catch (error) {
            return error
        }
    },
    create: async({ request }) => {
        try {
            const response = await api.post(
                `${BASE_URL}/user/create`,
                request
            )
            return response.data;
        } catch (error) {
            return error
        }
    },
};