import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { usePropxTheme } from '@/providers';
import { useAppSlice } from '@/store/slices';
import { formatBetEndTime } from '@/utils';
import { BetItem } from '@/types';

type ParlayPanelProps = {
  betItems: BetItem[];
  totalBet: number;
  onBetValueChange: (value: string) => void;
  onDeleteBet: (id: string) => void;
  onDeleteParlay: () => void;
};

const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: 14 },
  totalCharged: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
  toggleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  betCard: {
    backgroundColor: '#303438',
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  deleteButton: { backgroundColor: '#494b4f', padding: 8, justifyContent: 'center' },
  betCardContent: { flex: 1, paddingHorizontal: 20, paddingVertical: 14 },
  betCardHeader: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  betCardTitle: { fontSize: 16, },
  endTime: { color: '#949597', fontSize: 12, marginTop: 8 },
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

type ParlayBet = {
  id: string;
  title: string;
  bets: BetItem[];
  parlayOdds: number;
};

export default function ParlayPanel({
  betItems,
  totalBet,
  onBetValueChange,
  onDeleteBet,
  onDeleteParlay
}: ParlayPanelProps) {
  const { theme } = usePropxTheme()
  const { isCashMode } = useAppSlice()
  const [parlayBet, setParlayBet] = useState<ParlayBet | null>(null);

  const convertOddsToDecimal = (odds: number) => {
    return odds > 0 ? (odds / 100) + 1 : 1 + (100 / Math.abs(odds));
  };

  const calculateParlayOdds = (bets: { betOption: { odds: number } }[]) => {
    return bets.reduce((total, bet) => total * convertOddsToDecimal(bet.betOption.odds), 1);
  };

  const handleSwitchToParlay = () => {
    if (betItems.length < 2) {
      alert("You need at least two bets for a parlay.");
      return;
    }

    const parlayOdds = parseFloat(calculateParlayOdds(betItems).toFixed(2));

    setParlayBet({
      id: `parlay_${Date.now()}`,
      title: "Parlay Bet",
      bets: betItems,
      parlayOdds,
    });
  };

  useEffect(() => {
    handleSwitchToParlay()
  }, [betItems])

  const getEarliestEndTime = (): string => {
    if (betItems.length === 0) return "N/A"; // Handle empty case

    const earliest = betItems.reduce((prev, curr) =>
      new Date(prev.endTime) < new Date(curr.endTime) ? prev : curr
    );

    return formatBetEndTime(earliest.endTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.betCard}>
        <View style={styles.deleteButton}>
          <Pressable onPress={() => onDeleteParlay()}>
            <FontAwesome5 name="trash-alt" size={16} color="white" />
          </Pressable>
        </View>
        <View style={styles.betCardContent}>
          <View style={[styles.row, { marginTop: 4, marginBottom: 12, justifyContent: 'space-between' }]}>
            <View>
              <Text style={[styles.betCardTitle, { color: theme.colors.text }]}>{parlayBet?.title}</Text>
              <Text style={styles.endTime}>{`End at: ${getEarliestEndTime()}`}</Text>
            </View>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              keyboardType="numeric"
              value={`${isCashMode ? '$' : ''}${totalBet}`} // Always prepend $
              onChangeText={(text) => {
                // Remove any non-numeric characters except the decimal point
                const numericValue = text.replace(/[^0-9.]/g, "");
                onBetValueChange(numericValue);
              }}
              placeholder="Enter bet amount"
              placeholderTextColor="gray"
            />
          </View>
          {betItems.map((item) => <View key={item.id} style={styles.betCardHeader}>
            <Pressable onPress={() => onDeleteBet(item.id)} style={{ backgroundColor: '#46484c', padding: 6, borderRadius: 4 }}>
              <FontAwesome5 name="trash-alt" size={16} color="white" />
            </Pressable>
            <View style={{ marginLeft: 12 }}>
              <Text style={[styles.betCardTitle, { color: theme.colors.text }]}>{item.title}</Text>
              <Text style={{ color: theme.colors.text, marginTop: 4 }}>
                {item.betOption.spread}
                <Text style={[styles.endTime]}>{` (${parlayBet?.parlayOdds})`}</Text>
              </Text>
            </View>
          </View>)}
        </View>
      </View>
    </View>
  );
}