import {
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  HStack,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutDashboard() {
  const API = import.meta.env.VITE_API_URL;
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bio, setBio] = useState("");

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");

  useEffect(() => {
    axios.get(`${API}/about`).then((res) => {
      const d = res.data || {};

      setTitle(d.title || "");
      setSubtitle(d.subtitle || "");
      setBio(d.bio || "");

      setSkills(d.skills || []);

      setExperience(d.experience || []);
      setEducation(d.education || []);

      setInterests(d.interests || []);
    });
  }, []);

  // Add skill
  const addSkill = () => {
    if (!skillInput.trim()) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  };

  // Add interest
  const addInterest = () => {
    if (!interestInput.trim()) return;
    setInterests([...interests, interestInput.trim()]);
    setInterestInput("");
  };

  // Add new experience block
  const addExperience = () => {
    setExperience([
      ...experience,
      { duration: "", role: "", company: "", points: [] },
    ]);
  };

  // Add new education block
  const addEducation = () => {
    setEducation([
      ...education,
      { year: "", degree: "", university: "" },
    ]);
  };

  // Save entire about page
  const handleSave = async () => {
    try {
      await axios.put(`${API}/about/update`, {
        title,
        subtitle,
        bio,
        skills,
        experience,
        education,
        interests,
      });

      toast({
        title: "About page updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        description: "Failed to update.",
      });
    }
  };

  return (
    <Box maxW="900px">
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        About Page – Admin Control
      </Text>

      <VStack spacing={10} align="stretch">

        {/* HEADER SECTION */}
        <Box p={6} borderWidth={1} borderRadius="xl">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Header
          </Text>
          <VStack align="stretch" spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Subtitle</FormLabel>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </FormControl>
          </VStack>
        </Box>

        {/* BIO */}
        <Box p={6} borderWidth={1} borderRadius="xl">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Bio
          </Text>
          <FormControl>
            <FormLabel>Your Bio</FormLabel>
            <Textarea
              rows={6}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormControl>
        </Box>

        {/* SKILLS */}
        <Box p={6} borderWidth={1} borderRadius="xl">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Skills
          </Text>

          <HStack>
            <Input
              placeholder="Add a skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <Button onClick={addSkill}>Add</Button>
          </HStack>

          <VStack align="stretch" mt={4}>
            {skills.map((s, i) => (
              <HStack
                key={i}
                justify="space-between"
                borderWidth={1}
                p={2}
                borderRadius="md"
              >
                <Text>{s}</Text>
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={() =>
                    setSkills(skills.filter((_, idx) => idx !== i))
                  }
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* EXPERIENCE */}
        <Box p={6} borderWidth={1} borderRadius="xl">
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Experience
            </Text>
            <Button leftIcon={<AddIcon />} onClick={addExperience}>
              Add Experience
            </Button>
          </HStack>

          <VStack align="stretch" mt={4} spacing={6}>
            {experience.map((exp, i) => (
              <Box key={i} p={4} borderWidth={1} borderRadius="md">
                <HStack justify="space-between">
                  <Text fontWeight="bold">Experience #{i + 1}</Text>
                  <IconButton
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() =>
                      setExperience(experience.filter((_, idx) => idx !== i))
                    }
                  />
                </HStack>

                <VStack align="stretch" spacing={3} mt={3}>
                  <Input
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => {
                      const updated = [...experience];
                      updated[i].duration = e.target.value;
                      setExperience(updated);
                    }}
                  />
                  <Input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...experience];
                      updated[i].role = e.target.value;
                      setExperience(updated);
                    }}
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...experience];
                      updated[i].company = e.target.value;
                      setExperience(updated);
                    }}
                  />

                  <Textarea
                    placeholder="Bullet points (one per line)"
                    rows={4}
                    value={exp.points.join("\n")}
                    onChange={(e) => {
                      const updated = [...experience];
                      updated[i].points = e.target.value
                        .split("\n")
                        .filter(Boolean);
                      setExperience(updated);
                    }}
                  />
                </VStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* EDUCATION */}
        <Box p={6} borderWidth={1} borderRadius="xl">
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Education
            </Text>
            <Button leftIcon={<AddIcon />} onClick={addEducation}>
              Add Education
            </Button>
          </HStack>

          <VStack align="stretch" mt={4} spacing={6}>
            {education.map((ed, i) => (
              <Box key={i} p={4} borderWidth={1} borderRadius="md">
                <HStack justify="space-between">
                  <Text fontWeight="bold">Education #{i + 1}</Text>
                  <IconButton
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() =>
                      setEducation(education.filter((_, idx) => idx !== i))
                    }
                  />
                </HStack>

                <VStack align="stretch" spacing={3} mt={3}>
                  <Input
                    placeholder="Year"
                    value={ed.year}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[i].year = e.target.value;
                      setEducation(updated);
                    }}
                  />
                  <Input
                    placeholder="Degree"
                    value={ed.degree}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[i].degree = e.target.value;
                      setEducation(updated);
                    }}
                  />
                  <Input
                    placeholder="University"
                    value={ed.university}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[i].university = e.target.value;
                      setEducation(updated);
                    }}
                  />
                </VStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* INTERESTS */}
<Box p={6} borderWidth={1} borderRadius="xl">
  <Text fontSize="xl" fontWeight="bold" mb={4}>
    Personal Interests
  </Text>

  {/* Add New Interest */}
  <HStack mb={4}>
    <Input
      placeholder="Add an interest..."
      value={interestInput}
      onChange={(e) => setInterestInput(e.target.value)}
    />
    <Button colorScheme="blue" onClick={addInterest}>
      Add
    </Button>
  </HStack>

  {/* Interest Pills */}
  <HStack wrap="wrap" spacing={3}>
    {interests.map((int, i) => (
      <HStack
        key={i}
        px={4}
        py={2}
        borderRadius="md"
        bg="blue.600"
        color="white"
        spacing={3}
      >
        <Text>{int}</Text>

        <Button
          size="xs"
          variant="ghost"
          color="whiteAlpha.900"
          _hover={{ bg: "whiteAlpha.300" }}
          onClick={() =>
            setInterests(interests.filter((_, idx) => idx !== i))
          }
        >
          ✕
        </Button>
      </HStack>
    ))}
  </HStack>
</Box>

        {/* SAVE BUTTON */}
        <Button colorScheme="blue" w="full" onClick={handleSave}>
          Save About Page
        </Button>
      </VStack>
    </Box>
  );
}
