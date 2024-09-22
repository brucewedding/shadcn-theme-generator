import { randomInteger } from './math'
import {
  adjustMutedColor,
  ensureReadability,
  generateSchemeColors,
} from './color'
import Color from 'color'
import { ColorScheme } from '../types/schemes'
import type { ColorVariables } from '@/lib/types/colors'

export function generateThemeColors(
  isDark: boolean,
  baseHue: number,
  uiSaturation: number = 65,
  scheme: ColorScheme = ColorScheme.Triadic,
  lockedColors: Partial<ColorVariables> = {}
): {
  colors: ColorVariables
} {
  const schemeHues = generateSchemeColors(baseHue, scheme)

  const bgBase = isDark ? randomInteger(0, 7) : randomInteger(93, 100)
  const fgBaseDark = randomInteger(95, 100)
  const fgBaseLight = randomInteger(0, 11)

  const baseValues = {
    BG: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.1,
      lightness: isDark
        ? bgBase + randomInteger(0, 9)
        : bgBase - randomInteger(0, 7),
    },
    Card: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.15,
      lightness: isDark
        ? bgBase + randomInteger(3, 9)
        : bgBase - randomInteger(5, 11),
    },
    Popover: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.2,
      lightness: isDark
        ? bgBase + randomInteger(6, 12)
        : bgBase - randomInteger(7, 13),
    },
    Primary: {
      hue: baseHue,
      saturation: uiSaturation,
      lightness: isDark ? randomInteger(30, 60) : randomInteger(40, 70),
    },
    Secondary: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 1.1,
      lightness: isDark ? randomInteger(60, 70) : randomInteger(30, 40),
    },
    Muted: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.1,
      lightness: isDark ? randomInteger(40, 50) : randomInteger(50, 60),
    },
    Accent: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 1.2,
      lightness: randomInteger(15, 90),
    },
    InfoBG: {
      hue: 210,
      saturation: uiSaturation,
      lightness: isDark ? randomInteger(50, 85) : randomInteger(40, 75),
    },
    ErrorBG: {
      hue: 0,
      saturation: uiSaturation * 1.2,
      lightness: isDark ? randomInteger(40, 65) : randomInteger(35, 55),
    },
    WarningBG: {
      hue: 30,
      saturation: uiSaturation * 0.8,
      lightness: isDark ? randomInteger(50, 85) : randomInteger(40, 75),
    },
    SuccessBG: {
      hue: 120,
      saturation: uiSaturation * 0.9,
      lightness: isDark ? randomInteger(50, 85) : randomInteger(40, 75),
    },
    Border: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.55,
      lightness: randomInteger(15, 90),
    },
    Input: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.45,
      lightness: randomInteger(15, 90),
    },
    Ring: {
      hue: randomInteger(0, schemeHues.length - 1),
      saturation: uiSaturation * 0.6,
      lightness: randomInteger(15, 90),
    },
  }

  const generateColor = (
    hue: number,
    saturation: number,
    lightness: number
  ) => {
    const randomHueShift = Math.random() * 10 - 5 // -5 to +5
    const randomSaturationShift = Math.random() * 10 - 5 // -5 to +5
    const randomLightnessShift = Math.random() * 10 - 5 // -5 to +5

    hue = (hue + randomHueShift + 360) % 360
    saturation = Math.max(0, Math.min(100, saturation + randomSaturationShift))
    lightness = Math.max(0, Math.min(100, lightness + randomLightnessShift))

    const color = Color.hsl(hue, saturation, lightness).hex()
    return color
  }

  const bgColors: Partial<ColorVariables> = {
    BG: generateColor(
      baseValues.BG.hue,
      baseValues.BG.saturation,
      baseValues.BG.lightness
    ),
    Card: generateColor(
      baseValues.Card.hue,
      baseValues.Card.saturation,
      baseValues.Card.lightness
    ),
    Popover: generateColor(
      baseValues.Popover.hue,
      baseValues.Popover.saturation,
      baseValues.Popover.lightness
    ),
    Primary: generateColor(
      baseValues.Primary.hue,
      baseValues.Primary.saturation,
      baseValues.Primary.lightness
    ),
    Secondary: generateColor(
      baseValues.Secondary.hue,
      baseValues.Secondary.saturation,
      baseValues.Secondary.lightness
    ),
    Muted: generateColor(
      baseValues.Muted.hue,
      baseValues.Muted.saturation,
      baseValues.Muted.lightness
    ),
    Accent: generateColor(
      baseValues.Accent.hue,
      baseValues.Accent.saturation,
      baseValues.Accent.lightness
    ),
    InfoBG: generateColor(
      baseValues.InfoBG.hue,
      baseValues.InfoBG.saturation,
      baseValues.InfoBG.lightness
    ),
    ErrorBG: generateColor(
      baseValues.ErrorBG.hue,
      baseValues.ErrorBG.saturation,
      baseValues.ErrorBG.lightness
    ),
    WarningBG: generateColor(
      baseValues.WarningBG.hue,
      baseValues.WarningBG.saturation,
      baseValues.WarningBG.lightness
    ),
    SuccessBG: generateColor(
      baseValues.SuccessBG.hue,
      baseValues.SuccessBG.saturation,
      baseValues.SuccessBG.lightness
    ),
    Border: generateColor(
      baseValues.Border.hue,
      baseValues.Border.saturation,
      baseValues.Border.lightness
    ),
    Input: generateColor(
      baseValues.Input.hue,
      baseValues.Input.saturation,
      baseValues.Input.lightness
    ),
    Ring: generateColor(
      baseValues.Ring.hue,
      baseValues.Ring.saturation,
      baseValues.Ring.lightness
    ),
  }

  const fgColors: Partial<ColorVariables> = {
    FG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.3,
      Color(bgColors.BG).isDark()
        ? fgBaseDark - randomInteger(0, 12)
        : fgBaseLight + randomInteger(0, 10)
    ),
    CardFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.15,
      Color(bgColors.Card).isDark()
        ? fgBaseDark - randomInteger(0, 9)
        : fgBaseLight + randomInteger(0, 7)
    ),
    PopoverFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.25,
      Color(bgColors.Popover).isDark()
        ? fgBaseDark - randomInteger(0, 15)
        : fgBaseLight + randomInteger(0, 15)
    ),
    PrimaryFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.1,
      Color(bgColors.Primary).isDark()
        ? fgBaseDark - randomInteger(0, 5)
        : fgBaseLight + randomInteger(0, 5)
    ),
    SecondaryFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.2,
      Color(bgColors.Secondary).isDark()
        ? fgBaseDark - randomInteger(0, 5)
        : fgBaseLight + randomInteger(0, 5)
    ),
    MutedFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.45,
      Color(bgColors.Muted).isDark()
        ? randomInteger(50, 70)
        : randomInteger(30, 50)
    ),
    AccentFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.15,
      Color(bgColors.Accent).isDark()
        ? fgBaseDark - randomInteger(0, 5)
        : fgBaseLight + randomInteger(0, 5)
    ),
    IEWSFG: generateColor(
      schemeHues[randomInteger(0, schemeHues.length - 1)],
      uiSaturation * 0.1,
      Color(bgColors.ErrorBG).isDark()
        ? fgBaseDark - randomInteger(0, 7)
        : fgBaseLight + randomInteger(0, 5)
    ),
  }

  // Combine background and foreground colors, ensuring all properties are defined
  const colors: ColorVariables = {
    ...Object.fromEntries(
      Object.entries(bgColors).map(([key, value]) => [key, value ?? ''])
    ),
    ...Object.fromEntries(
      Object.entries(fgColors).map(([key, value]) => [key, value ?? ''])
    ),
  } as ColorVariables

  // Ensure readability for specific colors
  colors.FG = ensureReadability(colors.FG, colors.BG, 5.5)
  colors.CardFG = ensureReadability(colors.CardFG, colors.Card, 5.5)
  colors.PopoverFG = ensureReadability(colors.PopoverFG, colors.Popover, 5.5)
  colors.PrimaryFG = ensureReadability(colors.PrimaryFG, colors.Primary, 5.5)
  fgColors.SecondaryFG = ensureReadability(
    colors.SecondaryFG,
    colors.Secondary,
    5.5
  )
  colors.AccentFG = ensureReadability(colors.AccentFG, colors.Accent, 5.5)
  colors.IEWSFG = ensureReadability(colors.IEWSFG, colors.ErrorBG, 5.5)

  colors.MutedFG = adjustMutedColor(colors.MutedFG, colors.Muted, 1.5, 2.5)

  return { colors }
}

export function updateThemeColorsWithSaturation(
  currentColors: ColorVariables,
  newUiSaturation: number,
  lockedColors: Set<string>
): ColorVariables {
  const updateColorSaturation = (
    color: string,
    saturationMultiplier: number
  ) => {
    const hsl = Color(color).hsl()
    const newSaturation = Math.min(100, newUiSaturation * saturationMultiplier)
    return Color.hsl(hsl.hue(), newSaturation, hsl.lightness()).hex()
  }

  const updatedColors: ColorVariables = { ...currentColors }

  const saturationMultipliers = {
    BG: 0.1,
    FG: 0.45,
    Card: 0.15,
    CardFG: 0.45,
    Popover: 0.2,
    PopoverFG: 0.05,
    Primary: 1.2,
    PrimaryFG: 0.45,
    Secondary: 1.1,
    SecondaryFG: 0.2,
    Muted: 0.1,
    MutedFG: 0.45,
    Accent: 1.2,
    AccentFG: 0.45,
    Border: 0.45,
    Input: 0.45,
    Ring: 0.45,
    InfoBG: 0.2,
    ErrorBG: 1.2,
    WarningBG: 1.1,
    SuccessBG: 0.9,
    IEWSFG: 0.45,
  }

  Object.keys(updatedColors).forEach((key) => {
    if (!lockedColors.has(key)) {
      updatedColors[key as keyof ColorVariables] = updateColorSaturation(
        currentColors[key as keyof ColorVariables],
        saturationMultipliers[key as keyof typeof saturationMultipliers]
      )
    }
  })

  return updatedColors
}
