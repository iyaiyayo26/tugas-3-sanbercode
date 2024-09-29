import { expect } from 'chai';
import request from 'supertest';
import { BASE_URL } from '../../config.js';
import { getSpecificUser, getUserDetail } from '../Functions/userRequest.js';
import { getToken } from '../Functions/authorization.js';

describe('Get user detail', () => {
    let user_id, accToken;

    before('Get access token and get specific user id', async () => {
        accToken = await getToken();
        user_id = await getSpecificUser(accToken);
    });

    it('Positive - Success get user detail', async () => {
        const response = await getUserDetail(user_id, accToken);

        expect(response.status).to.eql(200);
        expect(response.body.status).to.eql("success");
    });

    it('Negative - Failed because id is invalid', async () => {
        const response = await getUserDetail('wrong', accToken);

        expect(response.body.status).to.eql("fail");
        expect(response.body.message).to.eql("id tidak valid");
    });
});