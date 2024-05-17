const { faker } = require('@faker-js/faker');

const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  generate() {
    const definedSize = 100;

    for (let i = 0; i < definedSize; i++) {
      this.users.push({
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
      });
    }
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    return this.users.find((item) => item.id === id);
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id, data) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.users[index],
      ...data,
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.users.splice(index, 1);
    return { message: 'User deleted' };
  }
};

module.exports = UserService;