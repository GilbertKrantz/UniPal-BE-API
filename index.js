import express from 'express';
import cors from 'cors';
import multer from 'multer';
import TextToSpeechService from './API/TextToSpeech/TextToSpeechService.js';
import SpeechToTextService from './API/SpeechToText/SpeechToTextService.js';
import ELTextToSpeech from './API/ELTextToSpeech/ELTextToSpeech.js';
import GenAIService from './API/GenAI/GenAI.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'https://gilbertkrantz.github.io'
}));

const ttsService = new TextToSpeechService(process.env.GOOGLE_TEXT_TO_SPEECH_SERVICE_ACCOUNT);
const stsService = new SpeechToTextService(process.env.SPEECH_TO_TEXT_SERVICE_ACCOUNT);
const eltts = new ELTextToSpeech(process.env.ELEVENLABS_API_KEY);
const aiService = new GenAIService();
await aiService.initialize(process.env.GEMINI_API_KEY);

const upload = multer();

// Generative AI
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Sending message...');
    const { message } = req.body;

    if (!message) {
      return res.status(400).send('Message is required');
    }

    console.log("Generating response...");
    const response = await aiService.send(message);
    res.send({ response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }

});

//  Text to Speech
// Google Text to Speech
app.post('/api/generate', async (req, res) => {
  try {
    console.log('Generating speech...');
    const { text } = req.body;

    if (!text) {
      return res.status(400).send('Text is required');
    }

    const audioContent = await ttsService.generate(text);
    res.set({
      'Content-Type': 'audio/wav',
      'Content-Disposition': 'inline; filename="output.wav"',
    });
    res.send(audioContent);
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ElevenLabs Text to Speech
app.post('/api/elgenerate', async (req, res) => {
  try {
    console.log('Generating ElevenLabs Speech...');
    const { text } = req.body;

    if (!text) {
      return res.status(400).send('Text is required');
    }

    const audioContent = await eltts.generate(text);
    res.set({
      'Content-Type': 'audio/wav',
      'Content-Disposition': 'inline; filename="output.wav"'
    })
    res.send(audioContent);
    console.log('Finished Generating ElevenLabs Speech...');
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Speech to Text
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Audio file is required');
    }
    console.log('Transcribing speech...');
    const audioBuffer = req.file.buffer;
    const transcription = await stsService.transcribe(audioBuffer);
    res.send({ transcription });
  } catch (error) {
    console.error('Error transcribing speech:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
