import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { redirectIfLogged } from "../utils/auth";
import {
  Link,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Alert,
  Text,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { validateEmail } from "../utils/validation";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
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

    if (username.length < 3) {
      setError({ message: "Username is too short. Minimum 3 characters." });
      setSubmitted(false);
      return;
    }

    if (!validateEmail(email)) {
      setError({ message: "Email is not valid" });
      setSubmitted(false);
      return;
    }

    if (password.length < 6) {
      setError({ message: "Password has to be at least 6 characters long" });
      setSubmitted(false);
      return;
    }

    await newUser();
  };

  const newUser = async (e) => {
    const body = {
      username: username,
      email: email,
      password: password,
    };

    const req = await axios.post("/api/register", body);

    const success = req.data.jwt != null;

    if (success) {
      setError({});
      router.push("/");
      toast({
        title: "Welcome! Account created successfully!",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    setSubmitted(false);

    const apiError =
      req.data.message == "An error occurred during account creation" ? "Username is already taken" : req.data.message;

    setError({ message: apiError });
  };

  return (
    <>
      <Flex minH={"81vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Register a new account</Heading>
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
              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" type="text" onChange={handleUsername} placeholder="Username" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={handleEmail} placeholder="Email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" onChange={handlePassword} placeholder="Password" />
              </FormControl>
              <Stack spacing={10} mt={5}>
                <Button colorScheme="teal" isLoading={submitted} onClick={handleSubmit} variant="solid">
                  Register
                </Button>
              </Stack>
            </Stack>
            <Stack align={"center"} mt={4}>
              <Text>
                Already have an account?{" "}
                <Link href={"/login"} color={"blue.500"}>
                  Sign in here
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return redirectIfLogged(ctx);
}

export default Register;
