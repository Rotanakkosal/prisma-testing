/**
 * @swagger
 * /api/customer:
 *   get:
 *     summary : Return a list of customers
 *     description : The first trying with swagger in next js
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 0
 *               name: string
 *               gender: string
 *               age: 0
 *               address: string           
 */

/**
 * @swagger
 * /api/customer:
 *   post:
 *     summary: Create a Customer.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *              gender: 
 *                type: string
 *              age: 
 *                type: number
 *              address: 
 *                type: string
 *     responses:
 *       201:
 *         description: Created
 */



import { NextResponse } from "next/server";
import { getCustomerByName, getCustomers, insertCustomer } from "../../../lib/prisma/customer-prisma";

const date = new Date();

export const GET = async () => {
  const customers = await getCustomers();
  return NextResponse.json({
    message: "This record has found successfully ",
    customers,
    status: 200,
    time: date,
  });
};

export const POST = async (request) => {
  const body = await request.json();
  // check if user already exit
  const userExit = await getCustomerByName(body.name);
  if (userExit) {
    return NextResponse.json(
      {
        message: "User Already Exit !",
        body,
        status: 409,
        time: date,
      },
      { status: 409 } 
    );
  } else {
    const customer = await insertCustomer(body);
    return NextResponse.json({
      message: "This record was successfully created",
      customer,
      status: "OK",
      time: date,
    },{statusText: 'OK' });
  }
};
