import axios from "axios";

const api = axios.create({}),
    //BASE_URL = "https://api-shopping-cidadao-2.herokuapp.com"
    BASE_URL = "http://localhost:3000"

export const apiMain = {
    get: async(request) => {
        const response = await api.post(
            `${BASE_URL}/getLabel`,
            request
        )
        return response.data.map((c) => ({
            value: c.n.id,
            text: c.n.name,
        }));

    },
    upload: async(request) => {
        const response = await api.post(
            `${BASE_URL}/upload`,
            request
        )
        return response.data
    }
};

export const apiCourses = {
    create: async({ request }) => {
        const response = await api.post(
            `${BASE_URL}/user/create`,
            request
        )
        return response.data;
    },

    getByArea: async(request) => {
        const response = await api.post(
            `${BASE_URL}/course/getByArea`,
            request
        )
        return response.data.map((c) => ({
            value: c.courses.id,
            text: c.courses.name,
        }));
    },
    getGraphInfos: async() => {
        const response = await api.get(
            `${BASE_URL}/graphInfos`
        )
        return response.data
    }
};


export const apiCand = {
    get: async() => {
        const response = await api.get(
            `${BASE_URL}/user`
        )
        return response.data.map((c) => ({
            name: c.user.name,
            type: c.type.name,
            score: c.user.score,
            courses: c.courses,
            languages: c.languages
        }));
    },

    getByCpf: async(request) => {
        const response = await api.post(
            `${BASE_URL}/user/getByCpf`,
            request
        )
        return response.data
    },

    create: async({ request }) => {
        const response = await api.post(
            `${BASE_URL}/user/create`,
            request
        )
        return response.data;
    },

    login: async({ request }) => {
        const response = await api.post(
            `${BASE_URL}/user/login`,
            request
        )
        return response.data;
    },
};