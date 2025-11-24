import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Import Sub-Pages
import HomeDashboard from "./compo/HomeDashboard";
import AboutDashboard from "./compo/AboutDashboard";
import ProjectsDashboard from "./compo/ProjectsDashboard";
import ContactDashboard from "./compo/ContactDashboard";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const sectionBg = useColorModeValue("white", "whiteAlpha.100");

  const [activePage, setActivePage] = useState("home"); // default tab

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <Flex minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* LEFT SIDEBAR */}
      <Box
        w="260px"
        p={6}
        borderRight="1px solid"
        borderColor="whiteAlpha.300"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={8}>
          Admin Panel
        </Text>

        <VStack spacing={4} align="stretch">
          <Button
            colorScheme={activePage === "home" ? "blue" : "gray"}
            variant={activePage === "home" ? "solid" : "ghost"}
            onClick={() => setActivePage("home")}
          >
            Home Dashboard
          </Button>

          <Button
            colorScheme={activePage === "about" ? "blue" : "gray"}
            variant={activePage === "about" ? "solid" : "ghost"}
            onClick={() => setActivePage("about")}
          >
            About Dashboard
          </Button>

          <Button
            colorScheme={activePage === "projects" ? "blue" : "gray"}
            variant={activePage === "projects" ? "solid" : "ghost"}
            onClick={() => setActivePage("projects")}
          >
            Projects Dashboard
          </Button>

          <Button
            colorScheme={activePage === "contact" ? "blue" : "gray"}
            variant={activePage === "contact" ? "solid" : "ghost"}
            onClick={() => setActivePage("contact")}
          >
            Contact Dashboard
          </Button>
        </VStack>

        {/* LOGOUT BUTTON */}
        <Button
          colorScheme="red"
          mt={10}
          w="full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* RIGHT CONTENT AREA */}
      <Box flex="1" p={10}>
        {activePage === "home" && <HomeDashboard />}
        {activePage === "about" && <AboutDashboard />}
        {activePage === "projects" && <ProjectsDashboard />}
        {activePage === "contact" && <ContactDashboard />}
      </Box>
    </Flex>
  );
}
