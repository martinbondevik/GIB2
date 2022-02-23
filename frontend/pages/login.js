import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { redirectIfLogged } from "../utils/auth";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Alert,
  Text,
  AlertIcon,
  Link,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] = useState();
  const toast = useToast();

  useEffect(() => {
    Object.keys(error).length != 0 ? setIsError(true) : setError(false);
    Object.keys(error).length != 0 &&
      toast({
        title: error.message,
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
  }, [error]);

  const handleSubmit = async (e) => {
    setSubmitted(true);

    if (username.length == 0) {
      setError({ message: "Please enter your username or email" });
      setSubmitted(false);

      return;
    }

    if (password.length == 0) {
      setError({ message: "Please enter your password" });
      setSubmitted(false);
      return;
    }

    await authenticateUser();
  };

  const authenticateUser = async (e) => {
    const body = {
      identifier: username,
      password: password,
    };

    const req = await axios.post("/api/login", body);

    const success = req.data.jwt != null;

    if (success) {
      setError({});
      router.push("/");
      toast({
        title: "Successfully logged in!",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    setSubmitted(false);

    const apiError =
      req.data.message == "Invalid identifier or password" ? "Invalid username or password" : req.data.message;

    setError({ message: apiError });
  };

  return (
    <Flex minH={"81vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features✌️
          </Text>
        </Stack>

        <Alert status="warning" visibility={isError ? "visible" : "hidden"}>
          <AlertIcon />
          {isError && error.message}
        </Alert>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} pt={0}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username or email</FormLabel>
              <Input type="email" onChange={handleUsername} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handlePassword} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={submitted}
                bg={"teal.500"}
                color={"white"}
                _hover={{
                  bg: "teal.600",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
            <Stack align={"center"} mt={0}>
              <Text>
                New here?{" "}
                <Link href={"/register"} color={"blue.500"}>
                  Create a new account
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export async function getServerSideProps(ctx) {
  return redirectIfLogged(ctx);
}

export default Login;
