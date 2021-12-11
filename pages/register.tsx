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
  HStack,
  PinInputField,
  PinInput,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { resolveAny } from "dns";

const Register: NextPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [requiredOtp, setRequiredOtp] = useState(false);
  const [tempOtpToken, setTempOtpToken] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/register", {
      data: {
        username,
        password,
        number,
      },
    });

    console.log(res);
    if (res.data.status === "success") {
      setJwtToken(res.data.token);
      setRequiredOtp(true);
      setTempOtpToken(res.data.otp_token);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const res = await axios("/api/verify-otp", {
      method: "POST",
      data: {
        userOtp,
        tempOtpToken,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "success") {
      localStorage.setItem("jwt-token", jwtToken);
      await router.push("/");
    }
  };

  if (requiredOtp) {
    return (
      <AuthLayout>
        <Flex
          w={"100%"}
          justify={"center"}
          align={"center"}
          direction={"column"}
        >
          <form>
            <FormControl id="otp" isRequired>
              <HStack>
                <PinInput
                  otp
                  mask
                  // @ts-ignore
                  onChange={(event) => setUserOtp(parseInt(event, 10))}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </FormControl>
            <Button
              colorScheme={"green"}
              w={"100%"}
              mt={8}
              type="submit"
              onClick={handleSubmitOtp}
            >
              Register
            </Button>
          </form>
        </Flex>
      </AuthLayout>
    );
  } else {
    return (
      <AuthLayout>
        <Flex w={"100%"} position={"absolute"}>
          <Text fontSize="2xl" color={"gray.600"}>
            Register
          </Text>
        </Flex>
        <form>
          <FormControl id="username" isRequired>
            <FormLabel mt={10}>Username</FormLabel>
            <Input
              placeholder="Name"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
            <Text fontSize="xs" color="gray.500">
              Ex - krishnakumar
            </Text>
          </FormControl>
          <FormControl id="number" isRequired>
            <FormLabel mt={5}>Number</FormLabel>
            <Input
              placeholder="Number"
              id="number"
              onChange={(event) => setNumber(event.currentTarget.value)}
            />
            <Text fontSize="xs" color="gray.500">
              Ex - +919876543210, +19876543210
            </Text>
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
            Get OTP
          </Button>
        </form>
      </AuthLayout>
    );
  }
};

export default Register;
