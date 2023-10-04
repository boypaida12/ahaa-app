/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "../fonts/fonts.css";
import {
  Box,
  Flex,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Text,
  Stack,
  Textarea,
  Heading,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { AiFillHome } from "react-icons/ai";
import {useAuth} from "../config/firebase"
import { useNavigate } from "react-router";

const AttendanceQuestion = () => {
  const [answer, setAnswer] = useState("");
  const locationRef = useRef(null);
  const toast = useToast();
  const currentUser = useAuth();
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Show the time-sensitive toast when the component mounts
    toast({
      description: "This question is time-sensitive. Page will reset after 30 seconds.",
      status: "info",
      duration: 7000, // 20 seconds
      colorScheme: "blue",
    });
    const timer = setTimeout(() => {
      // Hide the question card after 20 seconds
      navigate("/question-hidden"); // Navigate to the hidden route
    }, 30000); // 20,000 milliseconds = 20 seconds

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, [navigate, toast]);

  

  const questionText = "1. In one word or phrase how are you feeling about the class today?";

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Capture the timestamp
    const timestamp = new Date().toLocaleString();
  
    // Capture the user's location using Geolocation API (navigator.geolocation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Store the user's location in the ref
        locationRef.current = { latitude, longitude };
  
        // Now you can use question, answer, timestamp, and locationRef.current
        console.log("Student Email:", currentUser?.email)
        console.log("Question:", questionText);
        console.log("Answer:", answer);
        console.log("Timestamp:", timestamp);
        console.log("Location:", locationRef.current);
      });
    }

    toast({
      title: "Success",
      description:
        "Your feedback and attendance have been recorded successfully. Enjoy the rest of your class.",
      status: "info",
      duration: 5000, // 20 seconds
      colorScheme: "blue",
      isClosable: true,
    });
    setAnswer("");

    // Hide the card after the question has been submitted
    navigate("/question-hidden")
  };
  
  return (
    <Box>
      <Box position="relative">
        <NavBar navHeading="Attendance Question" iconSrc={AiFillHome} navigatePage="/"/>
      </Box>

      <Flex minH="50vh" justify="center" align="center">
          <Box boxShadow="xl" p="6" rounded="md" bg="white">
          <Box as="form" onSubmit={handleFormSubmit}>
            <Text
              color="gray.500"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              mb="5"
            >
              Student Feedback for the Day
            </Text>
            <Text color="#1E63E1" fontWeight="bold" mb={2}>Business Class</Text>
            <InputGroup>
            <Stack>
              <Text fontWeight="bold" >{questionText}</Text>
                <Textarea
                  type="text"
                  name="answer"
                  value={answer}
                  placeholder="Enter Answer Here"
                  onChange={handleAnswerChange}
                  borderColor="gray.300"
                  shadow="lg"
                  _placeholder={{ fontSize: "md" }}
                />
            </Stack>
            </InputGroup>
            <Button
              variant="solid"
              bg="#1E63E1"
              color="#fff"
              w="full"
              type="submit"
              my={5}
              _hover={{ bg: "#1E63E1" }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Flex>
      <Box
          bg="#1E63E1"
          color="#fff"
          position="fixed"
          bottom={0}
          w="full"
          textAlign="center"
          p={2}
          fontWeight="bold"
        >
          <Text>Copyright © 2023 | Ahaa Llc.</Text>
        </Box>
    </Box>
  );
};

export default AttendanceQuestion;
