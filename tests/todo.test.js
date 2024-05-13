const request = require('supertest');
const app = require('../app'); // Mengimpor aplikasi Express yang telah kita buat
const { Todo } = require('../models'); // Mengimpor model Todo

describe('Todo API', () => {
  beforeAll(async () => {
    // Menjalankan migrasi sebelum melakukan unit test
    await Todo.sync({ force: true });
  });

  afterAll(async () => {
    // Menghapus tabel setelah selesai unit test
    await Todo.drop();
  });

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: 'New Todo' });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('New Todo');
  });

  it('should list all todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a todo by id', async () => {
    const createdTodo = await Todo.create({ title: 'Test Todo' });
    const response = await request(app).get(`/todos/${createdTodo.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Test Todo');
  });

  it('should return 404 if todo not found', async () => {
    const response = await request(app).get('/todos/999');
    expect(response.statusCode).toBe(404);
  });

  it('should delete a todo', async () => {
    const response = await request(app).delete('/todos/1'); // Sesuaikan dengan ID yang ada
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Todo deleted successfully');
  });
});
