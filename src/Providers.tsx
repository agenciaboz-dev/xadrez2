import React from "react"
import { IoProvider } from "./contexts/ioContext"
import { PaperProvider } from "react-native-paper"
import { usePaperTheme } from "./hooks/usePaperTheme"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const theme = usePaperTheme()

    return (
        <>
            <PaperProvider theme={theme}>
                <IoProvider>{children}</IoProvider>
            </PaperProvider>
        </>
    )
}
