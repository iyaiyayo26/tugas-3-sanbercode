import request from "supertest";
import { BASE_URL } from "../../config.js";

export const getAllUser = async (accToken) => {
    const response = await request(BASE_URL).get('/users').set('Authorization', `Bearer ${accToken}`);

    return response;
}

export const getSpecificUser = async (accToken) => {
    const response = await request(BASE_URL).get('/users').set('Authorization', `Bearer ${accToken}`);
    const user_id = response.body.data.users[0].id;
    return user_id;
}

export const getUserDetail = async (user_id, accToken) => {
    const response = await request(BASE_URL).get(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`);
    return response;
}

export const createUser = async (accToken, payload) => {
    const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);
    return response;
}