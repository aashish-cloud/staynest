import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) return null;

  return currentUser;
}
