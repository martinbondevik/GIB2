import Link from "next/link";
import React from "react";
import {
  UnorderedList,
  Flex,
  Image,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="#ec8936">
      <HStack align="center" justifyContent="center">
        <Link href={"/"}>
          <a>
            <Heading padding="10px" color="white">
              Hjem
            </Heading>
          </a>
        </Link>
        <Link href={"/findtickets"}>
          <a>
            <Heading padding="10px" color="white">
              Finn turer
            </Heading>
          </a>
        </Link>
        <Link href={"/messages"}>
          <a>
            <Heading padding="10px" color="white">
              Mine turer
            </Heading>
          </a>
        </Link>
        <Link href={"/profile"}>
          <a>
            <Heading padding="10px" color="white">
              Min profil
            </Heading>
          </a>
        </Link>
        <Link href={"/logout"}>
          <a>
            <Heading padding="10px" color="white">
              Logg ut
            </Heading>
          </a>
        </Link>
      </HStack>
    </Box>
  );
};

export default Header;
