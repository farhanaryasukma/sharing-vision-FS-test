-- CreateTable
CREATE TABLE "posts" (
    "Id" SERIAL NOT NULL,
    "Title" VARCHAR(200) NOT NULL,
    "Content" TEXT NOT NULL,
    "Category" VARCHAR(100) NOT NULL,
    "Created_date" TIMESTAMP NOT NULL,
    "Updated_date" TIMESTAMP NOT NULL,
    "Status" VARCHAR(100) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("Id")
);
