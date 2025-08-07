import 'package:flutter/material.dart';

class TranscriptViewer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Transcript'),
        actions: [
          IconButton(icon: Icon(Icons.edit), onPressed: () {}),
          IconButton(icon: Icon(Icons.share), onPressed: () {}),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            TextField(
              decoration: InputDecoration(
                hintText: 'Edit transcript...',
                border: OutlineInputBorder(),
              ),
              maxLines: 8,
            ),
            SizedBox(height: 12),
            TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                hintText: 'Search in transcript...'
              ),
            ),
            SizedBox(height: 12),
            Row(
              children: [
                IconButton(icon: Icon(Icons.play_arrow), onPressed: () {}),
                IconButton(icon: Icon(Icons.pause), onPressed: () {}),
                Text('TTS Playback'),
              ],
            ),
            SizedBox(height: 12),
            ExpansionTile(
              title: Text('Bookmarks'),
              children: [
                ListTile(title: Text('00:00:12 - Important point')), 
                ListTile(title: Text('00:03:45 - Action item')), 
              ],
            ),
            ExpansionTile(
              title: Text('Summary'),
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text('This is a summary of the transcript...'),
                ),
              ],
            ),
            Row(
              children: [
                ElevatedButton.icon(
                  icon: Icon(Icons.picture_as_pdf),
                  label: Text('Export'),
                  onPressed: () {},
                ),
                SizedBox(width: 8),
                ElevatedButton.icon(
                  icon: Icon(Icons.share),
                  label: Text('Share'),
                  onPressed: () {},
                ),
              ],
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Chip(label: Text('Lecture')), 
                Chip(label: Text('Meeting')),
                IconButton(icon: Icon(Icons.add), onPressed: () {}),
              ],
            ),
            SizedBox(height: 12),
            ElevatedButton.icon(
              icon: Icon(Icons.calendar_today),
              label: Text('Create Reminder'),
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}