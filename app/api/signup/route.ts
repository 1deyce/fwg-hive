import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();
        await connectMongo();
        const db = mongoose.connection.db!;

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: "User created successfully", userId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while creating the user" },
            { status: 500 }
        );
    }
}
