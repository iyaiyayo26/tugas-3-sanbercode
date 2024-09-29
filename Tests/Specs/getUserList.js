import { expect } from 'chai';
import { getToken } from '../Functions/authorization.js';
import { getAllUser } from '../Functions/userRequest.js';

describe('Get all users', () => {
    let accToken;

    before('Get access Token', async () => {
        accToken = await getToken();
    })

    it('Positive - Success get all users', async () => {
        const response = await getAllUser(accToken);

        expect(response.status).to.eql(200);
        expect(response.body.status).to.eql("success");
    })
})
