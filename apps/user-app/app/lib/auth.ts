import prisma from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.JWT_SECRET || "secret",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const hashedPass = await bcrypt.hash(credentials.password, 10);
        const user = await prisma.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (user) {
          const validation = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (validation) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.number,
            };
          }
          return null;
        }
        try {
          const user = await prisma.user.create({
            data: {
              number: credentials.phone,
              password: hashedPass,
            },
          });
          await prisma.balance.create({
            data: {
              userId: user.id,
              amount: 0,
              locked: 0,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
