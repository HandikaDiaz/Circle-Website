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
        nav: {
            title1: '#04A51E',
            title2: '#FFFFFF',
            text: '#FFFFFF',
            link: '#909090',
            background: '#262626',
            hoverText: '#04A51E',
            button: {
                text: '#FFFFFF',
                background: '#04A51E',
                hoverText: '#04A51E',
                hoverBackground: '#FFFFFF',
            }
        },
        home: {
            title: '#FFFFFF',
            text: '#FFFFFF',
            background: '#1D1D1D',
            line: '#3F3F3F',
            modal: '#B2B2B2',
            link: '#909090',
            hoverText: '#04A51E',
            hoverBackground: '#04A51E',
            button: {
                text: '#FFFFFF',
                background: '#005E0E',
                hoverText: '#005E0E',
                hoverBackground: '#FFFFFF',
            }
        }
    },
}

export const theme = extendTheme(themeConfig satisfies ThemeOverride);