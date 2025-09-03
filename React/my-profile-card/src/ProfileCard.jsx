import { Card, CardBody, CardFooter, Image, Heading, Text, Stack, Button, Tag, HStack } from "@chakra-ui/react";

function ProfileCard() {
  return (
    <Card maxW="sm" boxShadow="lg" borderRadius="2xl">
      <CardBody>
        {/* Profile image */}
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Profile"
          borderRadius="full"
          boxSize="120px"
          mx="auto"
        />

        {/* Name + username */}
        <Stack mt="4" textAlign="center" spacing="2">
          <Heading size="md">John Doe</Heading>
          <Text color="gray.500">@johndoe</Text>
        </Stack>

        {/* Description */}
        <Text mt="3" fontSize="sm" textAlign="center">
          Full-stack developer passionate about React, Node.js, and open-source.
        </Text>

        {/* Tags */}
        <HStack justify="center" spacing="2" mt="3">
          <Tag colorScheme="blue">React</Tag>
          <Tag colorScheme="green">Node.js</Tag>
          <Tag colorScheme="purple">OpenSource</Tag>
        </HStack>
      </CardBody>

      <CardFooter justify="center" gap="3">
        <Button colorScheme="blue">Follow</Button>
        <Button variant="outline" colorScheme="blue">Message</Button>
      </CardFooter>
    </Card>
  );
}

export default ProfileCard;
