import photo from "../assets/vecteezy_chatgpt-logo-transparent-background_22841114.png";
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios"; 

const App = () => {
  const[open,setOpen]= useState(false);
  const[prompt,setPrompt] = useState("");
  const[res,setRes]= useState("");
  const[loading,setLoading]=useState(false);

  const handleOpen = ()=>{
    setOpen(true);
  }
  const handleClose = ()=>{
    setOpen(false);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    const res = await axios.post("http://localhost:8080/chat",{prompt});
    setRes(res);
    setLoading(false)
    console.log(res)
  }
  return (
    <div className="w-full h-screen bg-[#1e1e25]">
      <div className="flex flex-col justify-center items-center pt-16">
        <img
          src={photo}
          alt="hdh"
          width={350}
          height={350} 
        />

        <button onClick={handleOpen} className="text-white font-semibold cursor-pointer hover:scale-110 border-[1px] tracking-tight duration-700 bg-gradient-to-l from-green-700 to-green-900 px-4 py-2 rounded-lg text-lg mt-16 capitalize">
          ask me anything
        </button> 
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className=" flex flex-col justify-center items-center"
        >
          <Box className="bg-white w-[50vw] h-[25vh] rounded-lg p-4 bg-opacity-90">
            <Typography variant="h6" component="h2" sx={{fontWeight : "bold"}}>
              What Do You Want to Ask
            </Typography>
             <form className="flex flex-col" onSubmit={(e)=>handleSubmit(e)}>
             <TextField value={prompt} onChange={(e)=>setPrompt(e.target.value)} id="outlined-basic" label="Prompt" variant="outlined" />
             <button className="text-white font-semibold cursor-pointer border-[1px] tracking-tight bg-gradient-to-l from-green-700 to-green-900 px-8 py-2 mx-auto rounded-lg text-md mt-4 capitalize">Submit</button>
             </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default App;
