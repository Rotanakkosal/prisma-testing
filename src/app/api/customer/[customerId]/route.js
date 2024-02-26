// Delete Customer Endpoint
/**
 * @swagger
 * /api/customer/{customerID}:
 *  delete:
 *      summary: Delete Customer By ID.
 *      description: Delete Customer
 *      parameters:
 *        - in: path
 *          name: customerID
 *          schema:
 *              type: integer
 *              format: int64
 *          required: true
 *          description: Customer ID for delete
 *      responses:
 *          200:
 *              description: Customer Have Been Deleted
 */

// Get Customer By ID Endpoint
/**
 * @swagger
 * /api/customer/{customerID}:
 *  get:
 *      summary: Get Customer By ID.
 *      description: Get Customer
 *      parameters:
 *        - in: path
 *          name: customerID
 *          schema:
 *              type: integer
 *              format: int64
 *          required: true
 *          description: Get Customer by ID
 *      responses:
 *          200:
 *              description: Customer Have Been Found
 */

// Update Customer Name Endpoint
/**
 * @swagger
 * /api/customer/{customerId}:
 *   put:
 *     summary: Update a Customer.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         description: ID of the customer to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Customer not found
 */

// Update Customer Endpoint
/**
 * @swagger
 * /api/customer/{customerId}:
 *   patch:
 *     summary: Partially update a Customer.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         description: ID of the customer to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Customer not found
 */

import { NextResponse } from "next/server";
import {
  deleteCustomer,
  getCustomerById,
  updateCustomer,
  updateCustomerName,
} from "../../../../lib/prisma/customer-prisma";

const date = new Date();

// Get Customer By ID
export const GET = async (req, { params }) => {
  const customer = await getCustomerById(params.customerId);
  if (!customer) {
    return NextResponse.json(
      {
        message: "User Not Found ! ",
        status: 404,
        time: date,
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      message: "This record has found successfully ",
      customer,
      status: 200,
      time: date,
    },
    { status: 200 }
  );
};

// Delete Customer By ID
export const DELETE = async (req, { params }) => {
  console.log("Customer ID : ", customerId);
  await deleteCustomer(customerId);
  return NextResponse.json({
    message: `The user ID ${customerId} been delete successfully `,
    status: 204,
    time: date,
  });
};

// Update Customer Name
export const PATCH = async (req, { params }) => {
  const customerId = params.customerId;
  const body = await req.json();
  console.log("Patch Working !");
  console.log("Customer Body : ", body);

  // Omit string values from customer body
  const filteredBody = {};
  for (const key in body) {
    if (body[key] !== "string") {
      console.log("body in key ", body[key])
      filteredBody[key] = body[key];
    }
  }
  console.log("filterBody : ",filteredBody);
  const customer = await updateCustomerName(customerId, filteredBody);
  return NextResponse.json(
    {
      message: "This record have been updated successfully ",
      customer,
      status: 201,
      time: date,
    },
    { status: 201 }
  );
};

// Update Customer Information
export const PUT = async (req, { params }) => {
  const customerId = params.customerId;
  const body = await req.json();
  const customer = await updateCustomer(customerId, body);
  return NextResponse.json(
    {
      message: "This record have been updated successfully ",
      customer,
      status: 201,
      time: date,
    },
    { status: 201 }
  );
};
