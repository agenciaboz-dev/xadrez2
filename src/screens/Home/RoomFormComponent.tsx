import { useFormik } from "formik"
import React, { useContext, useEffect, useRef, useState } from "react"
import { TextInput as TextInputNative, View } from "react-native"
import { Button, Modal, Portal, Surface, Text, TextInput } from "react-native-paper"
import { Room, RoomForm } from "../../types/server/class/Room"
import { useIo } from "../../hooks/useIo"
import { NavigationProp } from "@react-navigation/native"
import RoomContext from "../../contexts/roomContext"

interface RoomFormComponentProps {
    visible: boolean
    close: () => void
    navigation: NavigationProp<any, any>
}

export const RoomFormComponent: React.FC<RoomFormComponentProps> = ({ visible, close, navigation }) => {
    const password_input_ref = useRef<TextInputNative | null>(null)
    const io = useIo()

    const { setRoom } = useContext(RoomContext)

    const [loading, setLoading] = useState(false)

    const formik = useFormik<RoomForm>({
        initialValues: { name: "", password: "" },
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
            io.emit("room:create", values)
        },
    })

    useEffect(() => {
        io.on("room:join", (room: Room) => {
            close()
            setRoom(room)
            setLoading(false)
            navigation.navigate("game")
            formik.resetForm()
        })

        return () => {
            io.off("room:join")
        }
    })

    return (
        <Portal>
            <Modal visible={visible} onDismiss={close} contentContainerStyle={{ padding: 20 }}>
                <Surface style={{ padding: 30, borderRadius: 30, gap: 20 }} elevation={1}>
                    <Text style={{ alignSelf: "center" }} variant="titleLarge">
                        nova sala
                    </Text>
                    <TextInput
                        label={"nome"}
                        value={formik.values.name}
                        onChangeText={formik.handleChange("name")}
                        returnKeyType="next"
                        onSubmitEditing={() => password_input_ref.current?.focus()}
                    />
                    <TextInput
                        ref={password_input_ref}
                        label="senha"
                        value={formik.values.password}
                        onChangeText={formik.handleChange("password")}
                        secureTextEntry
                        right={<TextInput.Icon icon="eye" />}
                        onSubmitEditing={() => formik.handleSubmit()}
                    />
                    <Button mode="contained-tonal" onPress={() => formik.handleSubmit()} loading={loading}>
                        criar
                    </Button>
                </Surface>
            </Modal>
        </Portal>
    )
}
