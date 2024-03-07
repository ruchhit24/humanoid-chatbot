import React, { useState } from 'react';
import photo from "../assets/vecteezy_chatgpt-logo-transparent-background_22841114.png";
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LinearProgress, TextField } from "@mui/material";
import axios from "axios"; 
import ChatResponse from "./components/ChatResponse"; 

const App = () => {
  const [open, setOpen] = useState(false);
  const [speechPrompt, setSpeechPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [listeningStatus , setListeningStatus] = useState(false);

  const startRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => { 
      const speechToText = event.results[0][0].transcript;
      console.log('Speech recognized:', speechToText);
      setSpeechPrompt(speechToText);  
      setListeningStatus(false)
    };
    
    recognition.onend = () => { 
      console.log('Speech recognition ended');
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const Prompt = speechPrompt || prompt;
    const response = await axios.post("http://localhost:8080/chat", { userPrompt: Prompt });
    setRes(response);
    setLoading(false);
    speakResponse(response.data);
  };

  const speakResponse = (text) => {
    const synthesisUtterance = new SpeechSynthesisUtterance(text);
   window.speechSynthesis.speak(synthesisUtterance);
     setSpeechPrompt('')
  };

  return (
    <div className="w-full h-screen bg-[#1e1e25]">
      <div className="flex flex-col justify-center items-center pt-16">
        <img
          src={photo}
          alt="hdh"
          width={350}
          height={350} 
        />

        <button onClick={() => setOpen(true)} className="text-white font-semibold cursor-pointer hover:scale-110 border-[1px] tracking-tight duration-700 bg-gradient-to-l from-green-700 to-green-900 px-4 py-2 rounded-lg text-lg mt-16 capitalize">
          Ask me anything
        </button> 
 

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex flex-col justify-center items-center"
        >
          <Box className="bg-white w-[50vw] rounded-lg p-4 bg-opacity-90">
            <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
              What Do You Want to Ask
            </Typography>
             <form className="flex flex-col" onSubmit={handleSubmit}>
             <div className="flex justify-between">
               <TextField value={speechPrompt || prompt} onChange={(e) => setPrompt(e.target.value)} id="outlined-basic" label="Prompt" variant="outlined" sx={{width : "90%"}}/>
               <button type="button" onClick={() => {startRecognition() ; setListeningStatus(true);}} class="w-12 h-12 hover:scale-125 duration-700"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-xl" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></svg></button>
                
             </div>
             <button type="submit" className="text-white font-semibold cursor-pointer border-[1px] tracking-tight bg-gradient-to-l from-green-700 to-green-900 px-8 py-2 mx-auto rounded-lg text-md mt-4 capitalize">{listeningStatus ? "Listening" : "Submit"}</button>
             </form>
            {res && <ChatResponse response={res}/>}
            {loading && <LinearProgress sx={{ margin : "20px 0" }} />}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default App;
