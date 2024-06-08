import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from "@mui/material"
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <HelmetProvider>
      <CssBaseline/> 
      <div onContextMenu = {(e) => {e.preventDefault()}}>
        <App />
      </div>
    </HelmetProvider>
  </Provider>,
)

// CssBaseline is used to give default CSS in an application

/*
  The Provider component from react-redux is used to supply the Redux store to your entire React application.
  This enables any component within the application to access the store and dispatch actions, making it 
  easier to manage and share state across the application.

  We don't need to manually pass down the store.
  It uses React Context API to pass the store.

  Components are connected using connect function or useSelector or useDispatch hooks
*/

/*
  It allows you to control the contents of the <head> section of your HTML document, such as the title, meta
  tags, and other head elements, in a way that integrates seamlessly with server-side rendering (SSR) and 
  asynchronous operations.

  Helmet: Inside components, you use Helmet to define head elements like the page title and meta tags.
*/
