import request from 'supertest';
import app from '../../app';
import { Users } from '../models/users.model';

describe('api suite', () => {
  // test case for healthcheck
  describe('healthcheck', () => {
    const OLD_ENV = process.env
    beforeAll(async () => {
      // mockingoose.resetAll();
      jest.resetModules();
      process.env.NODE_ENV = "test";
    })

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    test("It should respond with OK response for healthcheck", async () => {
      const response = await request(app).get("/healthCheck");
      expect(response.body).toEqual({"message": "OK"});
      expect(response.statusCode).toBe(200);
    });
  });

// test case for register
  describe('register', () => {
    const OLD_ENV = process.env
    beforeAll(() => {
      jest.resetModules();
      process.env.NODE_ENV = "test";
    })

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    test("It should respond with OK response for register", async () => {
      await Users.deleteOne({email:"Test@gmail.com"})
      const response = await request(app).post("/auth/register").type('form')
      .send({
        name:"Test", 
        email: "Test@gmail.com", 
        password: 'TestPass@123', 
        role: "Admin"
      });
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.status).toBe(201);
    });

    test("It should respond with error response with already exists for register", async () => {
      const response = await request(app).post("/auth/register").type('form')
      .send({
        name:"Test", 
        email: "Test@gmail.com", 
        password: 'TestPass@123', 
        role: "Admin"
      });
      expect(response.body.error).toEqual({"message": "User already exists"});
      expect(response.body.status).toBe(500);
    });

    test("It should respond with 500 response for register", async () => {
      const response = await request(app).post("/auth/register").type('form')
      .send({
        name:"Test", 
        email: "Test", 
        password: 'TestPass@123', 
        role: "Admin"
      });
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.status).toEqual(500);
    });
  });

  // test case for login
    describe('login', () => {
      const OLD_ENV = process.env
      beforeAll(() => {
        jest.resetModules();
        process.env.NODE_ENV = "test";
      })
  
      afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
      });
  
      test("It should respond with OK response for login", async () => {
        const response = await request(app).post("/auth/login").type('form')
        .send({
          email: "Test@gmail.com", 
          password: 'TestPass@123'
        });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.status).toBe(200);
      });

      test("It should respond with 500 response for login", async () => {
        const response = await request(app).post("/auth/login").type('form')
        .send({
          email: "Test", 
          password: 'TestPass@123'
        });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.status).toEqual(500);
      });
    });

  // test case for url shortner
    describe('url shortner', () => {
      const OLD_ENV = process.env
      beforeAll(() => {
        jest.resetModules();
        process.env.NODE_ENV = "test";
      })
  
      afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
      });
  
      test("It should respond with unauthorized response for url", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "http://localhost:3000/healthCheck"
        });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toBe(401);
      });
  
      test("It should respond with OK response for url", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "http://localhost:3000/healthCheck"
        }).set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGVjYmNhNWJhMDc2Yjg0OWVjZTViNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODY5MTQ1OCwiZXhwIjoxNjc4Nzc3ODU4fQ.2ntQxD8w9I2V3N1JLEiqaONqIJFbCmBQ2IHYDR-hRfM' });
        expect(response.body.data.code).toEqual('2AQbsPJ9Y');
        expect(response.status).toBe(200);
      });
      
      test("It should respond with 500 response for login", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "testUrl"
        }).set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGVjYmNhNWJhMDc2Yjg0OWVjZTViNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODY5MTQ1OCwiZXhwIjoxNjc4Nzc3ODU4fQ.2ntQxD8w9I2V3N1JLEiqaONqIJFbCmBQ2IHYDR-hRfM' });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.status).toEqual(500);
      });
      
      test("It should respond with 500 response for login", async () => {
        const response = await request(app).get("/2AQbsPJ9Y").type('form')
        .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGVjYmNhNWJhMDc2Yjg0OWVjZTViNCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODY5MTQ1OCwiZXhwIjoxNjc4Nzc3ODU4fQ.2ntQxD8w9I2V3N1JLEiqaONqIJFbCmBQ2IHYDR-hRfM' });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toEqual(200);
      });
    });
});