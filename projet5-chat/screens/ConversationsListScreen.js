// /MonChatApp/screens/ConversationsListScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { conversations } from '../data/mockData';
import ConversationItem from '../components/ConversationItem';

export default function ConversationsListScreen({ navigation }) {
  const renderItem = ({ item }) => {
    // Regroupement des props pour faciliter le passage entre écrans
    const navigationProps = {
      conversationId: item.id,
      interlocutorName: item.interlocutorName,
      interlocutorAvatar: item.interlocutorAvatar,
      itemTitle: item.itemTitle,
      itemPhoto: item.itemPhoto,
      itemPrice: item.itemPrice,
      itemDescription: item.itemDescription,
      itemCondition: item.itemCondition,
      itemLocation: item.itemLocation,
      sellerRating: item.sellerRating,
      sellerReviewsCount: item.sellerReviewsCount,
      isOnline: item.isOnline,
      category: item.category,
    };

    return (
      <ConversationItem
        item={item}
        onPress={() =>
          navigation.navigate('Chat', {
            ...navigationProps,
            currentUserId: 'user_acheteur_1',
            currentUserRole: item.id === 'conv_2' ? 'vendeur' : 'acheteur',
          })
        }
        onPressItem={() =>
          navigation.navigate('ItemDetail', {
            ...navigationProps,
            sellerName: item.interlocutorName,
            sellerAvatar: item.interlocutorAvatar,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Mes Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
