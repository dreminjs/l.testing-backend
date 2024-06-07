-- CreateTable
CREATE TABLE "resumes" (
    "id" SERIAL NOT NULL,
    "photo" TEXT,
    "age" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "desired_salary" INTEGER NOT NULL,
    "experience" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resumes_userId_key" ON "resumes"("userId");

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
