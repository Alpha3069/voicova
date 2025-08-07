abstract class SpeechToTextEngine {
  Future<void> initialize();
  Future<void> start();
  Future<void> stop();
  Stream<String> get transcriptionStream;
  void dispose();
}