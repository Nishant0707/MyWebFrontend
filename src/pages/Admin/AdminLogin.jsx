import {
  Box,
  Flex,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginAdmin } from "../api/authApi";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const { login } = useContext(AuthContext);

  const toast = useToast();
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  const handleSubmit = async () => {
  try {
    setLoading(true);
    const res = await loginAdmin(email, password);
    login(res.data.token);

    toast({
      title: "Login Successful",
      status: "success",
      isClosable: true,
      duration: 2000,
    });

    // 🚀 REDIRECT TO DASHBOARD
    navigate("/admin/dashboard");

  } catch (error) {
    toast({
      title: "Login Failed",
      description: "Invalid credentials",
      status: "error",
      isClosable: true,
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={{ base: 5, md: 20 }}
      py={10}
    >
      <Box w="full" maxW="lg" textAlign="center">
        {/* HEADER */}
        <VStack spacing={3} mb={8}>
          <Text fontSize="4xl" fontWeight="bold">
            Welcome Back
          </Text>
          <Text fontSize="md" color="gray.400">
            Sign in to continue to your account.
          </Text>
        </VStack>

        {/* LOGIN CARD */}
        <Box
          p={8}
          bg={cardBg}
          borderWidth="1px"
          borderRadius="xl"
          boxShadow="xl"
        >
          <VStack spacing={5}>
            {/* Email */}
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                variant="filled"
                bg="whiteAlpha.200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <Flex justify="space-between" align="center">
                <FormLabel>Password</FormLabel>
                <Button variant="link" size="sm" color="blue.400">
                  Forgot Password?
                </Button>
              </Flex>

              <InputGroup>
                <Input
                  variant="filled"
                  bg="whiteAlpha.200"
                  placeholder="Enter your password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    size="sm"
                    bg="transparent"
                    icon={showPass ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPass((prev) => !prev)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Login Button */}
            <Button
              colorScheme="blue"
              w="full"
              size="lg"
              mt={2}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Login
            </Button>

            {/* Divider */}
            <Flex w="100%" align="center" justify="center">
              <Divider />
              <Text px={3} fontSize="sm" color="gray.500">
                Or continue with
              </Text>
              <Divider />
            </Flex>

            {/* Social Buttons */}
            <HStack spacing={5} w="full">
              <Button
                leftIcon={<FaFacebook />}
                w="full"
                variant="outline"
                borderColor="whiteAlpha.300"
              >
                Facebook
              </Button>
              <Button
                leftIcon={<FaGithub />}
                w="full"
                variant="outline"
                borderColor="whiteAlpha.300"
              >
                GitHub
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Footer */}
        <Text mt={6} color="gray.500">
          Don’t have an account?{" "}
          <Button variant="link" color="blue.400">
            Sign Up
          </Button>
        </Text>
      </Box>
    </Flex>
  );
}
