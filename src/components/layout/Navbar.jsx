import React, { useContext } from "react";
import {
  Flex,
  HStack,
  Link,
  IconButton,
  useColorMode,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../pages/context/AuthContext";  // FIXED

export default function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <Flex
      px={{ base: 4, md: 10 }}
      py={4}
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      {/* LEFT LOGO */}
      <HStack spacing={3}>
        <Image
          src="/logo.png"
          alt="Logo"
          w="60px"
          h="60px"
          objectFit="contain"
        />

        <Link
          as={RouterLink}
          to="/home"
          fontWeight="bold"
          fontSize="xl"
        >
          Nishant Gautam
        </Link>
      </HStack>

      {/* CENTER MENU */}
      <HStack
        spacing={8}
        display={{ base: "none", md: "flex" }}
        fontWeight="medium"
      >
        <Link as={RouterLink} to="/home">Home</Link>
        <Link as={RouterLink} to="/about">About Me</Link>
        <Link as={RouterLink} to="/projects">My Projects</Link>
        <Link as={RouterLink} to="/contact">Contact Me</Link>
      </HStack>

      {/* RIGHT SIDE */}
      <HStack spacing={4}>
        {!token ? (
          <Button
            as={RouterLink}
            to="/admin/login"
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            display={{ base: "none", md: "inline-flex" }}
          >
            Login
          </Button>
        ) : (
          <Button
            as={RouterLink}
            to="/admin/dashboard"
            size="sm"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
            display={{ base: "none", md: "inline-flex" }}
          >
            Dashboard
          </Button>
        )}

      </HStack>
    </Flex>
  );
}
