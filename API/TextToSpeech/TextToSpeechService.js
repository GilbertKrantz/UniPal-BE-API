import textToSpeech from '@google-cloud/text-to-speech';

class TextToSpeechService {
  constructor(credentials) {
    this.client = new textToSpeech.TextToSpeechClient({ credentials });
  }

  async generate(text) {
    const synthesisInput = { text };
    const voice = { languageCode: 'id-ID', name: 'id-ID-Standard-A' };
    const audioConfig = { audioEncoding: 'LINEAR16', speakingRate: 1.0, pitch: 2.0 };

    const [response] = await this.client.synthesizeSpeech({
      input: synthesisInput,
      voice: voice,
      audioConfig: audioConfig,
    });

    return response.audioContent;
  }
}

export default TextToSpeechService;
