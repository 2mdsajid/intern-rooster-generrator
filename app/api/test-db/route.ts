// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
    try {
        console.log('Testing database connection...');
        console.log('DATABASE_URL:', process.env.DATABASE_URL);

        await prisma.$connect();
        console.log('Database connected successfully');

        // Test basic operations
        const internCount = await prisma.intern.count();
        const departmentCount = await prisma.department.count();
        const dutyCount = await prisma.duty.count();

        return NextResponse.json({
            status: 'connected',
            counts: {
                interns: internCount,
                departments: departmentCount,
                duties: dutyCount
            },
            databaseUrl: process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
            databaseUrl: process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}