import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure prisma client is exported from here
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, role, college, department, academicYear } =
      await request.json();


    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

 
  const newUser = await prisma.user.create({
  data: {
      firstName,
      lastName,
      email,
      password:hashedPassword,
      role:role.toUpperCase(),
      college: college || null,
      department: department || null,
      academicYear: academicYear || null,
    },
   });

    return NextResponse.json({
      ok: true,
      message: "Account created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
