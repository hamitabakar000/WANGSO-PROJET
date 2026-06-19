// /MonChatApp/components/OfferCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OfferCard({
  offerData,
  senderName,
  currentUserRole,
  onAccept,
  onRefuse,
}) {
  const { amount, originalPrice, status } = offerData;
  const showActions = status === 'pending' && currentUserRole === 'vendeur';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>💰</Text>
        <Text style={styles.title}>Offre de {senderName}</Text>
      </View>

      <Text style={styles.amount}>Propose : {amount} DH</Text>
      <Text style={styles.originalPrice}>Prix original : {originalPrice} DH</Text>

      {showActions && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.acceptBtn]}
            onPress={onAccept}
            activeOpacity={0.7}
          >
            <Text style={styles.actionBtnText}>✅ Accepter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.refuseBtn]}
            onPress={onRefuse}
            activeOpacity={0.7}
          >
            <Text style={styles.actionBtnText}>❌ Refuser</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 'accepted' && (
        <View style={[styles.statusBadge, styles.acceptedBadge]}>
          <Text style={styles.statusText}>✅ Offre acceptée</Text>
        </View>
      )}
      {status === 'refused' && (
        <View style={[styles.statusBadge, styles.refusedBadge]}>
          <Text style={styles.statusText}>❌ Offre refusée</Text>
        </View>
      )}
      {status === 'pending' && !showActions && (
        <Text style={styles.pendingText}>⏳ En attente de réponse...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00C853', // Bordure gauche verte
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    width: 260,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 13,
    color: '#AAAAAA',
    marginBottom: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptBtn: {
    backgroundColor: '#00C853',
  },
  refuseBtn: {
    backgroundColor: '#FF3B30',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  acceptedBadge: {
    backgroundColor: '#009624',
  },
  refusedBadge: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  pendingText: {
    color: '#AAAAAA',
    fontStyle: 'italic',
    fontSize: 13,
    marginTop: 6,
  },
});
