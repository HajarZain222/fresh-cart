import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/WishlistContext.jsx';

const client = new QueryClient()
  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
      <UserContextProvider >
        <CartContextProvider>
          <WishlistContextProvider>
            <Toaster/>
              <App />
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
