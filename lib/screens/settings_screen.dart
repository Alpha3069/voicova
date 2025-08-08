import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            ListTile(
              title: Text('STT Model'),
              trailing: DropdownButton<String>(
                value: 'Whisper',
                items: [
                  DropdownMenuItem(value: 'Whisper', child: Text('Whisper')),
                  DropdownMenuItem(value: 'Vosk', child: Text('Vosk')),
                ],
                onChanged: (v) {},
              ),
            ),
            ListTile(
              title: Text('Language/Accent'),
              trailing: DropdownButton<String>(
                value: 'English',
                items: [
                  DropdownMenuItem(value: 'English', child: Text('English')),
                  DropdownMenuItem(value: 'Spanish', child: Text('Spanish')),
                ],
                onChanged: (v) {},
              ),
            ),
            SwitchListTile(
              title: Text('Noise Reduction'),
              value: true,
              onChanged: (v) {},
            ),
            SwitchListTile(
              title: Text('NLP Features (Summarization, Action Detection)'),
              value: true,
              onChanged: (v) {},
            ),
            SwitchListTile(
              title: Text('Dark Theme'),
              value: false,
              onChanged: (v) {},
            ),
            ListTile(
              title: Text('Default Save Folder'),
              trailing: Icon(Icons.folder),
              onTap: () {},
            ),
            ListTile(
              title: Text('Update Models'),
              trailing: Icon(Icons.system_update),
              onTap: () {},
            ),
            ListTile(
              title: Text('Export/Backup Settings'),
              trailing: Icon(Icons.backup),
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}