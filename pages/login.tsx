import type { NextPage } from "next";
import AuthLayout from "../components/authLayout";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios("/api/login", {
      method: "POST",
      data: {
        username,
        password,
      },
    });
  };
  return (
    <AuthLayout>
      <Flex w={"100%"} position={"absolute"}>
        <Text fontSize="2xl" color={"gray.600"}>
          Login
        </Text>
      </Flex>
      <form>
        <FormControl id="username" isRequired>
          <FormLabel mt={10}>Username</FormLabel>
          <Input
            placeholder="Name"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel mt={5}>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              id="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme={"blue"}
          w={"100%"}
          mt={8}
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
