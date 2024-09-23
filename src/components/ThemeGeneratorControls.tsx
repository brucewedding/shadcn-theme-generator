'use client'

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { useTheme } from '@/contexts/ThemeContext'
import { ColorScheme } from '@/lib/types/schemes'
import { randomInteger } from '@/lib/utils/math'

export function ThemeGeneratorControls() {
  const {
    themeColors,
    themeOtherVariables,
    lockedColors,
    setLockedColors,
    toggleColorLock,
    generateColors,
    handleColorChange,
    handleOtherChange,
    baseHue,
    setBaseHue,
    setBaseHueState,
    saturation,
    setSaturation,
    setSaturationState,
    scheme,
    setScheme,
    setSchemeState,
    isDark,
    setIsDark,
  } = useTheme()

  const randomizeTheme = () => {
    const newBaseHue = randomInteger(0, 360)
    const newSaturation = randomInteger(0, 100)
    const schemeValues = Object.values(ColorScheme) as string[]
    const newScheme = schemeValues[
      Math.floor(Math.random() * schemeValues.length)
    ] as ColorScheme
    generateColors(isDark, newBaseHue, newSaturation, newScheme, lockedColors)
    setBaseHueState(newBaseHue)
    setSaturationState(newSaturation)
    setSchemeState(newScheme)
  }

  const ExportTheme = () => {
    const radius = '--radius'
    const { [radius]: radiusValue, ...tailwind } = themeOtherVariables
    const themeCode = {
      css: {
        ...themeColors,
        [radius]: radiusValue,
      },
      tailwind: tailwind,
    }
    return JSON.stringify(themeCode, null, 2)
  }

  return (
    <section className="flex flex-col items-end">
      <Tabs defaultValue="controls" className="w-full">
        <TabsList>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="controls">
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="generation">
                <AccordionTrigger>Generation Controls</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-4 flex items-center gap-4">
                    <Switch
                      id="isDark"
                      checked={isDark}
                      onCheckedChange={(checked) => setIsDark(checked)}
                    />
                    <Label htmlFor="isDark">Dark Mode</Label>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="hue">Hue</Label>
                    <Slider
                      id="hue"
                      value={[baseHue]}
                      onValueChange={(value) => setBaseHue(value[0])}
                      max={360}
                      step={1}
                    />
                    <div
                      className="h-2 mt-2 rounded"
                      style={{
                        background: `linear-gradient(to right, 
                          hsl(0, 100%, 50%), 
                          hsl(60, 100%, 50%), 
                          hsl(120, 100%, 50%), 
                          hsl(180, 100%, 50%), 
                          hsl(240, 100%, 50%), 
                          hsl(300, 100%, 50%), 
                          hsl(360, 100%, 50%))`,
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="saturation">Saturation</Label>
                    <Slider
                      id="saturation"
                      value={[saturation]}
                      onValueChange={(value) => setSaturation(value[0])}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="scheme">Color Scheme</Label>
                    <Select
                      value={scheme}
                      onValueChange={(value) => setScheme(value as ColorScheme)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ColorScheme).map((scheme) => (
                          <SelectItem key={scheme} value={scheme}>
                            {scheme}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="colors">
                <AccordionTrigger>Color Variables</AccordionTrigger>
                <AccordionContent>
                  {Object.keys(themeColors).map((variable) => (
                    <div key={variable} className="mb-4">
                      <Label htmlFor={variable}>{variable}</Label>
                      <div className="flex items-center space-x-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[80px] h-[40px] p-0"
                              style={{ backgroundColor: themeColors[variable] }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <HexColorPicker
                              color={themeColors[variable]}
                              onChange={(color) =>
                                handleColorChange(variable, color)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <Input
                          id={variable}
                          value={themeColors[variable]}
                          onChange={(e) =>
                            handleColorChange(variable, e.target.value)
                          }
                          className="w-[100px]"
                        />
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="other">
                <AccordionTrigger>Other Variables</AccordionTrigger>
                <AccordionContent>
                  {Object.keys(themeOtherVariables).map((variable) => (
                    <div key={variable} className="mb-4">
                      <Label htmlFor={variable}>{variable}</Label>
                      <Input
                        id={variable}
                        value={themeOtherVariables[variable]}
                        onChange={(e) =>
                          handleOtherChange(variable, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="code">
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <pre className="text-sm">
              <ExportTheme />
            </pre>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <Button onClick={randomizeTheme} className="mt-4">
        Randomize Colors
      </Button>
    </section>
  )
}
