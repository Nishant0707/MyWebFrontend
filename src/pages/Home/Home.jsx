import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  IconButton,
  VStack,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const API = import.meta.env.VITE_API_URL;
  const BASE_URL = API.replace("/api", "");
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const formatPath = (filePath) => {
    if (!filePath) return "";
    return filePath.startsWith("/") ? filePath : "/" + filePath;
  };

  useEffect(() => {
    axios.get(`${API}/home`).then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data)
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <Box px={{ base: 5, lg: 24 }} py={20}>
      <Flex
        direction={{ base: "column-reverse", lg: "row" }}
        align="center"
        justify="space-between"
        gap={16}
      >
        {/* LEFT CONTENT */}
        <Box maxW="580px">
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            mb={4}
          >
            {data.heading || "Full-Stack Developer & UI/UX Enthusiast"}
          </Text>

          <Text fontSize="lg" color="gray.400" mb={8} lineHeight="1.8">
            {data.bio ||
              "Hi, I'm Nishant. I build beautiful and functional web applications with a passion for clean code and user-centric design."}
          </Text>

          {/* SOCIAL ICONS */}
          <HStack spacing={8} mb={10}>
            {data.socials?.linkedin && (
              <VStack spacing={1} cursor="pointer">
                <IconButton
                  as="a"
                  href={data.socials.linkedin}
                  target="_blank"
                  icon={<FaLinkedin size={22} />}
                  aria-label="LinkedIn"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm">LinkedIn</Text>
              </VStack>
            )}

            {data.socials?.github && (
              <VStack spacing={1} cursor="pointer">
                <IconButton
                  as="a"
                  href={data.socials.github}
                  target="_blank"
                  icon={<FaGithub size={22} />}
                  aria-label="GitHub"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm">GitHub</Text>
              </VStack>
            )}

            {data.socials?.twitter && (
              <VStack spacing={1} cursor="pointer">
                <IconButton
                  as="a"
                  href={data.socials.twitter}
                  target="_blank"
                  icon={<FaTwitter size={22} />}
                  aria-label="Twitter"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm">Twitter</Text>
              </VStack>
            )}
          </HStack>

          {/* ACTION BUTTONS */}
          <HStack spacing={4} flexWrap="wrap">
            <Button
              colorScheme="blue"
              size="lg"
              px={6}
              onClick={() => navigate("/projects")}
            >
              View My Work
            </Button>

            <Button
              size="lg"
              variant="outline"
              px={6}
              onClick={() => navigate("/contact")}
            >
              Contact Me
            </Button>

            {data.resumeFile && (
              <Button
                size="lg"
                variant="outline"
                px={6}
                as="a"
                href={BASE_URL + formatPath(data.resumeFile)}
                download
              >
                Download Resume
              </Button>
            )}
          </HStack>
        </Box>

        {/* RIGHT — PROFILE IMAGE */}
        <Avatar
          size="2xl"
          name="Nishant"
          src="/Nishantnew.jpg"
          border="6px solid white"
          boxShadow="2xl"
          w="260px"
          h="260px"
        />
      </Flex>
    </Box>
  );
}
