import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Platform,
  Alert,
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// --- Types ---
export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  buttons: AlertButton[];
}

interface AlertContextType {
  showAlert: (title: string, message?: string, buttons?: AlertButton[]) => void;
}

// --- Context ---
const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert(): AlertContextType {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
}

// --- Provider ---
export function AlertProvider({ children }: { children: ReactNode }) {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  const showAlert = (title: string, message?: string, buttons?: AlertButton[]) => {
    const msg = message || '';
    const btns = buttons?.length ? buttons : [{ text: 'OK', onPress: () => {} }];

    if (Platform.OS === 'web') {
      setAlertState({ visible: true, title, message: msg, buttons: btns });
    } else {
      Alert.alert(
        title,
        msg,
        btns.map((b) => ({ text: b.text, onPress: b.onPress, style: b.style }))
      );
    }
  };

  const hideAlert = () => setAlertState((s) => ({ ...s, visible: false }));

  const handlePress = (button: AlertButton) => {
    try {
      button.onPress?.();
    } catch (e) {
      console.warn('[AlertProvider] Button press error:', e);
    }
    hideAlert();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {Platform.OS === 'web' && (
        <WebAlertModal state={alertState} onPress={handlePress} onHide={hideAlert} />
      )}
    </AlertContext.Provider>
  );
}

// --- Web Modal ---
function WebAlertModal({
  state,
  onPress,
  onHide,
}: {
  state: AlertState;
  onPress: (b: AlertButton) => void;
  onHide: () => void;
}) {
  if (!state.visible) return null;

  const btnTextStyle = (b: AlertButton) => {
    if (b.style === 'destructive') return styles.destructiveText;
    if (b.style === 'cancel') return styles.cancelText;
    return styles.defaultText;
  };

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.content}>
            <Text style={styles.title}>{state.title}</Text>
            {state.message ? <Text style={styles.message}>{state.message}</Text> : null}
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.btnRow}>
              {state.buttons.map((btn, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.btn,
                    i < state.buttons.length - 1 && styles.btnBorder,
                  ]}
                  onPress={() => onPress(btn)}
                  activeOpacity={0.8}
                >
                  <Text style={btnTextStyle(btn)}>{btn.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialog: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    minWidth: 280,
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20 },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: '#86868B',
    textAlign: 'center',
    lineHeight: 20,
  },
  btnContainer: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#D1D1D6' },
  btnRow: { flexDirection: 'row' },
  btn: {
    flex: 1,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  btnBorder: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#D1D1D6',
  },
  defaultText: { color: '#007AFF', fontSize: 17, fontWeight: '600' },
  cancelText: { color: '#007AFF', fontSize: 17, fontWeight: '400' },
  destructiveText: { color: '#FF3B30', fontSize: 17, fontWeight: '600' },
});
