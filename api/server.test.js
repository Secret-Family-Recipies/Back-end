const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

test("sanity", () => {
  expect(true).toBe(true);
});

// let token;

// beforeAll(async (done) => {
//   //   // request(server)
//   //   //   .post("/api/auth/login")
//   //   //   .send({
//   //   //     username: "test2",
//   //   //     password: "test2",
//   //   //   })
//   //   //   .end((err, response) => {
//   //   //     token = response.body.token;
//   //   //     console.log("response", response.body);
//   //   //     done();
//   //   //   });
//   //   // request(server)
//   //   //   .post("/api/auth/register")
//   //   //   .send({
//   //   //     username: "test2",
//   //   //     password: "test2",
//   //   //   })
//   //   //   .end((err, response) => {
//   //   //     token = response.body.token;
//   //   //     done();
//   //   //   });
// });

// beforeEach(async () => {
//   await db.seed.run();
// });

// afterAll(async () => {
//   await db.destroy();
// });

// describe("GET /", () => {
//   // token not being sent - should respond with a 401
//   test("It should require authorization to see users and recipes", () => {
//     return request(server)
//       .get("/api/users")
//       .then((response) => {
//         expect(response.statusCode).toBe(401);
//       });
//   });
//   // send the token - should respond with a 200
//   test("It sends back and responds with JSON", () => {
//     return request(server)
//       .get("/")
//       .set("Authorization", `Bearer ${token}`)
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         expect(response.type).toBe("application/json");
//       });
//   });
// });

//user for register
const testUser = {
  username: "test",
  password: "test",
};

//POST /api/auth/register  --- new user
describe("server.js", () => {
  describe("GET request for recipes", () => {
    test("should return a status code of 401 when not logged in", async () => {
      const res = await request(server).get("/api/recipes");
      console.log(res);
      expect(res.status).toBe(401);
    });
    test("should return json", async () => {
      const res = await request(server).get("/api/recipes");
      expect(res.type).toBe("application/json");
    });
  });

  //describe 2 POST /api/auth/register  --- new user
  describe("POST registering new user", () => {
    test("should return with a status code of 201 when adding new user", async () => {
      await db("users").truncate();
      const res = await request(server)
        .post("/api/auth/register")
        .send(testUser);
      expect(res.status).toBe(201);
    });
    test("POST should return a status of 500 if user is registered already", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send(testUser); //sending the same user from testUser
      expect(res.status).toBe(500);
    });
  });

  //describe 3 POST /api/auth/login
  describe("POST login with user", () => {
    test("should return a status code of 200 with logged in user", async () => {
      const res = await request(server).post("/api/auth/login").send(testUser);
      expect(res.status).toBe(200);
    });
    test("POST should return with status 401 if invalid credentials", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "testing123", password: "testing123" });
      expect(res.status).toBe(401);
    });
  });
});
