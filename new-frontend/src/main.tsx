import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/apollo'
import { ThemeProvider } from "@/components/providers/theme-provider"
import App from './App.tsx'
import './index.css'
import '@/lib/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)