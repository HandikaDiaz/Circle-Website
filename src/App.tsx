import React from 'react'
import { RegisterRoute } from "./routes/auth/register";
import { LoginRoute } from './routes/auth/login';
import { Base } from './features/base/component/base';
import { Box } from '@chakra-ui/react';
import { ForgotRoute } from './routes/auth/forgot';
import { ResetRoute } from './routes/auth/reset';
// import { Login, Register } from "./features/auth/component/form";

function App() {
  return (
    <Box>
      {/* <LoginRoute /> */}
      {/* <ForgotRoute /> */}
      {/* <ResetRoute /> */}
      {/* <RegisterRoute /> */}
      <Base />
    </Box>
  )
}

export default App
