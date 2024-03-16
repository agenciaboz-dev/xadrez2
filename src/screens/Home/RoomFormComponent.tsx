import { useFormik } from "formik"
import React, { useContext, useEffect, useRef, useState } from "react"
import { TextInput as TextInputNative, View } from "react-native"
import { Button, Modal, Portal, Surface, Text, TextInput } from "react-native-paper"
import { Room, RoomForm } from "../../types/server/class/Room"
import { useIo } from "../../hooks/useIo"
import { NavigationProp } from "@react-navigation/native"
import RoomContext from "../../contexts/roomContext"
import { useSnackbar } from "../../hooks/useSnackbar"
import { Player } from "../../types/server/class/Player"

interface RoomFormComponentProps {
    visible: boolean
    close: () => void
    navigation: NavigationProp<any, any>
    joining_room?: Room
}

export const RoomFormComponent: React.FC<RoomFormComponentProps> = ({ visible, close, navigation, joining_room }) => {
    const password_input_ref = useRef<TextInputNative | null>(null)
    const io = useIo()

    const { setRoom, setPlayer } = useContext(RoomContext)
    const snackbar = useSnackbar()

    const [loading, setLoading] = useState(false)

    const formik = useFormik<RoomForm>({
        initialValues: { name: joining_room?.name || "", password: "" },
        onSubmit: (values) => {
            if (!values.name) {
                snackbar("cadê o nome")
                return
            }

            setLoading(true)
            console.log(values)
            joining_room ? io.emit("room:join", joining_room.id, values.password) : io.emit("room:create", values)
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        io.on("room:join", (room: Room, player: Player) => {
            close()
            setRoom(room)
            setPlayer(player)
            setLoading(false)
            navigation.navigate("game")
            formik.resetForm()
        })

        io.on("room:join:error", (error: string) => {
            snackbar(error)
            setLoading(false)
            formik.setFieldValue("password", "")
            password_input_ref.current?.focus()
        })

        return () => {
            io.off("room:join")
            io.off("room:join:error")
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
                        autoFocus={!joining_room}
                    />
                    <TextInput
                        ref={password_input_ref}
                        label="senha"
                        value={formik.values.password}
                        onChangeText={formik.handleChange("password")}
                        secureTextEntry
                        right={<TextInput.Icon icon="eye" />}
                        onSubmitEditing={() => formik.handleSubmit()}
                        autoFocus={!!joining_room}
                    />
                    <Button mode="contained-tonal" onPress={() => formik.handleSubmit()} loading={loading}>
                        {joining_room ? "entrar" : "criar"}
                    </Button>
                </Surface>
            </Modal>
        </Portal>
    )
}
