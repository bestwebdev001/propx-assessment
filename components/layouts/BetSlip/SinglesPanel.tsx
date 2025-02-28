import { StyleSheet, View, Text, Pressable, TextInput, ScrollView, useWindowDimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSlice } from '@/store/slices';
import { formatBetEndTime } from '@/utils';
import { usePropxTheme } from '@/providers';
import { BetItem } from '@/types';

type SinglesPanelProps = {
  betItems: BetItem[];
  onBetValueChange: (id: string, value: string) => void;
  onDeleteBet: (id: string) => void;
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  betCard: {
    backgroundColor: '#303438',
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  deleteButton: { backgroundColor: '#494b4f', padding: 8, justifyContent: 'center' },
  betCardContent: { flex: 1, paddingHorizontal: 20, paddingVertical: 14 },
  betCardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  betCardTitle: { fontSize: 16, },
  endTime: { color: '#949597', fontSize: 12 },
  row: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
  betTeamText: { marginLeft: 10, fontSize: 16, fontWeight: 'bold' },
  betOddsText: { fontSize: 16 },
  input: {
    width: 100,
    textAlign: 'right',
    backgroundColor: '#46484c',
    padding: 5,
    borderRadius: 5
  }
});


export default function SinglesPanel({
  betItems,
  onBetValueChange,
  onDeleteBet,
}: SinglesPanelProps) {
  const { height } = useWindowDimensions();
  const { theme } = usePropxTheme()
  const { isCashMode } = useAppSlice();

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ paddingVertical: 14, maxHeight: height - 420 }}
        contentContainerStyle={{ gap: 8 }}
      >
        {betItems.map((item) => (
          <View key={item.id} style={styles.betCard}>
            <View style={styles.deleteButton}>
              <Pressable onPress={() => onDeleteBet(item.id)}>
                <FontAwesome5 name="trash-alt" size={16} color="white" />
              </Pressable>
            </View>
            <View style={styles.betCardContent}>
              <View style={styles.betCardHeader}>
                <Text style={[styles.betCardTitle, { color: theme.colors.text }]}>{item.title}</Text>
                <Text style={styles.endTime}>{`End at: ${formatBetEndTime(item.endTime)}`}</Text>
              </View>
              <View style={styles.row}>
                <Text>{item.teamLogo}</Text>
                <Text style={[styles.betTeamText, { color: theme.colors.text }]}>
                  {`${item.betOption.team}${item.betOption.spread !== '0' ? item.betOption.spread : ''}`}
                </Text>
              </View>
              <View style={[styles.row, { marginTop: 8, justifyContent: 'space-between' }]}>
                <Text style={[styles.betOddsText, { color: theme.colors.text }]}>{item.betOption.odds}</Text>
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  keyboardType="numeric"
                  value={`${isCashMode ? '$' : ''}${item.betValue}`} // Always prepend $
                  onChangeText={(text) => {
                    // Remove any non-numeric characters except the decimal point
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    onBetValueChange(item.id, numericValue);
                  }}
                  placeholder="Enter bet amount"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}