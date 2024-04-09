import { db } from "@/lib/db";

// model User {
//     id Int @id @default(autoincrement())
//     firstName String @db.VarChar(500)
//     lastName String @db.VarChar(500)
//     emailaddress String @db.VarChar(255)
//     booking Booking[]
//     created DateTime
//     lastUpdate DateTime
//   }

export async function SaveUser(user: any) {
  console.log(user.firstName);
  console.log(user.lastName);
  console.log(user.emailAddresses[0].emailAddress);

  const users = await db.user.findMany({
    where: { emailaddress: user.emailAddresses[0].emailAddress },
    take: 1
  });
  console.log(users);
  console.log(users.length);
  if ((users.length == 0)) {
    const result = await db.user.create({
        data: {
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          emailaddress: user.emailAddresses[0].emailAddress,
          created: new Date(),
          lastUpdate: new Date(),
        },
      });
  }
}
