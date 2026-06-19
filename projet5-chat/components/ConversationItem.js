// /MonChatApp/components/ConversationItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConversationItem({ item, onPress, onPressItem }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Avatar de l'interlocuteur avec indicateur en ligne */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.interlocutorAvatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineBadge} />}
      </View>

      {/* Bloc central */}
      <View style={styles.centerBlock}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.interlocutorName}
          </Text>
          <Text style={styles.time}>{item.lastMessageTime}</Text>
        </View>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.itemTitle}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </View>

      {/* Bloc de droite (Badge + Photo cliquable séparément) */}
      <View style={styles.rightBlock}>
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
        
        {/* On empêche la propagation du clic pour ne déclencher que onPressItem */}
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            onPressItem();
          }}
          activeOpacity={0.8}
        >
          <Image source={{ uri: item.itemPhoto }} style={styles.itemPhoto} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A2A2A',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  centerBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  itemTitle: {
    fontSize: 13,
    color: '#00C853',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 13,
    color: '#AAAAAA',
    flex: 1,
  },
  rightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
  },
  badge: {
    backgroundColor: '#00C853',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemPhoto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
});
