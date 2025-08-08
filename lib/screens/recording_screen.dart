import 'package:flutter/material.dart';

class RecordingScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Recording'),
        actions: [
          DropdownButton<String>(
            underline: SizedBox(),
            icon: Icon(Icons.label, color: Colors.white),
            items: [
              DropdownMenuItem(value: 'Lecture', child: Text('Lecture')),
              DropdownMenuItem(value: 'Meeting', child: Text('Meeting')),
            ],
            onChanged: (v) {},
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Container(
              height: 60,
              color: Colors.blue[50],
              child: Center(child: Text('Waveform Visualization')),
            ),
            SizedBox(height: 12),
            Text('00:01:23', style: TextStyle(fontSize: 24)),
            SizedBox(height: 12),
            Container(
              height: 100,
              padding: EdgeInsets.all(8),
              color: Colors.grey[200],
              child: SingleChildScrollView(
                child: Text('Hello, this is a test of the real-time transcription...'),
              ),
            ),
            SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.noise_aware),
                    Switch(value: true, onChanged: (v) {}),
                    Text('Noise Reduction'),
                  ],
                ),
                IconButton(
                  icon: Icon(Icons.bookmark),
                  onPressed: () {},
                  tooltip: 'Bookmark',
                ),
              ],
            ),
            Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton.icon(
                  icon: Icon(Icons.play_arrow),
                  label: Text('Start'),
                  onPressed: () {},
                ),
                ElevatedButton.icon(
                  icon: Icon(Icons.pause),
                  label: Text('Pause'),
                  onPressed: () {},
                ),
                ElevatedButton.icon(
                  icon: Icon(Icons.stop),
                  label: Text('Stop'),
                  onPressed: () {},
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}