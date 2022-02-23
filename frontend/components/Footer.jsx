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

const Footer = () => {
  return (
    <Box bg="#67BEBF">
      <HStack align="center" justifyContent="center">
        <a>
          <img src="/logo.png" width="300px" />
        </a>
      </HStack>
    </Box>
  );
};

export default Footer;
