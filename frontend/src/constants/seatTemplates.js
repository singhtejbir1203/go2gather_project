export const seatTemplates = {
  car: [
    { seatCode: "FL", label: "Front Left" },
    { seatCode: "BL", label: "Back Left" },
    { seatCode: "BM", label: "Back Middle" },
    { seatCode: "BR", label: "Back Right" },
  ],

  bus: Array.from({ length: 30 }, (_, i) => ({
    seatCode: `S${i + 1}`,
    label: `Seat ${i + 1}`,
  })),

  auto: [
    { seatCode: "BL", label: "Back Left" },
    { seatCode: "BM", label: "Back Middle" },
    { seatCode: "BR", label: "Back Right" },
  ],

  bike: [{ seatCode: "P1", label: "Pillion Seat" }],
};
