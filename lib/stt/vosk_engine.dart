import 'dart:async';
import 'package:vosk_flutter/vosk_flutter.dart';
import 'stt_engine.dart';

/// Place your Vosk model in the assets/models/vosk directory and update pubspec.yaml accordingly.
/// Download models from https://alphacephei.com/vosk/models
class VoskEngine implements SpeechToTextEngine {
  VoskModel? _model;
  SpeechService? _service;
  final _controller = StreamController<String>.broadcast();

  @override
  Future<void> initialize() async {
    _model = VoskModel();
    await _model!.init('assets/models/vosk'); // Path to your Vosk model
    _service = SpeechService(_model!);
    _service!.onPartial = (partial) {
      _controller.add(partial);
    };
    _service!.onResult = (result) {
      _controller.add(result);
    };
  }

  @override
  Future<void> start() async {
    await _service?.start();
  }

  @override
  Future<void> stop() async {
    await _service?.stop();
  }

  @override
  Stream<String> get transcriptionStream => _controller.stream;

  @override
  void dispose() {
    _controller.close();
    _service?.dispose();
    _model?.dispose();
  }
}