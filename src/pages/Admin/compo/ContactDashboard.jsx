import {
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  HStack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FiTrash2 } from "react-icons/fi";

export default function ContactDashboard() {
  const API = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const { token } = useContext(AuthContext);

  const [info, setInfo] = useState({ email: "", phone: "", address: "" });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadInfo();
    loadMessages();
  }, []);

  const loadInfo = async () => {
    const res = await axios.get(`${API}/contact/info`);
    setInfo(res.data || {});
  };

  const loadMessages = async () => {
    const res = await axios.get(`${API}/contact/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data || []);
  };

  const saveInfo = async () => {
    await axios.put(`${API}/contact/info`, info, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast({ title: "Contact info updated", status: "success" });
  };

  const deleteMsg = async (id) => {
    await axios.delete(`${API}/contact/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    loadMessages();
    toast({ title: "Message deleted", status: "info" });
  };

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Contact – Admin Panel
      </Text>

      {/* CONTACT INFO FORM */}
      <Box p={6} borderWidth={1} borderRadius="xl" mb={10} bg="whiteAlpha.50">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Contact Information
        </Text>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone (+country +10 digits)</FormLabel>
            <Input
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Textarea
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
            />
          </FormControl>

          <Button colorScheme="blue" onClick={saveInfo}>
            Save
          </Button>
        </VStack>
      </Box>

      {/* MESSAGES LIST */}
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Contact Messages
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {messages.map((m) => (
          <Box key={m._id} p={5} borderWidth={1} borderRadius="lg">
            <HStack justify="space-between">
              <Text fontWeight="bold">{m.name}</Text>
              <Badge>{m.email}</Badge>
            </HStack>

            <Text fontSize="sm" color="gray.400">
              {m.phone}
            </Text>

            <Text mt={3} fontWeight="semibold">
              {m.subject}
            </Text>

            <Text color="gray.300" mt={2}>
              {m.message}
            </Text>

            <Button
              mt={3}
              size="sm"
              colorScheme="red"
              leftIcon={<FiTrash2 />}
              onClick={() => deleteMsg(m._id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
