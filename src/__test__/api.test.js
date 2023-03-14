import request from 'supertest';
import app from '../../app';
import { Urls } from '../models/urls.model';
import { Users } from '../models/users.model';
import jwt from 'jsonwebtoken';
var token = ''
let urlCode = ''
describe('api suite', () => {

  afterAll(async () => {
    await Users.deleteOne({email:"Test@gmail.com"})
  });
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

    afterAll(async () => {
      process.env = OLD_ENV; // Restore old environment
    });

    test("It should respond with OK response for register", async () => {
      const response = await request(app).post("/auth/register").type('form')
      .send({
        name:"Test", 
        email: "Test@gmail.com", 
        password: 'TestPass@123', 
        role: "Admin"
      });
      expect(response.body).toEqual(expect.any(Object));
      expect(response.status).toBe(201);
    });

    test("It should respond with error response with already exists for register", async () => {
      const response = await request(app).post("/auth/register").type('form')
      .send({
        name:"Test", 
        email: "Test@gmail.com", 
        password: 'TestPass@123', 
        role: "Admin"
      });
      expect(response.body.message).toEqual("User already exists");
      expect(response.status).toBe(409);
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
      expect(response.status).toEqual(400);
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
        token = response.body.token
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toBe(200);
      });
  
      test("It should respond with OK response for login", async () => {
        const response = await request(app).post("/auth/login").type('form')
        .send({
          email: "Test@gmail.com", 
          password: 'TestPass@12'
        });
        expect(response.body.message).toEqual('Wrong password');
        expect(response.status).toBe(403);
      });
  
      test("It should respond with OK response for login", async () => {
        const response = await request(app).post("/auth/login").type('form')
        .send({
          email: "Test@gmail.com", 
          password: 'TestPass'
        });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toBe(400);
      });

      test("It should respond with 500 response for login", async () => {
        const response = await request(app).post("/auth/login").type('form')
        .send({
          email: "Test", 
          password: 'TestPass@123'
        });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toEqual(404);
      });

    });

  // test case for url shortner
    describe('url shortner', () => {
      const OLD_ENV = process.env
      beforeAll(() => {
        jest.resetModules();
        process.env.NODE_ENV = "test";
      })
  
      afterAll(async () => {
        process.env = OLD_ENV; // Restore old environment
        await Urls.deleteOne({originalUrl: "http://localhost:3000/healthCheck"})
      });
  
      test("It should respond with unauthorized response for url", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "http://localhost:3000/healthCheck"
        });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toBe(401);
      });
  
      test("It should respond with OK response for url creation", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "http://localhost:3000/healthCheck"
        }).set({ Authorization: 'Bearer '+token });
        urlCode = response.body.data.code
        expect(response.body.data.code).toBeTruthy();
        expect(response.status).toBe(201);
      });
  
      test("It should respond with 409 response for url already exists", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "http://localhost:3000/healthCheck"
        }).set({ Authorization: 'Bearer '+token });
        urlCode = response.body.data.code
        expect(response.body.data.code).toBeTruthy();
        expect(response.status).toBe(409);
      });
      
      test("It should respond with 400 response for wrong url", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "testUrl"
        }).set({ Authorization: 'Bearer '+token });
        expect(response.body).toEqual(expect.any(Object));
        expect(response.status).toEqual(400);
      });
      
      test("It should respond with 401 response for wrong token", async () => {
        const response = await request(app).post("/").type('form')
        .send({
          originalUrl: "testUrl"
        }).set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGY4MWQ3MzkzOTQxYzFjMzk5MmY4YSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODczNzkwMiwiZXhwIjoxNjc5MzQyNzAyfQ.vFWGpKfDeBtzbhJuvk0PqjXChXss97SYsTxtk5u7u50' });
        expect(response.body.message).toEqual('Unauthorized access');
        expect(response.status).toEqual(401);
      });
      
      test("It should respond with 404 response if url doesn't exists", async () => {
        const response = await request(app).get("/2AQbsPJ9Y").type('form')
        .set({ Authorization: 'Bearer '+token });
        expect(response.body.message).toEqual('No url found');
        expect(response.status).toEqual(404);
      });
      
      test("It should respond with 200 response if url exists", async () => {
        const response = await request(app).get("/"+urlCode).type('form')
        .set({ Authorization: 'Bearer '+token });
        expect(response.body.message).toEqual('Url found');
        expect(response.status).toEqual(200);
      });
      
      test("It should respond with 401 response for wrong token", async () => {
        const response = await request(app).get("/"+urlCode).type('form')
        .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGY4MWQ3MzkzOTQxYzFjMzk5MmY4YSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODczNzkwMiwiZXhwIjoxNjc5MzQyNzAyfQ.vFWGpKfDeBtzbhJuvk0PqjXChXss97SYsTxtk5u7u50' });
        expect(response.body.message).toEqual('Unauthorized access');
        expect(response.status).toEqual(401);
      });
      
      test("It should respond with 401 response for without token", async () => {
        const response = await request(app).get("/"+urlCode).type('form')
        expect(response.body.message).toEqual('Unauthorized access');
        expect(response.status).toEqual(401);
      });
      
      test("It should respond with 401 response if jwt verify throws error", async () => {
          jwt.verify = jest.fn().mockRejectedValueOnce("error")
          const response = await request(app).get("/"+urlCode).type('form')
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGY4MWQ3MzkzOTQxYzFjMzk5MmY4YSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3ODczNzkwMiwiZXhwIjoxNjc5MzQyNzAyfQ.vFWGpKfDeBtzbhJuvk0PqjXChXss97SYsTxtk5u7u50' });
          expect(response.body.message).toEqual('Unauthorized access');
          expect(response.status).toEqual(401);
        });
        
        test("It should respond with 401 response if jwt verify throws error", async () => {
          jwt.verify = jest.fn().mockRejectedValueOnce("error")
          const response = await request(app).post("/").type('form')
          .send({
            originalUrl: "testUrl"
          }).set({ Authorization: 'Bearer '+token });
          expect(response.body.message).toEqual('Unauthorized access');
          expect(response.status).toEqual(401);
        });
    });

});