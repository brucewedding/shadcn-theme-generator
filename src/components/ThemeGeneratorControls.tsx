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

import { useTheme } from '@/contexts/ThemeContext'

export function ThemeGeneratorControls() {
  const {
    themeColors,
    themeOtherVariables,
    lockedColors,
    setLockedColors,
    toggleColorLock,
    regenerateTheme,
    handleColorChange,
    handleOtherChange,
  } = useTheme()

  const randomizeTheme = () => {
    regenerateTheme()
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
