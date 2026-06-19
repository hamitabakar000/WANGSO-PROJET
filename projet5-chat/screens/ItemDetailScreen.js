// /MonChatApp/screens/ItemDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

export default function ItemDetailScreen({ route, navigation }) {
  const {
    itemTitle,
    itemPhoto,
    itemPrice,
    itemDescription,
    itemCondition,
    itemLocation,
    sellerName,
    sellerAvatar,
    sellerRating,
    sellerReviewsCount,
    isOnline,
    category,
  } = route.params;

  // Zoom basique avec Animated
  const scale = new Animated.Value(1);

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Zone de l'image zoomable */}
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <Animated.View style={styles.imageContainer}>
          <Animated.Image
            source={{ uri: itemPhoto }}
            style={[styles.itemImage, { transform: [{ scale: scale }] }]}
            resizeMode="cover"
          />
        </Animated.View>
      </PinchGestureHandler>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title} numberOfLines={2}>{itemTitle}</Text>
          </View>
          <Text style={styles.price}>{itemPrice} DH</Text>
        </View>

        {/* Badges de métadonnées */}
        <View style={styles.badgesRow}>
          {itemCondition && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🏷️ {itemCondition}</Text>
            </View>
          )}
          {itemLocation && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>📍 {itemLocation}</Text>
            </View>
          )}
          {category && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>📦 {category}</Text>
            </View>
          )}
        </View>

        <View style={styles.sellerInfo}>
          <View style={styles.sellerAvatarContainer}>
            <Image source={{ uri: sellerAvatar }} style={styles.avatar} />
            {isOnline && <View style={styles.onlineBadge} />}
          </View>
          <View style={styles.sellerTextContainer}>
            <Text style={styles.sellerName}>{sellerName}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>⭐ {sellerRating}</Text>
              <Text style={styles.reviewsText}>({sellerReviewsCount} avis)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {itemDescription || "Aucune description fournie par le vendeur."}
        </Text>
        
        {/* Espacement de fin pour scroll propre */}
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => navigation.navigate('Chat', {
            ...route.params,
            currentUserId: 'user_acheteur_1',
            currentUserRole: 'acheteur',
          })}
          activeOpacity={0.8}
        >
          <Text style={styles.contactBtnText}>Contacter {sellerName.split(' ')[0]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // Dark Mode
  },
  imageContainer: {
    width: '100%',
    height: 350,
    overflow: 'hidden', 
    backgroundColor: '#1A1A1A',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C853',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  badgeText: {
    color: '#CCCCCC',
    fontSize: 13,
    fontWeight: '500',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  sellerAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A2A2A',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  sellerTextContainer: {
    justifyContent: 'center',
  },
  sellerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700', // Jaune or pour l'étoile
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  reviewsText: {
    color: '#AAAAAA',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    backgroundColor: '#0D0D0D',
  },
  contactBtn: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
