export type ThemeVariables = {
  [key: string]: string
}

export type Theme = {
  css: ThemeVariables
  tailwind: ThemeVariables
}

export const initialThemeColors: ThemeVariables = {
  '--background': '#ffffff',
  '--foreground': '#09090b',
  '--card': '#ffffff',
  '--card-foreground': '#09090b',
  '--popover': '#ffffff',
  '--popover-foreground': '#09090b',
  '--primary': '#18181b',
  '--primary-foreground': '#fafafa',
  '--secondary': '#f4f4f5',
  '--secondary-foreground': '#18181b',
  '--muted': '#f4f4f5',
  '--muted-foreground': '#71717a',
  '--accent': '#f4f4f5',
  '--accent-foreground': '#18181b',
  '--destructive': '#ef4444',
  '--destructive-foreground': '#fafafa',
  '--border': '#e4e4e7',
  '--input': '#e4e4e7',
  '--ring': '#18181b',
}

export const initialThemeOther: ThemeVariables = {
  '--radius': '0.5rem',
  '--font-sans': 'Inter, sans-serif',
  '--font-mono': 'Mononoki Nerd Font Mono, monospace',
  '--shadow':
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow-md':
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '--shadow-lg':
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '--shadow-xl':
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}

export const themeColorVariables = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--destructive-foreground',
  '--border',
  '--input',
  '--ring',
]

export const themeOtherVariables = [
  '--radius',
  '--font-sans',
  '--font-mono',
  '--shadow',
  '--shadow-sm',
  '--shadow-md',
  '--shadow-lg',
  '--shadow-xl',
]
