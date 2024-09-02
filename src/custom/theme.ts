import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeConfig: ThemeOverride = {
    colors: {
        form: {
            button: '#04A51E',
            text: '#FFFFFF',
            title: '#04A51E',
            background: '#1D1D1D',
            line: '#545454',
        },
    },
}

export const theme = extendTheme(themeConfig satisfies ThemeOverride);