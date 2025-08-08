import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Speech2Text'),
        actions: [
          IconButton(icon: Icon(Icons.calendar_today), onPressed: () {}),
          IconButton(icon: Icon(Icons.settings), onPressed: () {}),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.mic),
        tooltip: 'New Recording',
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              child: ListTile(
                leading: Icon(Icons.bar_chart),
                title: Text('You recorded 4 lectures this week'),
              ),
            ),
            SizedBox(height: 12),
            Wrap(
              spacing: 8,
              children: [
                Chip(label: Text('Lecture')),
                Chip(label: Text('Meeting')),
                Chip(label: Text('Note')),
              ],
            ),
            SizedBox(height: 12),
            TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                hintText: 'Search transcripts...'
              ),
            ),
            SizedBox(height: 16),
            Text('Recent Transcripts', style: Theme.of(context).textTheme.titleMedium),
            Expanded(
              child: ListView(
                children: [
                  ListTile(
                    title: Text('Meeting with John'),
                    subtitle: Text('Today · Meeting'),
                    trailing: Icon(Icons.arrow_forward_ios, size: 16),
                  ),
                  ListTile(
                    title: Text('Physics Lecture'),
                    subtitle: Text('Yesterday · Lecture'),
                    trailing: Icon(Icons.arrow_forward_ios, size: 16),
                  ),
                  ListTile(
                    title: Text('Grocery List'),
                    subtitle: Text('2 days ago · Note'),
                    trailing: Icon(Icons.arrow_forward_ios, size: 16),
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Icon(Icons.brightness_6),
                Switch(value: false, onChanged: (v) {}),
              ],
            ),
          ],
        ),
      ),
    );
  }
}