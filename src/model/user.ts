import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient().$extends({
    model: {
        user: {
            async find(userName: string) {
                return prisma.user.findUnique({
                    where: { userName },
                    select: {
                        id: true,
                        name: true,
                        userName: true,
                        password: true,
                        role: true,
                        email: true,
                        phoneNumber: true
                    }
                })
            },
            async add(userDetails: {
                name: string,
                userName: string,
                password: string,
                email: string,
                phoneNumber: string
            }) {
                return prisma.user.create({
                    data: {
                        ...userDetails
                    },
                    select: {
                        id: true,
                        name: true,
                        userName: true,
                        password: true,
                        role: true,
                        email: true,
                        phoneNumber: true
                    }
                })
            },
            async validUser(userName: string, password: string) {
                const user = await prisma.user.findUnique({
                    where: {
                        userName
                    }
                })
                if (!user) return null
                return bcrypt.compare(password, user.password)
            }
        }
    }
})


export default prisma