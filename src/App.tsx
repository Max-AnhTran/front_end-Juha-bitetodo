// import { useState } from 'react'
// import './App.css'
import { Css } from '@mui/icons-material'
import TodoList from './components/TodoList'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  return (
    <Container maxWidth="xl">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bitetodo
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <TodoList/>
      <CssBaseline />
    </Container>
  )
}

export default App
