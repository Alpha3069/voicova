# Offline Speech-to-Text Flutter App

This app provides a full-featured offline speech-to-text experience using both Vosk and Whisper engines. It includes:
- Home, Recording, Transcript Viewer, Search, Library, and Settings screens
- STT engine abstraction (switch between Vosk and Whisper)
- Model management and offline processing

## Getting Started

### 1. Install Dependencies

```
flutter pub get
```

### 2. Download and Add Models

#### Vosk
- Download a Vosk model (e.g., [vosk-model-small-en-us-0.15](https://alphacephei.com/vosk/models))
- Place the extracted model folder in `assets/models/vosk`
- Update your `pubspec.yaml`:

```
flutter:
  assets:
    - assets/models/vosk/
```

#### Whisper
- Download a Whisper model (e.g., [ggml-tiny.en.bin](https://huggingface.co/ggerganov/whisper.cpp))
- Place the model file in `assets/models/whisper/`
- Update your `pubspec.yaml`:

```
flutter:
  assets:
    - assets/models/whisper/
```

### 3. Run the App

```
flutter run
```

## Plugins Used
- [vosk_flutter](https://pub.dev/packages/vosk_flutter)
- [flutter_whisper](https://pub.dev/packages/flutter_whisper) (or FFI with whisper.cpp)
- [record](https://pub.dev/packages/record) (for audio recording)
- [audio_waveforms](https://pub.dev/packages/audio_waveforms) (for waveform visualization)
- [flutter_tts](https://pub.dev/packages/flutter_tts) (for text-to-speech)

## Notes
- The app is designed for offline use. All models must be downloaded and placed on the device.
- For Whisper, you may need to use FFI or a compatible plugin for your platform.
- For Vosk, ensure the model is compatible with your device (Android/iOS).

## License
- Vosk and Whisper models have their own licenses. Please review them before distributing your app.
