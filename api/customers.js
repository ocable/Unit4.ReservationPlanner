const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch {
    next();
  }
});

router.get('/:id', async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const customer = await prisma.customer.findUnique({ where: { id } });
  
      if (!customer) {
        return next({
          status: 404,
          message: `Could not find player with id ${id}.`,
        });
      }
  
      res.json(customer);
    } catch {
      next();
    }
  });

router.get("/:id/reservations", async (req, res, next) => {
  try {
    const customerId = +req.params.id;

    const reservation = await prisma.reservation.findMany({ where: { customerId } });

    if (!reservation) {
      return next({
        status: 404,
        message: `Could not find player with id ${id}.`,
      });
    }
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

router.delete("/:customer_id/reservations/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const customerId = +req.params.customer_id;

    const reservation = await prisma.reservation.delete({
      where: { customerId, id },
    });

    if (!reservation) {
      return next({
        status: 404,
        message: `Could not find player with id ${id}.`,
      });
    }

    res.json(reservation);
  } catch (error){
    next(error);
  }
});
