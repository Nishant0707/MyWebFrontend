import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  const phoneNumber = "9990058270";

  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hello%20Nishant!%20I%20saw%20your%20website.%20Shall%20we%20connect%3F`;
  const mailLink = `mailto:ngautam535@gmail.com?subject=Business%20Enquiry%20from%20Website&body=Hello%20Nishant,%0A%0AI%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20project.%0A%0ARegards,`;
  const mapLink = "https://maps.app.goo.gl/YOUR_LOCATION_LINK"; // replace

  return (
    <Box
      px={{ base: 5, lg: 24 }}
      py={10}
      bg="#0a0e1aff"       // 🔥 MATCHES TOP DARK BACKGROUND
      color="gray.300"
      mt={20}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={10}
      >
        {/* Navigation */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" fontSize="lg" color="white">
            Navigation
          </Text>

          <Link as={RouterLink} to="/home" _hover={{ color: "blue.400" }}>
            Home
          </Link>
          <Link as={RouterLink} to="/about" _hover={{ color: "blue.400" }}>
            About Me
          </Link>
          <Link as={RouterLink} to="/projects" _hover={{ color: "blue.400" }}>
            My Projects
          </Link>
          <Link as={RouterLink} to="/contact" _hover={{ color: "blue.400" }}>
            Contact Me
          </Link>
          <Link as={RouterLink} to="/admin/login" _hover={{ color: "blue.400" }}>
            Login
          </Link>
        </VStack>

        <Divider
          orientation="vertical"
          borderColor="gray.700"
          height="100%"
          display={{ base: "none", md: "block" }}
        />

        {/* Contact Section */}
        <VStack align="flex-start" spacing={4}>
          <Text fontWeight="bold" fontSize="lg" color="white">
            Contact
          </Text>

          {/* Phone */}
          <HStack>
            <Icon as={FaPhone} color="blue.400" />
            <Link
              href={`tel:+91${phoneNumber}`}
              _hover={{ color: "blue.300", textDecoration: "underline" }}
            >
              +91 {phoneNumber}
            </Link>
          </HStack>

          {/* WhatsApp */}
          <HStack>
            <Icon as={FaWhatsapp} color="green.400" />
            <Link
              href={whatsappLink}
              target="_blank"
              _hover={{ color: "green.300", textDecoration: "underline" }}
            >
              Message on WhatsApp
            </Link>
          </HStack>

          {/* Email */}
          <HStack>
            <Icon as={FaEnvelope} color="red.400" />
            <Link
              href={mailLink}
              _hover={{ color: "red.300", textDecoration: "underline" }}
            >
              ngautam535@gmail.com
            </Link>
          </HStack>

          {/* Location */}
          <HStack>
            <Icon as={FaLocationDot} color="purple.400" />
            <Link
              href={mapLink}
              target="_blank"
              _hover={{ color: "purple.300", textDecoration: "underline" }}
            >
              Chirag Delhi, New Delhi — 110017
            </Link>
          </HStack>
        </VStack>
      </Flex>

      <Text textAlign="center" mt={10} color="gray.600">
        © 2025 Made By Nishant Gautam. All rights reserved.
      </Text>
    </Box>
  );
}
