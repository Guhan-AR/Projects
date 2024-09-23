import mido
from mido import Message, MidiFile, MidiTrack

# Create a new MIDI file and add a track
mid = MidiFile()
track = MidiTrack()
mid.tracks.append(track)

# Define your note events from text (simplified as an example)
notes = [
    {'type': 'on', 'note': 60, 'velocity': 100, 'time': 0},  # C4
    {'type': 'off', 'note': 60, 'time': 1000},
    {'type': 'on', 'note': 62, 'velocity': 100, 'time': 0},  # D4
    {'type': 'off', 'note': 62, 'time': 1000},
    {'type': 'on', 'note': 64, 'velocity': 100, 'time': 0},  # E4
    {'type': 'off', 'note': 64, 'time': 1000}
]
# Add each note to the track
for event in notes:
    if event['type'] == 'on':
        track.append(Message('note_on', note=event['note'], velocity=event['velocity'], time=event['time']))
    elif event['type'] == 'off':
        track.append(Message('note_off', note=event['note'], time=event['time']))

# Save the MIDI file
mid.save('output_melody_2.mid')
print("MIDI file created successfully!")