import { getCustomerByName } from "@/lib/prisma/customer-prisma";
import { NextResponse } from "next/server";
const date = new Date();

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("name");
  const customerName = await getCustomerByName(query);
  if (customerName == null) {
    return NextResponse.json({
      message: "This record have not Found ",
      status: 404,
      time: date,
    },{status:404});
  } else {
    return NextResponse.json({
      message: "This record has found successfully ",
      customerName,
      status: 201,
      time: date,
    },{status:201});
  }
};
