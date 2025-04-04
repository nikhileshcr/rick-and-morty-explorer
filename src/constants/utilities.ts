export const generateRandomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getColor = (status: string) => {
  return status === "Alive" ? "green" : status === "Dead" ? "red" : "gray";
};
