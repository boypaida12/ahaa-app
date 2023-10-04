/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../assets/logo_white.png";
import "../fonts/fonts.css";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../config/firebase";

const LoginPage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = login;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(login);
    setIsLoading(true);
    try {
      await signIn(email, password);
      setLogin({
        email: "",
        password: "",
      });
      toast({
        description: "Successfully Logged-in",
        duration: 5000,
        status: "success",
        variant: "left-accent",
        colorScheme: "blue",
      });
    } catch (error) {
      toast({
        title: "User Not Found",
        description:
          "Please Login with the correct credentials or Click on Sign up to Register",
        duration: 5000,
        status: "error",
        variant: "left-accent",
        colorScheme: "red",
      });
      setError(true);
    }
    setIsLoading(false);
    navigate({ pathname: "/" });
  };

  return (
    <Flex
      bgGradient="linear(to-r, #1E63E1 50%, #fff 50%)"
      minH="100vh"
      justify="center"
      align="center"
    >
      <Flex
        rounded="3xl"
        shadow="dark-lg"
        padding={5}
        width={980}
        mx={{ base: 2, lg: 0 }}
        bg={{base: "#f6f6f6", lg: "transparent"}}
      >
        <Flex
          w="50%"
          align="start"
          justify="center"
          flexDir="column"
          color="#fff"
          display={{ base: "none", lg: "flex" }}
        >
          <Box mx="auto">
            <Flex align="center" gap={10}>
              <Heading textTransform="uppercase">Log in</Heading>
              <Icon as={BsArrowRight} fontSize="2xl" />
            </Flex>
            <Text fontSize="xl">
              Your favorite attendance management system
            </Text>
          </Box>
        </Flex>
        <Flex flexDir="column" className="right-side" mx="auto" my={5} gap={5}>
          <Box className="logo" textAlign="center">
            <Img src={logo} alt="Ahaa Logo" />
            <Text fontSize="sm" fontWeight="semibold" color={{base: "gray.600", lg: "gray.400"}}>
              Hello! Welcome back.
            </Text>
          </Box>
          <Box as="form" onSubmit={handleSubmit}>
            <FormLabel
              color={{base: "gray.700", lg: "gray.600"}}
            >
              Email address
            </FormLabel>
            <InputGroup mb={5}>
              <InputLeftElement pointerEvents="none">
                <Icon as={MdEmail} color="#1E63E1" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email address"
                borderColor="gray.300"
                bg="#fff"
                shadow="lg"
                _placeholder={{ fontSize: "xs" }}
              />
            </InputGroup>
            <FormLabel
              color={{base: "gray.700", lg: "gray.600"}}
            >
              Password
            </FormLabel>
            <InputGroup mb={5}>
              <InputLeftElement pointerEvents="none">
                <Icon as={GoPasskeyFill} color="#1E63E1" />
              </InputLeftElement>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                borderColor="gray.300"
                bg="#fff"
                shadow="lg"
                _placeholder={{ fontSize: "xs" }}
              />
            </InputGroup>
            <Flex fontSize="sm" justify="space-between">
              <HStack fontWeight={{base: "bold", lg: "normal"}}>
                <Checkbox defaultChecked size="sm">
                  Remember me
                </Checkbox>
              </HStack>
              <Text as={Link} color="#1E63E1" fontWeight="bold">
                Reset Password
              </Text>
            </Flex>
            <Button
              variant="solid"
              bg="#1E63E1"
              shadow={{ base: "lg", lg: "none" }}
              color="#fff"
              w="full"
              my={5}
              _hover={{ bg: "#1E63E1" }}
              isLoading={isLoading}
              type="submit"
            >
              Log in
            </Button>
            <Text fontWeight={{base: "bold", lg: "normal"}}>
              {"Don't have an account? "}
              <Text as={Link} to="/signup" color="#1E63E1" fontWeight="bold">
                Sign Up
              </Text>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
