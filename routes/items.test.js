process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../app");

let items = require("../fakeDb");

let item = { name: "candy", price: 1 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});
//end afterEach

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", () => {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});
//end test

/** GET /items[name] - return data about the item: `{item: item}` */

describe("GET /items/:name", () => {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if cannot find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});
//end test

/** POST /items --create item from data; return `{item: item}` */

describe("POST /items", () => {
  test("Posts a new item", async function () {
    const response = await request(app).post(`/items`).send({
      name: "soda",
      price: 1,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("soda");
    expect(response.body.item.price).toEqual(1);
  });
});
//end test

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", () => {
  test("Updates a single item", async function () {
    const response = await request(app).patch(`/items/${item.name}`).send({
      name: "tea",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "tea",
    });
  });

  test("Responds with 404 if cannot find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});
//end test

/** DELETE /items/[name] - delete item, return msg: `{message: 'item deleted'}` */

describe("DELETE /items/:name", () => {
  test("Deletes a single item", async function () {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Item deleted" });
  });
});
//end test
