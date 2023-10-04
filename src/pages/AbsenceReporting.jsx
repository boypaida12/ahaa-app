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
  RadioGroup,
  Radio,
  useToast,
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

  const questionText1 = "1. Reason of absence";
  const questionText2 = "2. Do you need medical assistance?";
  const questionText3 = "3. Do you want your food to be delivered to you?";

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

    // Reset the form fields
    e.target.reset();

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
  };

  return (
    <Box>
      <Box position="relative">
        <NavBar
          navHeading="Absence Reporting"
          iconSrc={AiFillHome}
          navigatePage="/"
        />
      </Box>

      <Flex minH="50vh" justify="center" align="center">
        <Box boxShadow="xl" p="6" rounded="md" bg="white" maxW="xl" mt={10} mx={2}>
          <Box as="form" onSubmit={handleFormSubmit}>
            <Text
              color="gray.500"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
              mb="5"
            >
              Student Absence Form
            </Text>
            <InputGroup>
              <Box>
                <Stack mb={5}>
                  <Text fontWeight="bold">{questionText1}</Text>
                  <Select
                    name="answer1"
                    placeholder="Select reason for absence"
                    onChange={(e) => handleAnswerChange("answer1", e.target.value)}
                    value={answer1}
                  >
                    <option value="Sickness">Sickness</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Stress and Mental Health">
                      Stress and Mental Health
                    </option>
                    <option value="Grievance">Grievance</option>
                  </Select>
                </Stack>
                <Stack mb={5}>
                  <Text fontWeight="bold">{questionText2}</Text>
                  <RadioGroup
                    name="answer2"
                    onChange={(value) => handleAnswerChange("answer2", value)}
                    value={answer2}
                  >
                    <Stack>
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <Stack>
                  <Text fontWeight="bold">{questionText3}</Text>
                  <RadioGroup
                    name="answer3"
                    onChange={(value) => handleAnswerChange("answer3", value)}
                    value={answer3}
                  >
                    <Stack>
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Stack>
                  </RadioGroup>
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
