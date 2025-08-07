import 'package:flutter/material.dart';

class LibraryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Library'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('View:'),
                ToggleButtons(
                  isSelected: [true, false],
                  children: [Icon(Icons.list), Icon(Icons.grid_view)],
                  onPressed: (i) {},
                ),
              ],
            ),
            SizedBox(height: 12),
            Wrap(
              spacing: 8,
              children: [
                FilterChip(label: Text('Lecture'), selected: false, onSelected: (v) {}),
                FilterChip(label: Text('Meeting'), selected: false, onSelected: (v) {}),
                FilterChip(label: Text('Note'), selected: false, onSelected: (v) {}),
              ],
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Text('Tags:'),
                SizedBox(width: 8),
                Chip(label: Text('Lecture')), 
                Chip(label: Text('Meeting')),
                IconButton(icon: Icon(Icons.edit), onPressed: () {}),
              ],
            ),
            SizedBox(height: 12),
            Expanded(
              child: ListView(
                children: [
                  Card(
                    child: ListTile(
                      title: Text('Meeting with John'),
                      subtitle: Text('Duration: 12m · Meeting'),
                      trailing: Icon(Icons.info_outline),
                    ),
                  ),
                  Card(
                    child: ListTile(
                      title: Text('Physics Lecture'),
                      subtitle: Text('Duration: 45m · Lecture'),
                      trailing: Icon(Icons.info_outline),
                    ),
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                ElevatedButton.icon(
                  icon: Icon(Icons.delete),
                  label: Text('Batch Delete'),
                  onPressed: () {},
                ),
                SizedBox(width: 8),
                ElevatedButton.icon(
                  icon: Icon(Icons.upload_file),
                  label: Text('Batch Export'),
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