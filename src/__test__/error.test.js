import request from 'supertest';
import app from '../../app';
import { Users } from '../models/users.model';
import { Urls } from '../models/urls.model';
import { JwtHelpers } from '../helpers/jwt.helper';
const token = JwtHelpers({ id: "utestId", role: 'Admin' }, '7d')
describe('catch statements', () => {
    beforeAll(() => {
      Users.findById = jest.fn().mockResolvedValue({email: "Test@gmail", "_id": "utestId", role: 'Admin'})
      Users.findOne = jest.fn().mockRejectedValue("error")
      Urls.findOne = jest.fn().mockRejectedValue("error")
      jest.resetModules();
    })

    afterEach(() => {
      jest.clearAllMocks();
    });
    
    test("It should respond with 500 response if any statement throws error for login", async () => {
      const response = await request(app).post("/auth/login").type('form')
      .send({
        email: "Test@gmail.com", 
        password: 'TestPass@123'
      });
      expect(response.body.message).toEqual('Something went wrong');
      expect(response.status).toEqual(500);
    });

    test("It should respond with 500 response if any statement throws register", async () => {
      const response = await request(app).post("/auth/register").type('form')
      .send({
        name:"Test", 
        email: "Test@gmail.com", 
        password: 'TestPass@123', 
        role: "Admin"
      });
      expect(response.body.message).toEqual('Something went wrong');
      expect(response.status).toEqual(500);
    });

    test("It should respond with unauthorized response for url", async () => {
      const response = await request(app).post("/").type('form')
      .send({
        originalUrl: "http://localhost:3000/healthCheck"
      }).set({ Authorization: 'Bearer '+token });
      expect(response.body.message).toEqual('Something went wrong');
      expect(response.status).toEqual(500);
    });
    
    test("It should respond with 500 response if statemenr throws erro", async () => {
      const response = await request(app).get("/2AQbsPJ9Y").type('form')
      .set({ Authorization: 'Bearer '+token });
      expect(response.body.message).toEqual('Something went wrong');
      expect(response.status).toEqual(500);
    });
    
  })