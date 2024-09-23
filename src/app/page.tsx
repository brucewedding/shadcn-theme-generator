import { PreviewComponent } from '@/components/Preview'
import { ThemeGeneratorControls } from '@/components/ThemeGeneratorControls'
import { ThemeProvider } from '@/contexts/ThemeContext'

function ThemeGenerator() {
  return (
    <section className="p-4">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Shadcn/ui Theme Generator</h1>

        <section className="grid grid-cols-1 md:grid-cols-12 w-full gap-4">
          <div className="md:col-span-9">
            <PreviewComponent />
          </div>
          <div className="md:col-span-3">
            <ThemeGeneratorControls />
          </div>
        </section>
      </main>
    </section>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <ThemeGenerator />
    </ThemeProvider>
  )
}
