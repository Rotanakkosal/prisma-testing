import prisma from "./prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    return { e };
  }
};

export const insertUser = async (userData) => {
   const users = await prisma.user.create({
    data: {
      name: userData["name"],
      email: userData["email"],
    },
  });
  return users;
};
