import textToSpeech from '@google-cloud/text-to-speech';

const credentials = {
  "type": "service_account",
  "project_id": "unipal-427212",
  "private_key_id": "ee3dfd6d305620c6ad1c91ce9d6320e461f6d242",
  "private_key": process.env.GOOGLE_TEXT_TO_SPEECH_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": "unipal-text-to-speech@unipal-427212.iam.gserviceaccount.com",
  "client_id": "117693781558379062557",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/unipal-text-to-speech%40unipal-427212.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

class TextToSpeechService {
  constructor() {
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
