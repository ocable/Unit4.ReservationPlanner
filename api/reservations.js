const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const reservation = await prisma.reservation.findUnique({ where: { id } });

    if (!reservation) {
      return next({
        status: 404,
        message: `Could not find player with id ${id}.`,
      });
    }

    res.json(reservation);
  } catch {
    next();
  }
});


