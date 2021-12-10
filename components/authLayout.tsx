import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";

const AuthLayout: NextPage = ({ children }) => {
  return (
    <Flex justify={"center"} align={"center"} w={"100%"} h={"100vh"}>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        mb={"10vh"}
        w={"20rem"}
        bg={"gray.50"}
        p={"5"}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
