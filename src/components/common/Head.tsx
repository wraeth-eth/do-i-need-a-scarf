import { GoogleMapsScript } from './GoogleMapsScript'
import { SEO } from './SEO'

export function Head() {
  return (
    <SEO>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <GoogleMapsScript />
    </SEO>
  )
}
