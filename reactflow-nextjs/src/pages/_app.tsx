import type { AppProps } from 'next/app';

import '../styles/globals.css';
import 'reactflow/dist/style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
