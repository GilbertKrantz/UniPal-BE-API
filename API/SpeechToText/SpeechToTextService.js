import speech from '@google-cloud/speech';

class SpeechToTextService {
  constructor(credentials) {
    this.client = new speech.SpeechClient({ credentials });
  }

  async transcribe(audioBuffer) {
    const audio = { content: audioBuffer.toString('base64') };
    const config = { encoding: 'WEBM_OPUS', sampleRateHertz: 48000, languageCode: 'id-ID' };

    const request = { audio: audio, config: config };

    const [response] = await this.client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

    return transcription;
  }
}

export default SpeechToTextService;
