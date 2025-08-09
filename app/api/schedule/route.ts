// app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import type { AllSchedules } from '@/app/lib/types';

export async function POST(request: Request) {
  const body: { schedules: AllSchedules; departmentData: any } = await request.json();
  const { schedules, departmentData } = body;

  try {
    await prisma.$transaction(async (tx) => {
      for (const deptName in schedules) {
        const departmentSchedule = schedules[deptName];
        
        const department = await tx.department.upsert({
          where: { name: deptName },
          update: {},
          create: { name: deptName },
        });

        // This part has been slightly improved for correctness.
        const subunitNames = departmentData[deptName] || [];
        for (const subName of subunitNames) {
          const existingSubunit = await tx.subunit.findFirst({
            where: { name: subName, departmentId: department.id },
          });
          if (!existingSubunit) {
            await tx.subunit.create({
              data: { name: subName, departmentId: department.id },
            });
          }
        }
        
        for (const weekRange in departmentSchedule) {
          const weekData = departmentSchedule[weekRange];
          const [startDateStr, endDateStr] = weekRange.split(' to ');
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);

          for (const subunitName in weekData) {
            const internNames = weekData[subunitName];

            if (internNames.length > 0) {
              const subunit = await tx.subunit.findFirst({
                where: { name: subunitName, departmentId: department.id },
              });
              
              if (!subunit) continue;

              for (const internName of internNames) {
                const intern = await tx.intern.upsert({
                  where: { name: internName },
                  update: {},
                  create: { name: internName },
                });

                // --- THIS IS THE KEY CHANGE ---
                // We now use `upsert` instead of `create`.
                await tx.duty.upsert({
                  // 1. Find a duty based on our new unique constraint.
                  where: {
                    internId_subunitId_startDate: {
                      internId: intern.id,
                      subunitId: subunit.id,
                      startDate: startDate,
                    },
                  },
                  // 2. If it exists, do nothing.
                  update: {},
                  // 3. If it does not exist, create it.
                  create: {
                    startDate,
                    endDate,
                    internId: intern.id,
                    subunitId: subunit.id,
                  },
                });
              }
            }
          }
        }
      }
    });

    return NextResponse.json({ message: 'Schedule saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Failed to save schedule:', error);
    return NextResponse.json({ message: 'Failed to save schedule.' }, { status: 500 });
  }
}