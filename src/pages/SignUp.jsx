/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../assets/logo_white.png";
import "../fonts/fonts.css";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db, signUp } from "../config/firebase";

const LoginPage = () => {
  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { email, password, role } = registerUser;
  const toast = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsLoading(true);
      try {
        const res = await signUp(email, password);
        setDoc(doc(db, "users", res.user.uid), {
          ...registerUser,
          timeStamp: serverTimestamp(),
        });
        setRegisterUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          countryCode: "",
          telephone: "",
        });
        toast({
          description: "Successfully Registered",
          duration: 3000,
          status: "success",
          colorScheme: "green",
        });
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
      navigate({ pathname: "/students" });
    }

  return (
    <Flex
      bgGradient="linear(to-r, #1E63E1 50%, #fff 50%)"
      minH="100vh"
      justify="center"
      align="center"
    >
      <Flex rounded="3xl" shadow="dark-lg" padding={5} width={980} mx={{ base: 2, lg: 0 }} bg={{base: "#f6f6f6", lg: "transparent"}}>
        <Flex
          w="50%"
          align="start"
          justify="center"
          flexDir="column"
          color="#fff"
          display={{base: "none", lg: "flex"}}
        >
          <Box mx="auto">
            <Flex align="center" gap={10}>
              <Heading textTransform="uppercase">Sign Up</Heading>
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
              Hello! Please create your account.
            </Text>
          </Box>
          <Box as="form" onSubmit={handleSubmit}>
            <FormLabel color={{base: "gray.700", lg: "gray.600"}}>Email address</FormLabel>
            <InputGroup mb={7}>
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

            <Select
              placeholder="Role"
              borderColor="gray.300"
              bg="#fff"
              shadow="lg"
              size="md"
              mb={5}
              onChange={handleChange}
              name="role"
              defaultValue="EIT"
            >
              <option value="EIT">EIT</option>
              <option value="MEST Staff">MEST Staff</option>
            </Select>

            <FormLabel color={{base: "gray.700", lg: "gray.600"}}>Password</FormLabel>
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
            <Button
              variant="solid"
              bg="#1E63E1"
              color="#fff"
              shadow={{ base: "lg", lg: "none" }}
              w="full"
              my={5}
              _hover={{ bg: "#1E63E1" }}
              isLoading={isLoading}
              type="submit"
            >
              Sign Up
            </Button>
            <Text fontWeight={{base: "bold", lg: "normal"}}>
              {"Already have an account? "}
              <Text as={Link} to="/signin" color="#1E63E1" fontWeight="bold">
                Log In
              </Text>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
