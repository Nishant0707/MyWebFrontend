// C:\Mypot\frontend\fro\src\pages\Splash\splashScreen.jsx

import { Box, Text, Button, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function SplashScreen() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
      gsap.to(bgRef.current, {
        backgroundPosition: "300% 300%",
        duration: 18,
        ease: "linear",
        repeat: -1,
      });
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.2,
        }
      );
      gsap.to(contentRef.current, {
        y: -6,
        duration: 3,
        ease: "easeInOut",
        repeat: -1,
        yoyo: true,
      });
    });

    mm.add("(max-width: 599px)", () => {
      gsap.to(bgRef.current, {
        backgroundPosition: "150% 150%",
        duration: 10,
        ease: "linear",
        repeat: -1,
      });
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.1,
        }
      );
      gsap.to(contentRef.current, {
        y: -3,
        duration: 1.9,
        ease: "easeInOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <Box
      ref={bgRef}
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear-gradient(135deg, #f3f7ff, #e5f0ff, #f8fbff)"
      bgSize="300% 300%"
      position="relative"
      overflow="hidden"
    >
      {/* Centered content but shifted upward */}
      <Box
        ref={contentRef}
        textAlign="center"
        position="absolute"
        width="100%"
        maxW="700px"
        px={{ base: 6, md: 0 }}
        left="50%"
        top="42%"
        sx={{ transform: "translateX(-50%)" }}
      >
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="extrabold"
          color="gray.900"
          lineHeight="1.1"
        >
          Dive into
        </Text>

        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="extrabold"
          bgGradient="linear(to-r, #2563eb, #3b82f6)"
          bgClip="text"
          mt={1}
        >
          Nishant&apos;s world!
        </Text>

        <Text
          mt={6}
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          maxW="420px"
          mx="auto"
        >
          Explore my projects, skills, and journey in the world of design and development.
        </Text>

        <Button
          mt={8}
          size="lg"
          px={8}
          borderRadius="999px"
          fontSize={{ base: "sm", md: "md" }}
          bgGradient="linear(to-r, #2563eb, #3b82f6)"
          color="white"
          boxShadow="0 14px 35px rgba(37, 99, 235, 0.4)"
          _hover={{
            transform: "translateY(-2px) scale(1.03)",
            boxShadow: "0 18px 40px rgba(37, 99, 235, 0.55)",
          }}
          _active={{
            transform: "translateY(0) scale(0.99)",
            boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
          }}
          transition="all 0.2s ease-out"
          onClick={() => navigate("/home")}
        >
          <HStack spacing={2}>
            <Text>Start Exploring</Text>
            <Icon as={FiArrowRight} />
          </HStack>
        </Button>
      </Box>
    </Box>
  );
}
