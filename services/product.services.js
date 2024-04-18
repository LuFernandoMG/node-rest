const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const definedSize = 100;

    for (let i = 0; i < definedSize; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        category: faker.commerce.department(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  // GET
  async find() {
    return new Promise ((resolve, reject) => {
      if(this.products.length === 0) {
        reject(boom.notFound('Products not found'));
      }
      resolve(this.products);
    }, 5000);
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  // POST
  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // PATCH
  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const updatedProduct = {
      ...this.products[index],
      ...data,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  // DELETE
  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductService;
