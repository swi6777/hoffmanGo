import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default function VideoPage({ navigation }) {
  const { xp } = useSelector(state => state);

  const videos = [
    { id: 1, title: 'Video 1', requiredXp: 2 },
    { id: 2, title: 'Video 2', requiredXp: 5 },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {videos.map(video => (
        <View key={video.id}>
          <Text>{video.title}</Text>
          <Text>Requires {video.requiredXp} XP</Text>
          <Button
            title="Watch"
            onPress={() => alert('Playing ' + video.title)}
            disabled={xp < video.requiredXp}
          />
        </View>
      ))}
    </View>
  );
}
