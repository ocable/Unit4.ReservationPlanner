const prisma = require("../prisma");

const seed = async (
  customerCount = 10,
  restaurantCount = 10,
  reservationCount = 30
) => {
  for (let i = 1; i <= customerCount; i++) {
    await prisma.customer.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Customer ${i}`,
      },
    });
  }

  for (let i = 1; i <= restaurantCount; i++) {
    await prisma.restaurant.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Restaurant ${i}`,
      },
    });
  }

  for (let i = 1; i <= reservationCount; i++) {
    await prisma.reservation.upsert({
      where: { id: i },
      update: {},
      create: {
        customerId: Math.floor(Math.random() * customerCount) + 1,
        restaurantId: Math.floor(Math.random() * restaurantCount) + 1,
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
