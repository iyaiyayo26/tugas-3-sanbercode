// import request from 'supertest';
// import { accToken, BASE_URL } from '../../config.js';
import { expect } from 'chai';
import { it } from 'mocha';
import { createUser } from '../Functions/userRequest.js';
import { getToken } from '../Functions/authorization.js';

describe('Create user', () => {
    let accToken;

    before('Get access Token', async () => {
        accToken = await getToken();
    })

    it('Positive - Success create new user', async () => {
        let payload = {
            name: "namira11",
            email: "namira11@gmail.com",
            password: "jiasda2321@"
        }
        const response = await createUser(accToken, payload);
        console.log('hasil response:', response.body);
        
        expect(response.statusCode).to.eql(201);
        expect(response.body.status).to.eql('success');
        expect(response.body.message).to.eql('User berhasil ditambahkan')
        expect(response.body.data.name).to.eql(payload.name);
    })

    it('Negative - Failed because name field is empty', async () => {
        let payload = {
            name: "",
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }
        const response = await createUser(accToken, payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty');
    })

    // it('Negative - Failed because name field is null', async () => {
    //     let payload = {
    //         name: null,
    //         email: "namira@gmail.com",
    //         password: "jiasda2321@"
    //     }
    //     const response = await createUser(accToken, payload);

    //     expect(response.statusCode).to.eql(400);
    //     expect(response.body.status).to.eql('fail');
    //     expect(response.body.message).to.eql('\"name\" must be a string');
    // })

    /*it('Negative - Failed because the data is already used', async () => {
        let payload = {
            name: "namira",
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }

        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('Email sudah digunakan');
    });

    it('Negative - Failed because the name value uses the boolean data type true', async () => {
        let payload = {
            name: true,
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);
        
        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" must be a string');
    })

    it('Negative - Failed because the name value uses the boolean data type false', async () => {
        let payload = {
            name: false,
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" must be a string');
    })

    it('Negative - Failed because the name value uses the integer data type', async () => {
        let payload = {
            name: 11,
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" must be a string');
    })

    it('Negative - Failed because the name value uses the float data type', async () => {
        let payload = {
            name: 0.5,
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" must be a string');
    })

    it('Negative - Failed because the email value is empty', async () => {
        let payload = {
            name: "namira",
            email: "",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty');
    })

    it('Negative - Failed because the email value consist of 1 space', async () => {
        let payload = {
            name: "namira",
            email: " ",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" must be a valid email');
    })

    it('Negative - Failed because the email value is null', async () => {
        let payload = {
            name: "namira",
            email: null,
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" must be a string');
    })

    it('Negative - Failed because the email value is already used', async () => {
        let payload = {
            name: "test",
            email: "namira@gmail.com",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('Email sudah digunakan');
    })

    it('Negative - Failed because the email format is not valid', async () => {
        let payload = {
            name: "namira",
            email: "namira@@gmail.com",
            password: "jiasda2321@"
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"email\" must be a valid email');
    })

    it('Negative - Failed because password is empty', async () => {
        let payload = {
            name: "namira",
            email: "namira@gmail.com",
            password: ""
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty');
    })

    it('Negative - Failed because password is null', async () => {
        let payload = {
            name: "namira",
            email: "namira@gmail.com",
            password: null
        }
        const response = await request(BASE_URL).post('/users').set('Authorization', `Bearer ${accToken}`).send(payload);

        expect(response.statusCode).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"password\" must be a string');
    })*/
})