import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 3000;
async function main() {
  try {
    await prisma.$connect();
    console.log(
      "Connected to the database successfully."
    );

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("An error occured: ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
