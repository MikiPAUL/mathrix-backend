import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient().$extends({
    model: {
        event: {
            async add(eventDetails: {
                addedBy: number,
                title: string,
                description: string,
                eventTiming: string,
                location: string,
                prize: number,
                posterUrl: string
            }) {
                console.log(eventDetails)
                return prisma.event.create({
                    data: {
                        ...eventDetails
                    }
                })
            },
            async list() {
                return prisma.event.findMany({
                    where: {
                        deleted: false
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        eventTiming: true,
                        location: true,
                        prize: true,
                        posterUrl: true,
                        otherDetails: true,
                        eventType: true,
                        eventMode: true
                    }
                })
            }
        }
    }
})


export default prisma