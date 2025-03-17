// import { useState } from 'react'
// import './App.css'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BasicTabs from "./components/TabMenu";

function App() {

  return (
    <Container maxWidth="xl" sx={{ paddingTop: '64px' }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bitetodo
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
        <BasicTabs />
      <CssBaseline />
    </Container>
  )
}

export default App
