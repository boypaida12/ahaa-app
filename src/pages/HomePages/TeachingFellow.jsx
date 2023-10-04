/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import attendance_quest from "../../assets/chat.png";
import attendance_report from "../../assets/file.png";
import { FaUserCircle } from "react-icons/fa";
import "../../fonts/fonts.css";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Img,
  Text,

} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";

const TeachingFellow = () => {
  return (
    <Box>
      <Box position="relative">
        <NavBar navHeading="Home Page" iconSrc={FaUserCircle} />
      </Box>

      <Flex minH="80vh" justify="center" align="center" flexDir="row" gap="10" >
        <Card maxW="sm" cursor='pointer'>
          <CardBody>
            <Img src={attendance_quest} />
            <Text mt="3" fontWeight="bold">
              Attendance Question
            </Text>
          </CardBody>
        </Card>
        <Card maxW="sm" cursor='pointer'>
          <CardBody>
            <Img src={attendance_report} />
            <Text mt="3" fontWeight="bold">
              Attendance Report
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default TeachingFellow;
