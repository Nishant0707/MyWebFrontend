import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Icon
} from "@chakra-ui/react";

import { FaCamera, FaHiking, FaUtensils } from "react-icons/fa";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

export default function About() {
  const API = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/about`).then((res) => setData(res.data));
  }, []);

  if (!data)
    return (
      <Flex justify="center" align="center" minH="50vh">
        Loading...
      </Flex>
    );

  return (
    <Box px={{ base: 5, lg: 32 }} py={16}>
      {/* Profile Section */}
      <VStack spacing={4} textAlign="center">
        <Avatar size="2xl" src="/Nishant.jpg" />

        <Text fontSize="4xl" fontWeight="bold">
          {data.title || "About Nishant"}
        </Text>

        <Text fontSize="lg" color="gray.400">
          {data.subtitle || "Software Engineer & Lifelong Learner"}
        </Text>
      </VStack>

      {/* BIO */}
      <Box mt={12} p={8} borderWidth={1} borderRadius="xl" bg="whiteAlpha.50">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Bio
        </Text>
        <Text color="gray.300" fontSize="md" lineHeight="tall">
          {data.bio}
        </Text>
      </Box>

      {/* SKILLS */}
      <Box mt={12} p={8} borderWidth={1} borderRadius="xl" bg="whiteAlpha.50">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Skills
        </Text>

        <Flex wrap="wrap" gap={4}>
          {data.skills?.map((skill, i) => (
            <Badge
              key={i}
              px={4}
              py={2}
              borderRadius="md"
              fontSize="md"
              bg="blue.600"
              color="white"
            >
              {skill}
            </Badge>
          ))}
        </Flex>
      </Box>

      {/* EXPERIENCE */}
      <Box mt={12} p={8} borderWidth={1} borderRadius="xl" bg="whiteAlpha.50">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Experience
        </Text>

        {data.experience?.map((job, idx) => (
          <Box key={idx} mb={10}>
            <HStack spacing={3} mb={1}>
              <Box w={2} h={2} borderRadius="full" bg="blue.400" />
              <Text color="gray.400">{job.duration}</Text>
            </HStack>

            <Text fontSize="xl" fontWeight="bold">
              {job.role}
            </Text>
            <Text color="gray.300">{job.company}</Text>

            <VStack align="flex-start" spacing={2} mt={3}>
              {job.points?.map((p, i) => (
                <Text key={i}>• {p}</Text>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>

      {/* EDUCATION */}
      <Box mt={12} p={8} borderWidth={1} borderRadius="xl" bg="whiteAlpha.50">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Education
        </Text>

        {data.education?.map((edu, idx) => (
          <Box key={idx} mb={6}>
            <HStack spacing={3} mb={1}>
              <Box w={2} h={2} borderRadius="full" bg="blue.400" />
              <Text color="gray.400">{edu.year}</Text>
            </HStack>

            <Text fontSize="xl" fontWeight="bold">{edu.degree}</Text>
            <Text color="gray.300">{edu.university}</Text>
          </Box>
        ))}
      </Box>

      {/* INTERESTS */}
<Box mt={12} p={8} borderWidth={1} borderRadius="xl" bg="whiteAlpha.50">
  <Text fontSize="2xl" fontWeight="bold" mb={6}>
    Personal Interests
  </Text>

  <Flex wrap="wrap" gap={6}>
    {data.interests?.map((int, idx) => (
      <HStack
        key={idx}
        spacing={3}
        p={4}
        borderWidth={1}
        borderRadius="lg"
      >
        <Text>{int}</Text>
      </HStack>
    ))}
  </Flex>
</Box>
    </Box>
  );
}
