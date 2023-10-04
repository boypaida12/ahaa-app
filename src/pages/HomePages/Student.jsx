/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../fonts/fonts.css";
import {
  Box,
  Button,
  Flex,
  Img,
  Text,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../config/firebase";

const Student = () => {
  const cardDetails = [
    {
      title: "Attendance",
      imgSrc: "assets/calendar.png",
      path: "/attendance-question",
    },
    {
      title: "Absence Reporting",
      imgSrc: "assets/report.png",
      path: "/absence-reporting",
    },
    {
      title: "Leave Request",
      imgSrc: "assets/clipboard.png",
      path: "/leave-request",
    },
  ];

  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleNavbarClick = () => {
    // Toggle the visibility of the logout div
    setIsLogoutVisible(!isLogoutVisible);
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      toast({
        description: "successfully logged-out",
        status: "success",
        duration: 4000,
        colorScheme: "blue",
      });
      navigate({ pathname: "/signin" });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 4000,
      });
    }
  };

  return (
    <Box>
      <Box position="relative" cursor="pointer" onClick={handleNavbarClick}>
        <NavBar
          navHeading="Homepage"
          iconSrc={FaUserCircle}
          showProfile={true}
        />
        {isLogoutVisible && <Box position="absolute" right={2} top={24}>
          <Button isLoading={isLoading} onClick={handleLogout}>Logout</Button>
        </Box>}
      </Box>
      <Flex minH="80vh" justify="center" align="center" gap={5} flexDir={{base:"column", lg: "row"}}>
        {cardDetails.map((cardDetails, index) => (
          <>
            <Flex
              key={index}
              flexDir="column"
              align="center"
              w="15rem"
              p={4}
              rounded="xl"
              shadow="2xl"
              border="2px"
              borderColor="gray.400"
              bg="white"
              fontWeight="bold"
              gap={5}
              cursor="pointer"
              as={Link}
              to={cardDetails.path}
            >
              <Img src={cardDetails.imgSrc} />
              <Text>{cardDetails.title}</Text>
            </Flex>
          </>
        ))}
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

export default Student;
