import { useRef, useState } from "react";
import "../fonts/fonts.css";
import {
  Box,
  Flex,
  Button,
  InputGroup,
  Text,
  Stack,
  Select,
  useToast,
  Input,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { AiFillHome } from "react-icons/ai";
import { useAuth } from "../config/firebase";

const AbsenceReporting = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const locationRef = useRef(null);
  const currentUser = useAuth();

  const handleAnswerChange = (questionName, value) => {
    // Use separate state variables for each question
    if (questionName === "answer1") {
      setAnswer1(value);
    } else if (questionName === "answer2") {
      setAnswer2(value);
    } else if (questionName === "answer3") {
      setAnswer3(value);
    }
  };

  const toast = useToast();

  const questionText1 = "1. Start of Leave";
  const questionText2 = "2. End of Leave";
  const questionText3 = "3. Reason of Leave";

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
        console.log("Student Email:", currentUser?.email);
        console.log("Question 1:", questionText1);
        console.log("Answer 1:", answer1);
        console.log("Question 2:", questionText2);
        console.log("Answer 2:", answer2);
        console.log("Question 3:", questionText3);
        console.log("Answer 3:", answer3);
        console.log("Timestamp:", timestamp);
        console.log("Location:", locationRef.current);
      });
    }

    

    toast({
      title: "Success",
      description: "Your absence report form has been submitted",
      duration: 5000,
      status: "success",
      variant: "left-accent",
      colorScheme: "blue",
      position: "top-right",
      isClosable: true,
    });
    
    // Reset the form fields

    e.target.reset();
  };

  return (
    <Box>
      <Box position="relative">
        <NavBar
          navHeading="Leave Request"
          iconSrc={AiFillHome}
          navigatePage="/"
        />
      </Box>

      <Flex minH="50vh" justify="center" align="center">
        <Box boxShadow="xl" p="6" rounded="md" bg="white" maxW="2xl" mt={10} mx={2}>
          <Box as="form" onSubmit={handleFormSubmit}>
            <Text
              color="gray.500"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              mb="5"
            >
              Leave Request Form
            </Text>
            <InputGroup>
              <Box>
                <Stack mb={5}>
                  <Text fontWeight="bold">{questionText1}</Text>
                  <Input
                    name="answer1"
                    type="date"
                    onChange={(e) => handleAnswerChange("answer1", e.target.value)}
                    value={answer1}
                  />            
                </Stack>
                <Stack mb={5}>
                  <Text fontWeight="bold">{questionText2}</Text>
                  <Input
                    name="answer2"
                    type="date"
                    onChange={(e) => handleAnswerChange("answer2", e.target.value)}
                    value={answer2}
                  />            
                </Stack>
                <Stack>
                  <Text fontWeight="bold">{questionText3}</Text>
                  <Select
                    name="answer3"
                    placeholder="Select reason for absence"
                    onChange={(e) => handleAnswerChange("answer3", e.target.value)}
                    value={answer3}
                  >
                    <option value="Sickness">Need time to Reflect</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Stress and Mental Health">
                      Stress and Mental Health
                    </option>
                  </Select>
                </Stack>
              </Box>
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

export default AbsenceReporting;
