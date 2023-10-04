import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedP = await bcrypt.hash(password, saltRound);
    return hashedP;
  } catch (error) {
    console.log(error);
  }
};

export const ComparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
