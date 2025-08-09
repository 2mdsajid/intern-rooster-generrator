/*
  Warnings:

  - A unique constraint covering the columns `[internId,subunitId,startDate]` on the table `Duty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Duty_internId_subunitId_startDate_key" ON "Duty"("internId", "subunitId", "startDate");
