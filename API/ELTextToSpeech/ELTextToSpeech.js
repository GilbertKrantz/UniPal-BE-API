import { ElevenLabsClient, play } from 'elevenlabs';
import { createWriteStream, readFileSync } from 'fs';

class ELTextToSpeech {
  // constructor(credentialsPath){
  //     const credentials = readFileSync(credentialsPath);
  //     this.client = new ElevenLabsClient({
  //         apiKey: credentials
  //     });
  // }

  constructor(apiKey){
    this.client = new ElevenLabsClient({
        apiKey
    });
  }

  async generate(text) {
    const audio = await this.client.generate({
      voice: "Someone V2",
      model_id: "eleven_multilingual_v2",
      text,
    });

    const audioChunks = [];
    for await (const chunk of audio) {
      audioChunks.push(chunk);
    }

    const audioContent = Buffer.concat(audioChunks);

    return audioContent;

  }
}

export default ELTextToSpeech