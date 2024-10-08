import type { AppProps } from 'next/app';
import StoreProvider from '@/redux/StoreProvider';
import '@/app/styles/normalize.scss';
import '@/app/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
