// app/api/suggestions/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type'); // 'intern' or 'department'

  if (!query) {
    return NextResponse.json([]); // Return empty array if no query
  }

  // Best Practice: Use a specific type instead of 'any'
  let results: { name: string }[] = [];

  try {
    if (type === 'intern') {
      results = await prisma.intern.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        take: 10,
        select: {
          name: true,
        },
      });
    } else if (type === 'department') {
      results = await prisma.department.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        take: 10,
        select: {
          name: true,
        },
      });
    }

    // --- CORRECTED LINE ---
    // The syntax is now a standard arrow function.
    return NextResponse.json(results.map((r) => r.name));

  } catch (error) {
    console.error("Suggestion fetch failed:", error);
    return NextResponse.json([], { status: 500 });
  }
}