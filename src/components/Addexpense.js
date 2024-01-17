import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SaveExpense() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const paperStyle = {width:500,padding:'50px 20px'};
  const [date,setDate] = React.useState();
  const [amount,setAmount] = useState('');
  const handleclick = (e) => {
    e.preventDefault()
    const expense = {date,amount}
    console.log(expense)
    fetch("http://localhost:8080/expense/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(expense)
  }).then(()=>{console.log("Expense added!")})
  }

  return (
    <div>
    <Container>
        <Paper elevation={3} style={paperStyle}>
      <Button variant="text" size="large" onClick={handleOpen}>Add Expense</Button>
      </Paper>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the details
          </Typography>         
          <TextField id="expense-date" label="DATE" variant="outlined" 
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          />
          <TextField id="expense-amount" label="AMOUNT" variant="outlined" 
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleclick}>ADD</Button>
          </Typography>
        </Box>
      </Modal>     
    </div>   
  );
}