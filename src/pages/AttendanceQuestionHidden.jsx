/* eslint-disable no-unused-vars */
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import NavBar from '../components/NavBar'
import { Box, Flex, Text } from '@chakra-ui/layout'

export const AttendanceQuestionHidden = () => {
  return (
    <>
    <Box>
      <Box position="relative">
        <NavBar navHeading="Attendance Question" iconSrc={AiFillHome} navigatePage="/"/>
      </Box>
      <Flex minH="60vh" justify="center" align="center">
        <Text color="#1E63E1" fontSize="4xl">Response Window Over</Text>  
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
    </>
  )
}
