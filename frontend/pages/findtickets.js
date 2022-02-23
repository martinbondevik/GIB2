import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Post from '../components/Post';

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Spacer,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";


const Findtickets = ({posts}) => {
  const router = useRouter()

  
  return (
    <>
    <Flex align = 'right'  >
        
        {posts.data.map((post) => (<><Spacer /><Post data={post} /><Spacer /></>))}
        
    </Flex>
    </>
  );
};

export const getServerSideProps = async (ctx) => {

    const data = await fetch("http://localhost:1337/api/tickets");
    const res = await data.json();

    return {
        props: {
            posts: res
        }
    }

    

}

export default Findtickets;
