import prisma from "@/db/prisma"

export const isUserExistByIdentifier = async (identifier: string) => {
    const user = await prisma.user.findUnique({ where: { identifier: identifier } })
    if (!user) return false;
    return true;
}