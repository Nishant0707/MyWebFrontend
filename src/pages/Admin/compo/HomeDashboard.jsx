import {
  Box, Text, Input, Textarea, Button, VStack,
  FormControl, FormLabel, HStack, useToast
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeDashboard() {
  const API = import.meta.env.VITE_API_URL;
  const toast = useToast();

  const [heading, setHeading] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${API}/home`);
    if (res.data) {
      setHeading(res.data.heading || "");
      setBio(res.data.bio || "");
      setLinkedin(res.data.socials?.linkedin || "");
      setGithub(res.data.socials?.github || "");
      setTwitter(res.data.socials?.twitter || "");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("heading", heading);
    formData.append("bio", bio);
    formData.append("linkedin", linkedin);
    formData.append("github", github);
    formData.append("twitter", twitter);

    if (profileImage) formData.append("profileImage", profileImage);
    if (resumeFile) formData.append("resumeFile", resumeFile);

    await axios.put(`${API}/home/update`, formData);

    toast({
      title: "Homepage updated!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="700px">
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Home Dashboard
      </Text>

      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Heading</FormLabel>
          <Input value={heading} onChange={(e) => setHeading(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormControl>

        <HStack w="100%">
          <FormControl>
            <FormLabel>LinkedIn</FormLabel>
            <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>GitHub</FormLabel>
            <Input value={github} onChange={(e) => setGithub(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Twitter</FormLabel>
            <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <Input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
        </FormControl>

        <FormControl>
          <FormLabel>Resume PDF</FormLabel>
          <Input type="file" onChange={(e) => setResumeFile(e.target.files[0])} />
        </FormControl>

        <Button colorScheme="blue" w="full" onClick={handleSubmit}>
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}
