import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/helpers';

const prisma = new PrismaClient();

async function main() {
  // Check if an admin user already exists
  const adminUser = await prisma.userAccount.findUnique({
    where: { username: 'admin' },
  });

  if (!adminUser) {
    const hashedPassword = await hashPassword('admin');

    // Create the admin user
    await prisma.userAccount.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
