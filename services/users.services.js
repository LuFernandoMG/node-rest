const { faker } = require('@faker-js/faker');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
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
    return this.users;
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