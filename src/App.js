import { ThemeProvider } from 'react-jss'
import { useSelector } from 'react-redux'
import { getAppTheme } from './theme'
import { selectTheme } from './store/slices/app'
import AppRoutes from './routes'

const App = () => {
  const themeName = useSelector(selectTheme)

  return (
      <ThemeProvider theme={getAppTheme({ name: themeName })}>
          <AppRoutes />
      </ThemeProvider>
  )
}

export default App
