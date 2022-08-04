import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

import config from 'sanity.config'
import {Studio, defaultTheme} from 'sanity'

// Use the same bg colors as the studio
const lightBg = defaultTheme.color.light.default.base.bg
const darkBg = defaultTheme.color.dark.default.base.bg

const StudioStyle = createGlobalStyle`
html {
  background-color: ${lightBg};
  @media (prefers-color-scheme: dark) {
    background-color: ${darkBg};
  }
}
html,
body,
#__next {
  height: 100%;
}
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}`

export default function StudioPage() {
  return (
    <>
    <Studio config={config} />
      <h1>Hi from studio!</h1>
      <Head>
        {/* Studio implements display cutouts CSS (The iPhone Notch ™ ) and needs `viewport-fit=covered` for it to work correctly */}
        <meta
          name="viewport"
          content="width=device-width, viewport-fit=cover"
        />
        {/* These theme-color tags makes the Studio look really really good on devices like iPads as the browser chrome adopts the Studio background */}
        <meta
          key="theme-color-light"
          name="theme-color"
          content={config.theme?.color.light.default.base.bg || '#ffffff'}
          media="(prefers-color-scheme: light)"
        />
        <meta
          key="theme-color-dark"
          name="theme-color"
          content={config.theme?.color.dark.default.base.bg || '#101112'}
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <StudioStyle />
    </>
  )
}
