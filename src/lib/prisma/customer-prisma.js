import prisma from "./prisma";

export const getCustomers = async () => {
  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (e) {
    return { e };
  }
};

export const getCustomerById = async (id) => {
  const customerId = Number(id);
  try {
    const customer = prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    return customer;
  } catch (e) {
    return { e };
  }
};

export const getCustomerByName = async (customerName) => {
  try {
    const customer = prisma.customer.findFirst({
      where: {
        name: customerName,
      },
    });
    return customer;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Error from prisma");
    }
  }
};

export const deleteCustomer = async (id) => {
  const customerId = Number(id);
  try {
    const customer = prisma.customer.delete({
      where: {
        id: customerId,
      },
    });
    return customer;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2025") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
  }
};

export const insertCustomer = async (customerData) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        name: customerData["name"],
        gender: customerData["gender"],
        age: customerData["age"],
        address: customerData["address"],
      },
    });
    return customer;
  } catch (e) {
    return { e };
  }
};

export const updateCustomerName = async (id, customerData) => {
  const customerId = Number(id);
  try {
    const updateCustomerName = await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: customerData["name"],
        gender: customerData['gender'],
        age: customerData['age'],
        address: customerData['address']
      },
    });
    return updateCustomerName;
  } catch (e) {
    return console.log("error : ", e);
  }
};

export const updateCustomer = async (id, customerData) => {
  const customerId = Number(id);
  try {
    const updateCustomer = await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: customerData["name"],
        gender: customerData['gender'],
        age: customerData['age'],
        address: customerData['address']
      },
    });
    return updateCustomer;
  } catch (e) {
    return console.log("error : ", e);
  }
};