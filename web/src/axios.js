import axios from "axios";

const api = axios.create({}),
    HEROKU_URL = "https://api-shopping-cidadao-2.herokuapp.com"
    //LOCAL_URL = "http://localhost:3000"

export const apiCourses = {
    get: async() => {
        try {
            const response = await api.get(
                `${HEROKU_URL}/course`
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
                `${HEROKU_URL}/user/create`,
                request
            )
            return response.data;
        } catch (error) {
            return error
        }
    },
};