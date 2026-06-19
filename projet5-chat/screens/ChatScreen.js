// /MonChatApp/screens/ChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { GiftedChat, Bubble, Message, InputToolbar } from 'react-native-gifted-chat';
import OfferModal from '../components/OfferModal';
import OfferCard from '../components/OfferCard';
import { initialMessages } from '../data/mockData';

export default function ChatScreen({ route, navigation }) {
  const {
    conversationId,
    interlocutorName,
    interlocutorAvatar,
    itemTitle,
    itemPhoto,
    itemPrice,
    itemDescription,
    itemCondition,
    itemLocation,
    sellerRating,
    sellerReviewsCount,
    isOnline,
    category,
    currentUserId,
    currentUserRole,
  } = route.params;

  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [conversationId]);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    simulateResponse();
  }, []);

  const simulateResponse = () => {
    setTimeout(() => {
      const responseMsg = {
        _id: Math.random().toString(),
        text: "D'accord, je comprends. On peut en discuter.",
        createdAt: new Date(),
        user: { _id: 2, name: interlocutorName, avatar: interlocutorAvatar },
        type: 'text',
      };
      setMessages((prev) => GiftedChat.append(prev, [responseMsg]));
    }, 2000);
  };

  const handleSendOffer = (amount) => {
    const offerMsg = {
      _id: Math.random().toString(),
      text: '',
      createdAt: new Date(),
      user: { _id: 1, name: 'Moi' },
      type: 'offer',
      offerData: {
        amount,
        originalPrice: itemPrice,
        status: 'pending',
        offerId: `offer_${Date.now()}`,
      },
    };
    onSend([offerMsg]);
    setModalVisible(false);
  };

  const handleAcceptOffer = (offerId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.offerData && msg.offerData.offerId === offerId) {
          return { ...msg, offerData: { ...msg.offerData, status: 'accepted' } };
        }
        return msg;
      })
    );
  };

  const handleRefuseOffer = (offerId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.offerData && msg.offerData.offerId === offerId) {
          return { ...msg, offerData: { ...msg.offerData, status: 'refused' } };
        }
        return msg;
      })
    );
  };

  const renderMessage = (props) => {
    const { currentMessage } = props;
    if (currentMessage.type === 'offer') {
      const isMyMessage = currentMessage.user._id === 1;
      const senderName = isMyMessage ? 'Moi' : interlocutorName;

      return (
        <View style={[styles.offerMessageContainer, isMyMessage ? styles.offerMessageRight : styles.offerMessageLeft]}>
          <OfferCard
            offerData={currentMessage.offerData}
            senderName={senderName}
            currentUserRole={currentUserRole}
            onAccept={() => handleAcceptOffer(currentMessage.offerData.offerId)}
            onRefuse={() => handleRefuseOffer(currentMessage.offerData.offerId)}
          />
        </View>
      );
    }
    return <Message {...props} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#00C853' },
          left: { backgroundColor: '#1E1E1E' },
        }}
        textStyle={{
          right: { color: '#FFFFFF' },
          left: { color: '#FFFFFF' },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#1A1A1A',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SOMBRE */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{'< Retour'}</Text>
        </TouchableOpacity>

        {/* Clic sur l'en-tête pour voir le détail de l'article */}
        <TouchableOpacity
          style={styles.headerCenter}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('ItemDetail', {
              itemTitle,
              itemPhoto,
              itemPrice,
              itemDescription,
              itemCondition,
              itemLocation,
              sellerRating,
              sellerReviewsCount,
              isOnline,
              category,
              sellerName: interlocutorName,
              sellerAvatar: interlocutorAvatar,
              conversationId,
            })
          }
        >
          <View style={styles.headerAvatarContainer}>
            <Image source={{ uri: interlocutorAvatar }} style={styles.headerAvatar} />
            {isOnline && <View style={styles.onlineBadgeHeader} />}
          </View>
          <View>
            <Text style={styles.headerName} numberOfLines={1}>{interlocutorName}</Text>
            <Text style={styles.headerItemTitle} numberOfLines={1}>{itemTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* BANDE DE NÉGOCIATION */}
      {currentUserRole === 'acheteur' && (
        <View style={styles.offerBand}>
          <View style={styles.offerBandLeft}>
            <Image source={{ uri: itemPhoto }} style={styles.offerBandPhoto} />
            <Text style={styles.offerBandPrice}>{itemPrice} DH</Text>
          </View>
          <TouchableOpacity
            style={styles.offerBtn}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.offerBtnText}>Faire une offre</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ZONE DE CHAT */}
      <View style={styles.chatWrapper}>
        <GiftedChat
          messages={messages}
          onSend={(msgs) => onSend(msgs)}
          user={{ _id: 1, name: 'Moi' }}
          renderMessage={renderMessage}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          inverted={true}
          placeholder="Écrivez un message..."
          timeTextStyle={{ left: { color: '#AAAAAA' }, right: { color: '#E0E0E0' } }}
        />
      </View>

      <OfferModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSendOffer={handleSendOffer}
        originalPrice={itemPrice}
        itemTitle={itemTitle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    backgroundColor: '#0D0D0D',
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  backBtn: {
    marginRight: 16,
    paddingVertical: 8,
  },
  backBtnText: {
    color: '#00C853',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatarContainer: {
    marginRight: 10,
    position: 'relative',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },
  onlineBadgeHeader: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#0D0D0D',
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerItemTitle: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  offerBand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#112211',
    borderBottomWidth: 1,
    borderBottomColor: '#00C853',
  },
  offerBandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerBandPhoto: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#2A2A2A',
  },
  offerBandPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00C853',
  },
  offerBtn: {
    backgroundColor: '#00C853',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  offerBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chatWrapper: {
    flex: 1,
  },
  offerMessageContainer: {
    marginVertical: 4,
    width: '100%',
    flexDirection: 'row',
  },
  offerMessageLeft: {
    justifyContent: 'flex-start',
  },
  offerMessageRight: {
    justifyContent: 'flex-end',
  },
});
