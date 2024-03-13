import React from "react"
import { IoProvider } from "./contexts/ioContext"
import { PaperProvider } from "react-native-paper"
import { usePaperTheme } from "./hooks/usePaperTheme"
import { RoomProvider } from "./contexts/roomContext"
import { SnackbarProvider } from "./contexts/snackbarContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const theme = usePaperTheme()

    return (
        <>
            <PaperProvider theme={theme}>
                <SnackbarProvider>
                    <IoProvider>
                        <RoomProvider>{children}</RoomProvider>
                    </IoProvider>
                </SnackbarProvider>
            </PaperProvider>
        </>
    )
}
