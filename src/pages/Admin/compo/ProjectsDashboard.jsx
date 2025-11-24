import {
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  SimpleGrid,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaCode } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function ProjectsDashboard() {
  const API = import.meta.env.VITE_API_URL; // http://localhost:5000/api
  const BASE_URL = API.replace("/api", "");
  const toast = useToast();
  const { token } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [live, setLive] = useState("");
  const [code, setCode] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Load projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/projects`);
      setProjects(res.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      toast({
        title: "Error",
        description: "Failed to load projects.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setTagsInput("");
    setLive("");
    setCode("");
    setImageFile(null);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("live", live);
      fd.append("code", code);
      fd.append("tags", tagsInput); // comma separated
      if (imageFile) {
        fd.append("image", imageFile);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        await axios.put(`${API}/projects/${editingId}`, fd, config);
        toast({
          title: "Project updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.post(`${API}/projects`, fd, config);
        toast({
          title: "Project added",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error saving project",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setTitle(project.title || "");
    setDescription(project.description || "");
    setTagsInput((project.tags || []).join(", "));
    setLive(project.live || "");
    setCode(project.code || "");
    setImageFile(null); // new upload optional
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Project deleted",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Could not delete project.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Projects – Admin Control
      </Text>

      {/* FORM CARD */}
      <Box
        mb={10}
        p={6}
        borderWidth={1}
        borderRadius="xl"
        bg="whiteAlpha.50"
      >
        <Text fontSize="xl" fontWeight="semibold" mb={4}>
          {editingId ? "Edit Project" : "Add New Project"}
        </Text>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Project Title</FormLabel>
            <Input
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Short description of the project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tech Tags (comma separated)</FormLabel>
            <Input
              placeholder="React, Node.js, MongoDB, Chakra UI"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Live Demo URL</FormLabel>
              <Input
                placeholder="https://your-live-demo.com"
                value={live}
                onChange={(e) => setLive(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Code Repo URL</FormLabel>
              <Input
                placeholder="https://github.com/your-repo"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel>Project Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            {editingId && (
              <Text fontSize="xs" color="gray.400" mt={1}>
                Leave empty to keep existing image.
              </Text>
            )}
          </FormControl>

          <HStack justify="flex-end" spacing={3}>
            {editingId && (
              <Button variant="ghost" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
            <Button colorScheme="blue" onClick={handleSubmit}>
              {editingId ? "Update Project" : "Add Project"}
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* PROJECTS PREVIEW (same UI as public Projects page) */}
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Existing Projects
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {projects.map((p) => (
          <Box
            key={p._id}
            borderRadius="xl"
            overflow="hidden"
            bg="whiteAlpha.100"
            borderWidth="1px"
            _hover={{ transform: "translateY(-4px)", transition: "0.3s" }}
          >
            <Image
              src={
                p.image
                  ? BASE_URL + (p.image.startsWith("/") ? p.image : "/" + p.image)
                  : "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800"
              }
              alt={p.title}
              h="160px"
              w="100%"
              objectFit="cover"
            />

            <Box p={5}>
              {/* Tags */}
              <HStack spacing={2} mb={3} wrap="wrap">
                {(p.tags || []).map((t, idx) => (
                  <Badge
                    key={idx}
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="0.7rem"
                    bg="blue.600"
                    color="white"
                  >
                    {t}
                  </Badge>
                ))}
              </HStack>

              {/* Title */}
              <Text fontSize="lg" fontWeight="bold" mb={1}>
                {p.title}
              </Text>

              {/* Description */}
              <Text color="gray.400" fontSize="sm" mb={4} noOfLines={3}>
                {p.description}
              </Text>

              {/* Action buttons */}
              <VStack align="stretch" spacing={2}>
                <HStack spacing={3}>
                  {p.live && (
                    <Button
                      as="a"
                      href={p.live}
                      target="_blank"
                      leftIcon={<FaEye />}
                      colorScheme="blue"
                      size="xs"
                    >
                      Live
                    </Button>
                  )}

                  {p.code && (
                    <Button
                      as="a"
                      href={p.code}
                      target="_blank"
                      leftIcon={<FaCode />}
                      variant="outline"
                      size="xs"
                    >
                      Code
                    </Button>
                  )}
                </HStack>

                <HStack spacing={3}>
                  <Button
                    leftIcon={<FiEdit2 />}
                    size="xs"
                    variant="outline"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </Button>

                  <Button
                    leftIcon={<FiTrash2 />}
                    size="xs"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
