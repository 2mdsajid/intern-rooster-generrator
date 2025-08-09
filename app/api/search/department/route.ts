// app/api/search/department/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ message: 'Department name is required.' }, { status: 400 });
  }

  const duties = await prisma.duty.findMany({
    where: {
      subunit: {
        department: {
          name: {
            contains: name,
            // --- REMOVED --- The 'mode: insensitive' line was here.
          },
        },
      },
    },
    include: {
      intern: true,
      subunit: true,
    },
    orderBy: [
      { startDate: 'asc' },
      { intern: { name: 'asc' } }
    ]
  });

  return NextResponse.json(duties);
}