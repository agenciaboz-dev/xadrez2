import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { Button, Surface, Text } from "react-native-paper"
import { useIo } from "../../hooks/useIo"
import { Room } from "../../types/server/class/Room"
import { RoomComponent } from "./RoomComponent"

interface RoomsListProps {}

export const RoomsList: React.FC<RoomsListProps> = ({}) => {
    const io = useIo()

    const [rooms, setRooms] = useState<Room[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const refreshRooms = () => {
        setRefreshing(true)
        io.emit("room:list")
    }

    useEffect(() => {
        refreshRooms()
        const interval = setInterval(() => refreshRooms(), 10 * 1000)

        io.on("room:list", (list: Room[]) => {
            // console.log({ list })
            setRooms(list)
            setRefreshing(false)
        })

        io.on("room:update", (room: Room) => {
            // console.log({ room })
            setRooms((rooms) => [...rooms.filter((item) => item.id != room.id), room])
        })

        return () => {
            io.off("room:list")
            io.off("room:update")

            clearInterval(interval)
        }
    }, [])

    return (
        <Surface elevation={2} style={{ flex: 1, width: "100%", borderRadius: 50, paddingHorizontal: 30, alignItems: "center", gap: 10 }}>
            <FlatList
                data={rooms}
                renderItem={({ item }) => <RoomComponent room={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                style={{ width: "100%" }}
                contentContainerStyle={{ gap: 20, paddingVertical: 30 }}
                onRefresh={refreshRooms}
                refreshing={refreshing}
            />
        </Surface>
    )
}
