/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../assets/logo_white.png";
import { Box, Flex, Icon, Img, Link, Show, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NavBar({iconSrc, navHeading, navigatePage}) {
    const after = {
        content: '""',
        position:'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "200px",
        backgroundColor : "#D2E0F9",
        borderBottomRadius: "100%",
        zIndex: -1,
    }

    const navigate = useNavigate();

    const handleClick=()=> {
        navigate({pathname: navigatePage});
    }
  return (
    <>
      <Flex bg="#1E63E1" _after={after} align="center" px={5} justifyContent={{base: "space-between"}}>
        <Img src={logo} alt="Ahaa logo" m={{base: 0, lg:2}}/>
        <Show breakpoint="(min-width:1023px)">
          <Text mx="auto" color="#fff" fontSize="5xl" fontWeight="bold">{navHeading}</Text>
        </Show>
        <Stack color="#fff" _hover={{textDecoration: "none"}} onClick={handleClick} cursor="pointer">
            <Icon as={iconSrc} boxSize="3.5rem"/>
        </Stack>
      </Flex>
    </>
  );
}

export default NavBar;
