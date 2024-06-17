import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // GET PASSED BODY DATA FROM THE REQUEST
    const body = await request.json();
    console.log(body);

    const { email, username, password } = body;

    // CHECK IF THE DATA IS PRESENT
    if (!email || !username || !password) {
      return new NextResponse("Missing Information", { status: 400 });
    }

    // HASH THE PASSED PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    // CREATE NEW USER
    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
      },
    });

    // RETURN THE JSON USER OBJECT
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATON ERROR");
    return new NextResponse("REGISTRATION ERROR", { status: 500 });
  }
}
