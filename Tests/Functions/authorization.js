import request from 'supertest';
import { BASE_URL } from '../../config.js';

export const getToken = async () => {
    let payload = {
        email: "sample@gmail.com",
        password: "abcde12345"
    }
    const response = await request(BASE_URL).post('/authentications').send(payload);
    
    const accToken = response.body.data.accessToken;
    return accToken;
}
