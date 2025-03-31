import prisma from '../configs/db.config';
import fs from 'fs';
import type { UserSeeder } from '../models/user.model';

// Membaca file JSON secara sinkron
const userSeederJson = JSON.parse(fs.readFileSync('./src/seeders/user.seed.json', 'utf-8'));
const roleSeederJson = JSON.parse(fs.readFileSync('./src/seeders/role.seed.json', 'utf-8'));
const userRoleSeederJson = JSON.parse(fs.readFileSync('./src/seeders/user-role.seed.json', 'utf-8'));

async function seedDatabase() {
  try {
    // User Seed
    const userSeed = await Promise.all(
      userSeederJson.map(async (user: UserSeeder) => ({
        ...user,
        password: await Bun.password.hash(user.password),
      }))
    );

    await prisma.user.createMany({ data: userSeed });

    const countUser = await prisma.user.count();
    console.log('countUser', countUser);

    // Role Seed
    await prisma.role.createMany({ data: roleSeederJson });

    const countRole = await prisma.role.count();
    console.log('countRole', countRole);

    // User Role Seed
    await prisma.userRole.createMany({ data: userRoleSeederJson });

    const countUserRole = await prisma.userRole.count();
    console.log('countUserRole', countUserRole);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Jalankan seeding
seedDatabase();
