import request from 'supertest';
import { BASE_URL, WRONG_ID } from '../../config.js';
import { expect } from 'chai';
import { getToken } from '../Functions/authorization.js';
import { getSpecificUser } from '../Functions/userRequest.js';

describe('Update user', () => {
    let user_id, accToken;

    before('Get access token and get specific user id', async () => {
        accToken = await getToken();
        user_id = await getSpecificUser(accToken);
    });

    it('Positive - Success update user', async () => {
        let payload = {
            name: "fahiya namira",
            email: "fahiya@gmail.com"
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(200);
        expect(response.body.status).to.eql('success');
        expect(response.body.message).to.eql('User berhasil diupdate');
        expect(response.body.data.name).to.eql(payload.name);
    })

    it('Negative - Failed because id not exist', async () => {
        let payload = {
            name: "fahiya namira",
            email: "fahiya@gmail.com"
        }
        const response = await request(BASE_URL).put(`/users/${WRONG_ID}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(404);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('User tidak ditemukan');
    })

    /*it('Negative - Failed because name is empty', async () => {
        let payload = {
            name: "",
            email: "fahiya@gmail.com"
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty');
    })

    it('Negative - Failed because name is null', async () => {
        let payload = {
            name: null,
            email: "fahiya@gmail.com"
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" must be a string');
    })

    it('Negative - Failed because email is empty', async () => {
        let payload = {
            name: "fahiya namira",
            email: ""
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty');
    })

    it('Negative - Failed because email consist of 1 space', async () => {
        let payload = {
            name: "fahiya namira",
            email: " "
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" must be a valid email');        
    })

    it('Negative - Failed because email is null', async () => {
        let payload = {
            name: "fahiya namira",
            email: null
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" must be a string');
    })

    it('Negative - Failed because email format is invalid', async () => {
        let payload = {
            name: "fahiya namira",
            email: "fahiya@@gmail.com"
        }
        const response = await request(BASE_URL).put(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" must be a valid email');
    })*/
})