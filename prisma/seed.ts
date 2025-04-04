const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create categories
  const tshirts = await prisma.category.upsert({
    where: { name: 'T-shirts' },
    update: {},
    create: {
      name: 'T-shirts',
      description: 'Comfortable and stylish t-shirts for all occasions',
      image: '/images/c-tshirts.jpg',
    },
  })

  const jeans = await prisma.category.upsert({
    where: { name: 'Jeans' },
    update: {},
    create: {
      name: 'Jeans',
      description: 'High-quality denim jeans for men and women',
      image: '/images/c-jeans.jpg',
    },
  })

  const shoes = await prisma.category.upsert({
    where: { name: 'Shoes' },
    update: {},
    create: {
      name: 'Shoes',
      description: 'Trendy and comfortable footwear for every style',
      image: '/images/c-shoes.jpg',
    },
  })

  // Create products
  // T-shirts
  await prisma.product.upsert({
    where: { id: 'tshirt-1' },
    update: {},
    create: {
      id: 'tshirt-1',
      name: 'Classic Cotton T-Shirt',
      description: 'Premium quality cotton t-shirt with a comfortable fit',
      price: 29.99,
      images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
      stock: 50,
      categoryId: tshirts.id,
    },
  })

  await prisma.product.upsert({
    where: { id: 'tshirt-2' },
    update: {},
    create: {
      id: 'tshirt-2',
      name: 'Graphic Print T-Shirt',
      description: 'Modern graphic print t-shirt with unique design',
      price: 34.99,
      images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
      stock: 30,
      categoryId: tshirts.id,
    },
  })

  // Jeans
  await prisma.product.upsert({
    where: { id: 'jeans-1' },
    update: {},
    create: {
      id: 'jeans-1',
      name: 'Slim Fit Denim Jeans',
      description: 'Classic slim fit jeans with perfect stretch',
      price: 79.99,
      images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
      stock: 40,
      categoryId: jeans.id,
    },
  })

  await prisma.product.upsert({
    where: { id: 'jeans-2' },
    update: {},
    create: {
      id: 'jeans-2',
      name: 'Relaxed Fit Jeans',
      description: 'Comfortable relaxed fit jeans for casual wear',
      price: 69.99,
      images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
      stock: 35,
      categoryId: jeans.id,
    },
  })

  // Shoes
  await prisma.product.upsert({
    where: { id: 'shoes-1' },
    update: {},
    create: {
      id: 'shoes-1',
      name: 'Classic Sneakers',
      description: 'Versatile and comfortable sneakers for everyday wear',
      price: 89.99,
      images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
      stock: 25,
      categoryId: shoes.id,
    },
  })

  await prisma.product.upsert({
    where: { id: 'shoes-2' },
    update: {},
    create: {
      id: 'shoes-2',
      name: 'Running Shoes',
      description: 'High-performance running shoes with excellent support',
      price: 119.99,
      images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
      stock: 20,
      categoryId: shoes.id,
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 