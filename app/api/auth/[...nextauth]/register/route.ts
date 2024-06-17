import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // GET PASSED BODY DATA FROM THE REQUEST
    const body = await req.json();
    const { email, name, password } = body;

    // CHECK IF THE DATA IS PRESENT
    if (!email || !name || !password) {
      return new NextResponse("Missing Information", { status: 400 });
    }

    // HASH THE PASSED PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    // CREATE NEW USER
    const user = await prisma.user.create({
      data: {
        email,
        name,
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
