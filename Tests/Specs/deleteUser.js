import request from 'supertest';
import { BASE_URL, WRONG_ID } from '../../config.js';
import { expect } from 'chai';
import { getToken } from '../Functions/authorization.js';
import { getSpecificUser } from '../Functions/userRequest.js';


describe('Delete user', () =>{
    let user_id, accToken;

    before('Get access token and get specific user id', async () => {
        accToken = await getToken();
        user_id = await getSpecificUser(accToken);
    });

    it('Positive - Success delete user', async () => {
        const response = await request(BASE_URL).delete(`/users/${user_id}`).set('Authorization', `Bearer ${accToken}`);

        expect(response.statusCode).to.eql(200);
        expect(response.body.status).to.eql('success');
        expect(response.body.message).to.eql('User berhasil dihapus');
    })

    it('Negative - Failed delete user because id is invalid', async () => {
        const response = await request(BASE_URL).delete(`/users/${WRONG_ID}`).set('Authorization', `Bearer ${accToken}`);

        expect(response.statusCode).to.eql(404);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('User tidak ditemukan');
    })
})