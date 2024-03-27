export const colorThemes = [ 'red', 'blue', 'green' ] as const;
export type ColorTheme = typeof colorThemes[number];
export type DarkColorTheme = `dark-${typeof colorThemes[number]}`
const darkColorThemes = colorThemes.map(t => 'dark-' + t as DarkColorTheme);

export const themes = [ ...colorThemes, ...(darkColorThemes as DarkColorTheme[]) ] as const;
export type Theme = typeof themes[number];
