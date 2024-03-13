import React from 'react'
import {View} from 'react-native'
import { Room } from '../../types/server/class/Room'
import { Button, Surface, Text } from 'react-native-paper'

interface RoomComponentProps {
    room: Room
}

export const RoomComponent:React.FC<RoomComponentProps> = ({ room }) => {
    
    return (
        <Surface style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 50}}>
            <Text>{room.name}</Text>
            <Button mode='contained-tonal' onPress={() => console.log('aa')}>
                <Text>go</Text>
            </Button>
            
        </Surface>
    )
}