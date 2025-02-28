import { Suspense, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, useWindowDimensions, Pressable, ActivityIndicator } from 'react-native';
import { useLazyLoadQuery, useRelayEnvironment } from 'react-relay';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors, fonts } from '@/theme';
import SinglesPanel from './SinglesPanel';
import { useAppSlice } from '@/store/slices';
import ParlayPanel from './ParlayPanel';
import { usePropxTheme } from '@/providers';
import { formatBetAmount, formatCash, formatCoin } from '@/utils';
import TotalBalance from '@/components/elements/TotalBalance';
import { confirmBet } from '@/relay/mutations/confirmBet';
import { FontAwesome5 } from '@expo/vector-icons';
import { BETS_QUERY } from '@/relay/queries/BetSlipQuery';
import { BetSlipQuery } from '@/relay/queries/__generated__/BetSlipQuery.graphql';
import Button from '@/components/elements/Button';
import Tabs from '@/components/elements/Tabs';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.openSan.bold,
    color: colors.white,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16
  },
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  tab: {
    width: '50%',
    paddingVertical: 10
  },
  tabText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.gray,
    paddingVertical: 8
  },
  activeTabText: { color: colors.white },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 1,
    width: '50%',
    backgroundColor: colors.white
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  summaryContainer: { marginVertical: 16, width: '100%' },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.yellow,
    height: 44,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  confirmButtonTitle: {
    paddingHorizontal: 12,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: colors.black
  },
  betButtonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },
  betButton: {
    padding: 10,
    flex: 1,
    borderRadius: 6
  },
  betText: {
    fontSize: 16,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sumLabel: {
    color: '#a4a5a7',
    fontSize: 14
  },
  sumText: {
    fontSize: 14,
    color: colors.white
  },
  earningsContainer: {
    backgroundColor: '#203433',
    width: '100%',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  earningsText: {
    color: '#00fff2',
    textAlign: 'center',
  },
  copyBetContainer: {
    width: '100%',
    padding: 20
  },
  copyBetButton: {
    flex: 1,
    backgroundColor: '#27292c',
    padding: 8,
    borderRadius: 6
  },
  copyBetButtonText: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

type WelcomeBottomSheetContentsProps = {
  onClose: () => void;
};

export default function BetSlip({ onClose }: WelcomeBottomSheetContentsProps) {
  const { theme } = usePropxTheme()
  const [activeTab, setActiveTab] = useState('Singles');
  const { isCashMode, totalCash, totalCoin, setBalance, toggleMode, dispatch } = useAppSlice();
  const data = useLazyLoadQuery<BetSlipQuery>(BETS_QUERY, {});
  const environment = useRelayEnvironment();
  const [betStatus, setBetStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bets, setBets] = useState(
    data.bets.map((bet) => ({ ...bet, betValue: '0' }))
  );
  const betAmounts = isCashMode ? [50, 100, 200, 'Custom'] : [25000, 50000, 100000, 'Custom'];
  const [selectedBetAmount, setSelectedBetAmount] = useState<number | string | undefined>();

  const totalBet = bets.reduce((sum, bet) => sum + (parseFloat(bet.betValue) || 0), 0);
  const potentialWin = bets.reduce((sum, bet) => sum + (parseFloat(bet.betValue) || 0) * 2, 0);
  const xpAmount = 360
  const MAX_BET = isCashMode ? 100000 : 1000000;

  useEffect(() => {
    if (data) {
      dispatch(setBalance({ totalCash: data.totalCash, totalCoin: data.totalCoin }));
    }
  }, [data, dispatch]);


  const handleBetValueChange = (id: string, value: string) => {
    const numericValue = Number(value);

    if (numericValue > MAX_BET) {
      alert(`The maximum bet amount is ${isCashMode ? formatCash(MAX_BET) : formatCoin(MAX_BET)}.`);
      return;
    }

    const totalBetAmount = bets.reduce((sum, bet) => sum + (bet.id === id ? numericValue : Number(bet.betValue) || 0), 0);
    const maxAllowedAmount = isCashMode ? totalCash : totalCoin;

    if (totalBetAmount > maxAllowedAmount) {
      alert(`Insufficient funds. Your available ${isCashMode ? 'cash' : 'coins'} balance is ${isCashMode ? formatCash(totalCash) : formatCoin(totalCoin)}.`);
      return;
    }

    setBets((prevBets) =>
      prevBets.map((bet) => (bet.id === id ? { ...bet, betValue: value } : bet))
    );
  };

  const handleDeleteBet = (id: string) => {
    setBets((prevBets) => prevBets.filter((bet) => bet.id !== id));
  };

  const setBetAmount = (amount: number | string) => {
    if (amount !== 'Custom') {
      const totalBetAmount = Number(amount) * bets.length
      const maxAllowedAmount = isCashMode ? totalCash : totalCoin;

      if (Number(amount) > MAX_BET) {
        alert(`Max bet amount is ${isCashMode ? formatCash(MAX_BET) : formatCoin(MAX_BET)}`);
        return;
      }
      if (totalBetAmount > maxAllowedAmount) {
        alert(`Insufficient funds. Your available ${isCashMode ? 'cash' : 'coins'} balance is ${isCashMode ? formatCash(totalCash) : formatCoin(totalCoin)}.`);
        return;
      }
    }
    setSelectedBetAmount(amount)
    setBets((prevBets) =>
      prevBets.map((bet) => ({
        ...bet,
        betValue: amount === 'Custom' ? '' : `${Number(amount) / bets.length}`
      }))
    );
  };

  const handleConfirmBet = async () => {
    if (betStatus === 'loading') return;
    setBetStatus('loading');
    try {
      const response = await confirmBet(environment, { amount: totalBet, isCashMode });

      if (response.confirmBet.success) {
        dispatch(
          setBalance({
            totalCash: response.confirmBet.remainingCash,
            totalCoin: response.confirmBet.remainingCoin
          })
        );
        setBetStatus('success');
        console.log('Bet confirmed:', response.confirmBet.message);
      } else {
        setBetStatus('error');
        console.error('Bet confirmation failed:', response.confirmBet.message);
        alert(response.confirmBet.message);
      }
    } catch (error) {
      setBetStatus('error');
      console.error('Mutation error:', error);
      alert('An error occurred while confirming the bet.');
    }
  };

  const handleCopyBet = () => {
    dispatch(toggleMode())
    setBetStatus('idle')
  }

  const handleClose = () => {
    setBetStatus('idle')
    setSelectedBetAmount(undefined)
    onClose()
  }

  const handleDeleteParlay = () => {
    setBets([])
    handleClose()
  }

  useEffect(() => {
    setSelectedBetAmount(undefined)
    setBets((prevBets) => prevBets.map((bet) => ({ ...bet, betValue: '0' })))
  }, [isCashMode, activeTab])

  return (
    <Suspense fallback={<Text>Loading bets...</Text>}>
      <View style={[styles.root, { backgroundColor: '#1a1e22' }]}>
        <Text style={styles.title}>betslip ({bets.length})</Text>
        <View style={[
          styles.container,
          {
            opacity: (betStatus !== 'loading' && betStatus !== 'success') ? 1 : 0.2,
            pointerEvents: (betStatus !== 'loading' && betStatus !== 'success') ? 'auto' : 'none'
          }]}>
          <View style={styles.tabsContainer}>
            <Tabs
              tabs={['Singles', 'Parlay']}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabTextStyle={styles.tabText}
              activeTabTextStyle={styles.activeTabText}
              indicatorStyle={styles.indicator}
            />
          </View>

          <TotalBalance />
          <View style={styles.contentContainer}>
            {activeTab === 'Singles' ? (
              <SinglesPanel
                betItems={bets}
                onBetValueChange={handleBetValueChange}
                onDeleteBet={handleDeleteBet}
              />
            ) : (
              <ParlayPanel
                betItems={bets}
                totalBet={isCashMode ? totalBet : totalBet}
                onBetValueChange={setBetAmount}
                onDeleteBet={handleDeleteBet}
                onDeleteParlay={handleDeleteParlay}
              />
            )}

            <View style={styles.betButtonGroup}>
              {betAmounts.map((value) => (
                <Button
                  key={value}
                  title={`${isCashMode && value !== 'Custom' ? '$' : ''}${formatBetAmount(value)}`}
                  titleStyle={[styles.betText, { color: theme.colors.text }]}
                  style={[styles.betButton, {
                    backgroundColor: selectedBetAmount === value ? (isCashMode ? colors.green : colors.pink) : '#323438'
                  }]}
                  onPress={() => setBetAmount(value)}
                />
              ))}
            </View>
            <View style={styles.summaryContainer}>
              <View style={styles.row}>
                <Text style={styles.sumLabel}>Total bet</Text>
                <Text style={styles.sumText}>
                  {isCashMode ? formatCash(totalBet) : formatCoin(totalBet)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.sumLabel}>Potential win</Text>
                <Text style={[styles.sumText, { color: isCashMode ? colors.green : colors.pink }]}>
                  {isCashMode ? formatCash(potentialWin) : formatCoin(potentialWin)}
                </Text>
              </View>
            </View>
            {totalBet > 0 && <View style={styles.earningsContainer}>
              <MaterialCommunityIcons style={{ marginRight: 4 }} name="star-four-points-outline" size={20} color="#00fff2" />
              <Text style={styles.earningsText}>{`You will earn ${xpAmount}XP with this bet.`}</Text>
            </View>}
          </View>
        </View>
        <Button
          style={[styles.confirmButton, { opacity: totalBet === 0 && betStatus === 'idle' ? 0.2 : 1 }]}
          disabled={totalBet === 0 || betStatus === 'loading'}
          onPress={handleConfirmBet}
        >
          {betStatus === 'loading' ? (
            <>
              <ActivityIndicator color="black" />
              <Text style={styles.confirmButtonTitle}>Confirming...</Text>
            </>
          ) : betStatus === 'success' ? (
            <>
              <AntDesign name="check" size={20} color="black" />
              <Text style={styles.confirmButtonTitle}>Confirmed</Text>
            </>
          ) : betStatus === 'error' ? (
            <>
              <AntDesign name="close" size={20} color="black" />
              <Text style={styles.confirmButtonTitle}>Try Again</Text>
            </>
          ) : (
            <Text style={styles.confirmButtonTitle}>Confirm Bet</Text>
          )}
        </Button>
        <Text style={styles.sumLabel}>{`Max bet amount: ${isCashMode ? formatCash(MAX_BET) : formatCoin(MAX_BET)}`}</Text>
        {betStatus === 'success' && (<View style={styles.copyBetContainer}>
          <Text style={{ color: theme.colors.text }}>
            {`Would you like to copy this bet for `}
            <Text style={{ color: isCashMode ? colors.pink : colors.green }}>
              <FontAwesome5 name={isCashMode ? "bitcoin" : "dollar-sign"} size={16} color="isCashMode ? colors.pink : colors.green" /> {isCashMode ? 'Coin' : 'Cash'}?
            </Text>
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <Button
              title="No"
              titleStyle={styles.copyBetButtonText}
              style={styles.copyBetButton}
              onPress={handleClose}
            />
            <Button
              title="Yes"
              titleStyle={styles.copyBetButtonText}
              style={[styles.copyBetButton, { backgroundColor: isCashMode ? colors.pink : colors.green }]}
              onPress={handleCopyBet}
            />
          </View>
        </View>)}
      </View>
    </Suspense>
  );
}
