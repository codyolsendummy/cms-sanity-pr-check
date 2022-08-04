import Head from 'next/head'

const config: any = {}

export default function StudioPage() {
  return (
    <>
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
    </>
  )
}
