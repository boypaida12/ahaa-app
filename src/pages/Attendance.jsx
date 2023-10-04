/* eslint-disable no-unused-vars */
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AiFillHome } from "react-icons/ai";
import { Html5QrcodeScanner } from "html5-qrcode";

function Attendance() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <Box>
        <Box position="relative">
          <NavBar
            navHeading="Attendance"
            iconSrc={AiFillHome}
            navigatePage={"/"}
          />
        </Box>
        <Flex
          minH="80vh"
          justify="center"
          align="center"
          gap={5}
          flexDir="column"
        >
          <Text fontSize="4xl" fontWeight="bold" color="#1E63E1">
            Scan QR Code to Answer Question(s)
          </Text>

          {scanResult ? (
            <Box>
              Success: <a href={scanResult}>{scanResult}</a>
            </Box>
          ) : (
            <Box id="reader"></Box>
          )}
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
  );
}

export default Attendance;
