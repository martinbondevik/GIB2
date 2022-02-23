import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  InputGroup,
  HStack,
  InputLeftElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  NumberInputField,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SignupCard() {
  const [isDisabled, setIsDisabled] = useState(true);

  const [ticketName, setTicketName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [forSale, setForSale] = useState(true);

  const handleTicketName = (e) => {
    setTicketName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleForSale = (e) => {
    setForSale(e.target.value);
  };

  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] = useState();
  const toast = useToast();

  const handleSubmit = async () => {
    setSubmitted(true);

    if (ticketName.length == 0) {
      setError({ message: "Please enter the name of the ticket" });
      setSubmitted(false);
      return;
    }

    if (description.length == 0) {
      setError({ message: "Please enter a description" });
      setSubmitted(false);
      return;
    }

    if (price.length == 0) {
      setError({ message: "Please enter a price for the ticket" });
      setSubmitted(false);
      return;
    }

    if (location.length == 0) {
      setError({ message: "Please enter a location" });
      setSubmitted(false);
      return;
    }

    await createPost();
  };

  const createPost = async () => {
    const body = {
      data: {
        location: location,
        name: ticketName,
        price: price,
        forSale: forSale,
        description: description,
        time: new Date(),
      },
    };

    const req = await axios.post("/api/create_post", body);

    const success = req != null;

    if (success) {
      setError({});
      setSubmitted(false);
      toast({
        title: "Listing posted successfully!",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    setSubmitted(false);
    setError({ message: rec.message });
  };

  useEffect(() => {
    if (ticketName.length != 0 && description.length != 0 && price.length != 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [ticketName, description, price]);

  return (
    <Flex minH={"30vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Upload your Ticker
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to sell or buy a ticket
          </Text>
        </Stack>

        <Alert status="warning" visibility={isError ? "visible" : "hidden"}>
          <AlertIcon />
          {isError && error.message}
        </Alert>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Ticket name</FormLabel>
                  <Input type="text" onChange={handleTicketName} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Location</FormLabel>
                  <Input type="text" onChange={handleLocation} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Description</FormLabel>
              <Input type="email" onChange={handleDescription} />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="price" isRequired>
                  <FormLabel>Price</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    ></InputLeftElement>
                    <NumberInput>
                      <NumberInputField onChange={handlePrice} textAlign="center" />
                    </NumberInput>
                  </InputGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="type" isRequired>
                  <FormLabel>Type</FormLabel>
                  <InputGroup>
                    <Select onChange={handleForSale}>
                      <option value={true}>For sale</option>
                      <option value={false}>Wants to buy</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="type" isRequired>
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                    <Select>
                      <option value="option1">1</option>
                      <option value="option2">2</option>
                      <option value="option3">3</option>
                      <option value="option4">4</option>
                      <option value="option5">5</option>
                      <option value="option6">6</option>
                      <option value="option7">7</option>
                      <option value="option8">8</option>
                      <option value="option9">9</option>
                      <option value="option10">10</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </Box>
            </HStack>
            <Stack pt={2}>
              <Button
                loadingText="Uploading ticket"
                size="lg"
                bg={"#67BEBF"}
                color={"white"}
                _hover={{
                  bg: "#285E61",
                }}
                onClick={handleSubmit}
                isDisabled={isDisabled}
                isLoading={submitted}
              >
                Upload ticket
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
