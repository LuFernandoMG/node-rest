const { faker } = require('@faker-js/faker');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const definedSize = 10;

    for (let i = 0; i < definedSize; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        product: [
          {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.url(),
          },
          {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.url(),
          },
          {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.url(),
          },
        ],
      });
    }
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  async findProducts(id) {
    const category = this.findOne(id);
    return category.product;
  }

  async create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, data) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      ...this.categories[index],
      ...data,
    };
    this.categories[index] = updatedCategory;
    return updatedCategory;
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories.splice(index, 1);
    return category;
  }
}

module.exports = CategoryService;
