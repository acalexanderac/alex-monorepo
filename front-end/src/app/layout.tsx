import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Alumnos',
  description: 'Sistema de gestión de alumnos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 