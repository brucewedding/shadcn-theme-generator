'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

import {
  generateThemeColors,
  updateThemeColorsWithSaturation,
} from '@/lib/utils/generator'

import type { ColorVariables } from '@/lib/types/colors'
import type {
  ThemeColorsVariables,
  ThemeOtherVariables,
} from '@/lib/types/theme'
import { initialThemeColors, initialThemeOther } from '@/lib/types/theme'
import { themeColorVariables, themeOtherVariables } from '@/lib/types/theme'
import { ColorScheme } from '@/lib/types/schemes'
import { hexToHSL } from '@/lib/utils/color'
import { randomInteger } from '@/lib/utils/math'

export type ThemeContextType = {
  theme: ThemeColorsVariables
  setTheme: (theme: ThemeColorsVariables) => void
  other: ThemeOtherVariables
  setOther: (other: ThemeOtherVariables) => void
  isDark: boolean
  setIsDark: (isDark: boolean) => void
  baseHue: number
  setBaseHue: (baseHue: number) => void
  saturation: number
  setSaturation: (saturation: number) => void
  scheme: ColorScheme
  setScheme: (scheme: ColorScheme) => void
  colors: ColorVariables
  setColors: (colors: ColorVariables) => void
  lockedColors: Set<string>
  setLockedColors: (lockedColors: Set<string>) => void
  toggleColorLock: (colorKey: string) => void
  handleColorChange: (colorKey: string, newColor: string) => void
  handleOtherChange: (variable: string, value: string) => void
  regenerateTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColors, setThemeColors] =
    useState<ThemeColorsVariables>(initialThemeColors)
  const [themeOtherVariables, setThemeOtherVariables] =
    useState<ThemeOtherVariables>(initialThemeOther)
  const [isDark, setIsDarkState] = useState<boolean>(false)
  const [baseHue, setBaseHueState] = useState<number>(0)
  const [saturation, setSaturationState] = useState<number>(
    randomInteger(30, 90)
  )
  const [scheme, setSchemeState] = useState<ColorScheme>(ColorScheme.Triadic)
  const [colors, setColors] = useState<ColorVariables>(
    generateThemeColors(isDark, baseHue, saturation, scheme).colors
  )
  const [lockedColors, setLockedColors] = useState<Set<string>>(new Set())

  const updateThemeColors = useCallback((newColors: ColorVariables) => {
    const newThemeColors = {
      '--background': newColors.BG,
      '--foreground': newColors.FG,
      '--card': newColors.Card,
      '--card-foreground': newColors.CardFG,
      '--popover': newColors.Popover,
      '--popover-foreground': newColors.PopoverFG,
      '--primary': newColors.Primary,
      '--primary-foreground': newColors.PrimaryFG,
      '--secondary': newColors.Secondary,
      '--secondary-foreground': newColors.SecondaryFG,
      '--muted': newColors.Muted,
      '--muted-foreground': newColors.MutedFG,
      '--accent': newColors.Accent,
      '--accent-foreground': newColors.AccentFG,
      '--destructive': newColors.ErrorBG,
      '--destructive-foreground': newColors.IEWSFG,
      '--border': newColors.Border,
      '--input': newColors.Input,
      '--ring': newColors.Ring,
    }
    setThemeColors(newThemeColors)

    var r = document.querySelector(':root') as any
    Object.entries(newThemeColors).forEach(([key, value]) => {
      r.style.setProperty(key, hexToHSL(value, 'string'))
    })
  }, [])

  const updateThemeOthers = useCallback(
    (newOtherVariables: ThemeOtherVariables) => {
      setThemeOtherVariables(
        (prevThemeOtherVariables: ThemeOtherVariables) => ({
          ...prevThemeOtherVariables,
          ...newOtherVariables,
        })
      )
    },
    []
  )

  const generateColors = useCallback(
    (
      isDark: boolean,
      baseHue: number,
      uiSaturation: number,
      scheme: ColorScheme,
      lockedColors: Set<string>
    ) => {
      const { colors: newColors } = generateThemeColors(
        true,
        baseHue,
        uiSaturation,
        scheme,
        Object.fromEntries(
          Object.entries(colors).filter(([key]) => lockedColors.has(key))
        ) as Partial<ColorVariables>
      )

      updateThemeColors(newColors)
      setColors(newColors)
    },
    [colors, updateThemeColors]
  )

  const updateColorsWithSaturation = useCallback(
    (saturation: number) => {
      setColors((prevColors) => {
        const newColors = updateThemeColorsWithSaturation(
          prevColors,
          saturation,
          lockedColors
        )
        updateThemeColors(newColors)
        return newColors
      })
    },
    [lockedColors, updateThemeColors]
  )

  const regenerateTheme = useCallback(() => {
    const newBaseHue = randomInteger(0, 360)
    const newSaturation = randomInteger(0, 100)
    const schemeValues = Object.values(ColorScheme).filter(
      (value) => typeof value === 'number'
    ) as number[]
    const newScheme = schemeValues[
      Math.floor(Math.random() * schemeValues.length)
    ] as ColorScheme
    const newColors = generateColors(
      isDark,
      newBaseHue,
      newSaturation,
      newScheme,
      lockedColors
    )
    return newColors
  }, [generateColors, isDark, lockedColors])

  const toggleColorLock = useCallback((colorKey: string) => {
    setLockedColors((prevLockedColors) => {
      const newLockedColors = new Set(prevLockedColors)
      newLockedColors.has(colorKey)
        ? newLockedColors.delete(colorKey)
        : newLockedColors.add(colorKey)
      setLockedColors(newLockedColors)
      return newLockedColors
    })
  }, [])

  const handleColorChange = useCallback(
    (colorKey: string, newColor: string) => {
      setColors((prevColors) => {
        const newColors: ColorVariables = { ...prevColors }
        newColors[colorKey as keyof ColorVariables] = newColor
        updateThemeColors(newColors)
        return newColors
      })
    },
    [updateThemeColors]
  )

  const handleOtherChange = useCallback((variable: string, value: string) => {
    setThemeOtherVariables((prev: ThemeOtherVariables) => ({
      ...prev,
      [variable]: value,
    }))
    var r = document.querySelector(':root') as any
    r.style.setProperty(variable, value)
  }, [])

  const setScheme = useCallback(
    (value: ColorScheme) => {
      setSchemeState(value)
      generateColors(isDark, baseHue, saturation, value, lockedColors)
    },
    [baseHue, generateColors, isDark, lockedColors, saturation]
  )

  const setIsDark = useCallback(
    (value: boolean) => {
      setIsDarkState(value)
      generateColors(value, baseHue, saturation, scheme, lockedColors)
    },
    [baseHue, generateColors, lockedColors, saturation, scheme]
  )

  const setBaseHue = useCallback(
    (value: number) => {
      setBaseHueState(value)
      generateColors(isDark, value, saturation, scheme, lockedColors)
    },
    [generateColors, isDark, lockedColors, saturation, scheme]
  )

  const setSaturation = useCallback(
    (value: number) => {
      setSaturationState(value)
      updateColorsWithSaturation(value)
    },
    [updateColorsWithSaturation]
  )

  const value = {
    theme: themeColors,
    setTheme: setThemeColors,
    other: themeOtherVariables,
    setOther: setThemeOtherVariables,
    isDark,
    setIsDark,
    baseHue,
    setBaseHue,
    saturation,
    setSaturation,
    scheme,
    setScheme,
    colors,
    setColors,
    lockedColors,
    setLockedColors,
    toggleColorLock,
    handleColorChange,
    regenerateTheme,
    handleOtherChange,
    updateThemeColors,
    updateThemeOthers,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
