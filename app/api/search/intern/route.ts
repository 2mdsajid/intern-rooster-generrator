// app/api/search/intern/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ message: 'Intern name is required.' }, { status: 400 });
  }

  const duties = await prisma.duty.findMany({
    where: {
      intern: {
        name: {
          contains: name,
          // --- REMOVED --- The 'mode: insensitive' line was here.
        },
      },
    },
    include: {
      intern: true,
      subunit: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  return NextResponse.json(duties);
}