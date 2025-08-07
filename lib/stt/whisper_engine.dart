import 'dart:async';
import 'stt_engine.dart';
// import 'package:flutter_whisper/flutter_whisper.dart'; // Uncomment if using flutter_whisper

/// Place your Whisper model in the assets/models/whisper directory and update pubspec.yaml accordingly.
/// Download models from https://huggingface.co/ggerganov/whisper.cpp
class WhisperEngine implements SpeechToTextEngine {
  // WhisperModel? _model;
  // WhisperService? _service;
  final _controller = StreamController<String>.broadcast();

  @override
  Future<void> initialize() async {
    // _model = WhisperModel();
    // await _model!.init('assets/models/whisper/ggml-tiny.en.bin');
    // _service = WhisperService(_model!);
    // _service!.onResult = (result) {
    //   _controller.add(result);
    // };
  }

  @override
  Future<void> start() async {
    // await _service?.start();
  }

  @override
  Future<void> stop() async {
    // await _service?.stop();
  }

  @override
  Stream<String> get transcriptionStream => _controller.stream;

  @override
  void dispose() {
    _controller.close();
    // _service?.dispose();
    // _model?.dispose();
  }
}