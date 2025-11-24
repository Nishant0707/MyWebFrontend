import {
  Box,
  Text,
  Flex,
  Button,
  HStack,
  VStack,
  Image,
  Badge,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { FaEye, FaCode } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const API = import.meta.env.VITE_API_URL;
const BASE_URL = API.replace("/api", ""); 


  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  // Load projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API}/projects`);
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Build filter list from tags
  const allTags = Array.from(
    new Set(
      projects
        .flatMap((p) => p.tags || [])
        .filter((t) => t && t.trim().length > 0)
    )
  );
  const filters = ["All", ...allTags];

  // Filtered projects
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => (p.tags || []).includes(activeFilter));

  if (loading) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box px={{ base: 5, lg: 32 }} py={16}>
      {/* Heading */}
      <VStack spacing={3} align="flex-start">
        <Text fontSize="4xl" fontWeight="bold">
          My Projects
        </Text>

        <Text fontSize="md" color="gray.400">
          A selection of recent projects I've built using the MERN stack and
          other modern technologies.
        </Text>
      </VStack>

      {/* Filters */}
      <HStack spacing={4} mt={8} wrap="wrap">
        {filters.map((f, index) => (
          <Button
            key={index}
            size="sm"
            borderRadius="full"
            bg={activeFilter === f ? "blue.600" : "whiteAlpha.200"}
            color={activeFilter === f ? "white" : "gray.300"}
            _hover={{
              bg: activeFilter === f ? "blue.700" : "whiteAlpha.300",
            }}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </Button>
        ))}
      </HStack>

      {/* Project Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
        {filteredProjects.map((p) => (
          <Box
            key={p._id}
            borderRadius="xl"
            overflow="hidden"
            bg="whiteAlpha.100"
            borderWidth="1px"
            _hover={{ transform: "translateY(-6px)", transition: "0.3s" }}
          >
       <Image
  src={
    p.image
      ? BASE_URL + (p.image.startsWith("/") ? p.image : "/" + p.image)
      : "https://via.placeholder.com/400x200?text=No+Image"
  }
  alt={p.title}
  h="180px"
  w="100%"
  objectFit="cover"
/>
            <Box p={6}>
              {/* Tags */}
              <HStack spacing={2} mb={4} wrap="wrap">
                {(p.tags || []).map((t, idx) => (
                  <Badge
                    key={idx}
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="0.75rem"
                    bg="blue.600"
                    color="white"
                  >
                    {t}
                  </Badge>
                ))}
              </HStack>

              {/* Title */}
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {p.title}
              </Text>

              {/* Description */}
              <Text color="gray.400" mb={6}>
                {p.description}
              </Text>

              {/* Buttons */}
              <HStack spacing={4}>
                {p.live && (
                  <Button
                    as="a"
                    href={p.live}
                    target="_blank"
                    leftIcon={<FaEye />}
                    colorScheme="blue"
                    variant="solid"
                    size="sm"
                  >
                    Live Demo
                  </Button>
                )}

                {p.code && (
                  <Button
                    as="a"
                    href={p.code}
                    target="_blank"
                    leftIcon={<FaCode />}
                    variant="outline"
                    size="sm"
                    color="gray.300"
                    borderColor="gray.500"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    View Code
                  </Button>
                )}
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
