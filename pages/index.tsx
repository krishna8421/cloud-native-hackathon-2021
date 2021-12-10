import { Box, Flex, Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import NoLogin from "../components/noLogin";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const session = localStorage.getItem("jwt-token")

  console.log(session);
  

  if (!isLogin) {
    return <NoLogin />;
  }
  return <Box>LOGIN</Box>;
};

export default Home;
