export const getTimeSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      const err = new Error("Date is required");
      err.statusCode = 400;
      throw err;
    }

    const selectedDate = new Date(date);
    const now = new Date();

    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 10) {
        const slot = new Date(selectedDate);
        slot.setHours(hour, min, 0, 0);

        if (slot > now) {
          slots.push(slot);
        }
      }
    }

    res.json(slots);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
