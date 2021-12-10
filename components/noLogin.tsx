import { Button, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const NoLogin: NextPage = () => {
  const router = useRouter();
  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      bg={"gray.50"}
      justify={"center"}
      align={"center"}
    >
      <Flex mt={"10vh"} justify={"center"} mb={"20vh"} align={"center"}>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Text fontSize="lg" mx={"5rem"}>
          or
        </Text>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default NoLogin;
