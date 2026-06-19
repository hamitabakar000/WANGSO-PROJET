// /MonChatApp/components/OfferModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function OfferModal({
  visible,
  onClose,
  onSendOffer,
  originalPrice,
  itemTitle,
}) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError('Veuillez entrer un montant valide supérieur à 0.');
      return;
    }
    // On ne propose pas le prix plein (ou plus) dans une négociation
    if (parsed >= originalPrice) {
      setError(`Le montant doit être inférieur au prix demandé (${originalPrice} DH).`);
      return;
    }
    onSendOffer(parsed);
    setAmount('');
    setError('');
  };

  const handleCancel = () => {
    setAmount('');
    setError('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleCancel}
        />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Faire une offre</Text>
          <Text style={styles.subtitle}>
            pour « {itemTitle} »
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Prix demandé :</Text>
            <Text style={styles.priceValue}>{originalPrice} DH</Text>
          </View>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Votre offre (DH)"
            placeholderTextColor="#AAAAAA"
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              setError('');
            }}
            autoFocus={true}
          />

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.sendButton,
                // Griser le bouton si le montant semble invalide
                (!amount || parseFloat(amount) >= originalPrice) && styles.sendButtonDisabled,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.7}
              disabled={!amount || parseFloat(amount) >= originalPrice}
            >
              <Text style={styles.sendText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.7)',
  },
  sheet: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2A2A2A',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  priceLabel: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00C853',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2A2A2A',
  },
  sendButton: {
    backgroundColor: '#00C853',
  },
  sendButtonDisabled: {
    backgroundColor: '#009624',
    opacity: 0.5,
  },
  cancelText: {
    color: '#AAAAAA',
    fontWeight: '600',
    fontSize: 16,
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
