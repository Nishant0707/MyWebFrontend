import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  SimpleGrid,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const API = import.meta.env.VITE_API_URL;
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const toast = useToast();

  // Contact info from backend
  const [info, setInfo] = useState({
    phone: "+91 0000000000",
    email: "your@mail.com",
    address: "Your Address",
    whatsapp: "+91 0000000000",
  });

  // Form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+91",
    subject: "",
    message: "",
  });

  useEffect(() => {
    axios.get(`${API}/contact/info`).then((res) => {
      if (res.data) setInfo(res.data);
    });
  }, []);

  const handleSubmit = async () => {
    // Email validation
    if (!form.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Email must contain @",
        status: "error",
      });
      return;
    }

    // Phone validation (+country + 10 digits)
    if (!form.phone.match(/^\+\d{1,3}\d{10}$/)) {
      toast({
        title: "Invalid Phone",
        description: "Phone must be like +91XXXXXXXXXX",
        status: "error",
      });
      return;
    }

    try {
      await axios.post(`${API}/contact/send`, form);

      toast({
        title: "Message Sent",
        description: "Thanks for contacting me!",
        status: "success",
        duration: 2000,
      });

      setForm({
        name: "",
        email: "",
        phone: "+91",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message,
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Box px={{ base: 5, md: 20, lg: 32 }} py={16}>
      {/* Header */}
      <VStack textAlign="center" spacing={3} mb={12}>
        <Text fontSize="4xl" fontWeight="bold">
          Let's Connect
        </Text>
        <Text fontSize="md" color="gray.400" maxW="600px">
          Have a question, a project proposal, or just want to say hello? I'd
          love to hear from you.
        </Text>
      </VStack>

      {/* Grid Layout */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        {/* LEFT SECTION – FORM */}
        <Box
          p={8}
          borderRadius="xl"
          bg={cardBg}
          borderWidth="1px"
          boxShadow="lg"
        >
          <VStack spacing={5} align="stretch">
            {/* Name + Email */}
            <HStack spacing={5} flexDir={{ base: "column", md: "row" }}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  variant="filled"
                  bg="whiteAlpha.200"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter your email address"
                  variant="filled"
                  bg="whiteAlpha.200"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </FormControl>
            </HStack>

            {/* Phone */}
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="+91XXXXXXXXXX"
                variant="filled"
                bg="whiteAlpha.200"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </FormControl>

            {/* Subject */}
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Input
                placeholder="What is this about?"
                variant="filled"
                bg="whiteAlpha.200"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
              />
            </FormControl>

            {/* Message */}
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Write your message here..."
                variant="filled"
                bg="whiteAlpha.200"
                value={form.message}
                rows={6}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              w="100%"
              borderRadius="md"
              mt={2}
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </VStack>
        </Box>

        {/* RIGHT SECTION – CONTACT INFORMATION */}
        <Box
          p={8}
          borderRadius="xl"
          bg={cardBg}
          borderWidth="1px"
          boxShadow="lg"
          h="fit-content"
        >
          <VStack align="flex-start" spacing={7}>
            <Text fontSize="2xl" fontWeight="bold">
              Contact Information
            </Text>

            {/* Phone */}
            <HStack spacing={4}>
              <Flex
                p={3}
                bg="blue.700"
                borderRadius="md"
                align="center"
                justify="center"
              >
                <Icon as={FaPhone} color="white" />
              </Flex>
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold">Phone</Text>
                <Text color="gray.400">{info.phone}</Text>
              </VStack>
            </HStack>

            {/* Email */}
            <HStack spacing={4}>
              <Flex
                p={3}
                bg="blue.700"
                borderRadius="md"
                align="center"
                justify="center"
              >
                <Icon as={FaEnvelope} color="white" />
              </Flex>
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold">Email</Text>
                <Text color="gray.400">{info.email}</Text>
              </VStack>
            </HStack>

            {/* Address */}
            <HStack spacing={4}>
              <Flex
                p={3}
                bg="blue.700"
                borderRadius="md"
                align="center"
                justify="center"
              >
                <Icon as={FaMapMarkerAlt} color="white" />
              </Flex>
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold">Address</Text>
                <Text color="gray.400">{info.address}</Text>
              </VStack>
            </HStack>

            {/* WhatsApp */}
            <HStack spacing={4}>
              <Flex
                p={3}
                bg="blue.700"
                borderRadius="md"
                align="center"
                justify="center"
              >
                <Icon as={FaWhatsapp} color="white" />
              </Flex>
              <VStack align="flex-start" spacing={0}>
                <Text fontWeight="bold">WhatsApp</Text>
                <Text color="gray.400">{info.whatsapp || info.phone}</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
