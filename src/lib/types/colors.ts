export type ColorVariables = {
  BG: string
  FG: string
  Card: string
  CardFG: string
  Popover: string
  PopoverFG: string
  Primary: string
  PrimaryFG: string
  Secondary: string
  SecondaryFG: string
  Muted: string
  MutedFG: string
  Accent: string
  AccentFG: string
  InfoBG: string
  ErrorBG: string
  WarningBG: string
  SuccessBG: string
  IEWSFG: string
  Border: string
  Input: string
  Ring: string
}

export const initialColors: ColorVariables = {
  BG: '#ffffff',
  FG: '#09090b',
  Card: '#ffffff',
  CardFG: '#09090b',
  Popover: '#ffffff',
  PopoverFG: '#09090b',
  Primary: '#18181b',
  PrimaryFG: '#fafafa',
  Secondary: '#f4f4f5',
  SecondaryFG: '#18181b',
  Muted: '#f4f4f5',
  MutedFG: '#71717a',
  Accent: '#f4f4f5',
  AccentFG: '#18181b',
  InfoBG: '#0ea5e9',
  ErrorBG: '#ef4444',
  WarningBG: '#f59e0b',
  SuccessBG: '#16a34a',
  IEWSFG: '#fafafa',
  Border: '#e4e4e7',
  Input: '#e4e4e7',
  Ring: '#18181b',
}

export const colorVariableMapping: { [key: string]: keyof ColorVariables } = {
  '--background': 'BG',
  '--foreground': 'FG',
  '--card': 'Card',
  '--card-foreground': 'CardFG',
  '--popover': 'Popover',
  '--popover-foreground': 'PopoverFG',
  '--primary': 'Primary',
  '--primary-foreground': 'PrimaryFG',
  '--secondary': 'Secondary',
  '--secondary-foreground': 'SecondaryFG',
  '--muted': 'Muted',
  '--muted-foreground': 'MutedFG',
  '--accent': 'Accent',
  '--accent-foreground': 'AccentFG',
  '--destructive': 'ErrorBG',
  '--destructive-foreground': 'IEWSFG',
  '--border': 'Border',
  '--input': 'Input',
  '--ring': 'Ring',
}
