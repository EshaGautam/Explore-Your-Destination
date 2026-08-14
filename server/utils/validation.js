export const validateName = (name) => {
  if (!name || typeof name !== "string") return false;
  if (name.length > 50) return false;
  const regex = /^[a-zA-Z0-9\s\-',]+$/;
  return regex.test(name);
};

export const validateInterest = (interest) => {
  if (!interest || typeof interest !== "string") return false;
  if (interest.length > 30) return false;
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(interest);
};
