import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n'
import leoProfanity from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import rollbarConfig from './rollbarConfig'

leoProfanity.loadDictionary('ru')
leoProfanity.add(leoProfanity.getDictionary('en'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </StrictMode>,
)
