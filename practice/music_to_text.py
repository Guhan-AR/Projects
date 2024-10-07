import mido

# Load MIDI file
midi = mido.MidiFile('sample.mid')

# Parse through MIDI messages and print note information
for track in midi.tracks:
    print(f"Track: {track.name}")
    for msg in track:
        if msg.type == 'note_on' or msg.type == 'note_off':
            note = msg.note
            velocity = msg.velocity
            time = msg.time
            if msg.type == 'note_on' and msg.velocity > 0:
                print(f"Note ON - Note: {note}, Velocity: {velocity}, Time: {time}")
            elif msg.type == 'note_off' or (msg.type == 'note_on' and msg.velocity == 0):
                print(f"Note OFF - Note: {note}, Time: {time}")