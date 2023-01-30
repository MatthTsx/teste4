import '@/styles/globals.css'
import Header from './Header'
import LogButton from './LogButton'
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>
          <Header><LogButton/></Header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
