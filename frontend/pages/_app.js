import { ChakraProvider } from '@chakra-ui/react'
import Header from "../components/Header";
import Footer from "../components/Footer";



function MyApp({ Component, pageProps }) {


  return (
    <>
    { <Header /> } 
  
       <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>

      { <Footer /> } 
    </>
  );
}

export default MyApp;
