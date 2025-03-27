import prisma from '../configs/db.config';

const hashPassword = await Bun.password.hash('password123');
await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: hashPassword,
  },
});

const users = await prisma.user.findMany();
console.log(users);
