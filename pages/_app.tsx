import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider>
      <Head>
        <title>CNH Chat App</title>
        <meta name="description" content="Cloud Native Hackathon 2021 Project" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
