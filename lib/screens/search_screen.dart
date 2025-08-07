import 'package:flutter/material.dart';

class SearchScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                hintText: 'Search transcripts...'
              ),
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
                Text('Sort by:'),
                SizedBox(width: 8),
                DropdownButton<String>(
                  value: 'Date',
                  items: [
                    DropdownMenuItem(value: 'Date', child: Text('Date')),
                    DropdownMenuItem(value: 'Name', child: Text('Name')),
                    DropdownMenuItem(value: 'Length', child: Text('Length')),
                  ],
                  onChanged: (v) {},
                ),
              ],
            ),
            SizedBox(height: 12),
            Expanded(
              child: ListView(
                children: [
                  ListTile(
                    title: Text('Meeting with John'),
                    subtitle: Text('Snippet: ...discussed project timeline...'),
                  ),
                  ListTile(
                    title: Text('Physics Lecture'),
                    subtitle: Text('Snippet: ...quantum mechanics introduction...'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}