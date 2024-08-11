import speech from '@google-cloud/speech';

const credentials = {
    "type": "service_account",
    "project_id": "unipal-427212",
    "private_key_id": "1f46f83b36b32e636fbfb37f73a57f48565f22fe",
    "private_key": process.env.SPEECH_TO_TEXT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": "unipal-speech-to-text@unipal-427212.iam.gserviceaccount.com",
    "client_id": "110353947910193761463",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/unipal-speech-to-text%40unipal-427212.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

class SpeechToTextService {
  constructor() {
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
