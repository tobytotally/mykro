import { useState } from 'react';
import { useBettingStore } from '../../stores/bettingStore';
import { useCharityStore } from '../../stores/charityStore';
import { Button } from './UI/Button';
import { Card } from './UI/Card';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useOperatorTheme } from '../hooks/useOperatorTheme';

export function MykroBettingSlip() {
  const { getThemeClasses } = useOperatorTheme();
  const {
    selections,
    stake,
    mykroEnabled,
    mykroPercentage,
    selectedCharityId,
    removeSelection,
    updateStake,
    toggleMykro,
    updateMykroPercentage,
    setSelectedCharity,
    clearSlip,
  } = useBettingStore();

  const { charities } = useCharityStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (selections.length === 0) {
    return null;
  }

  const totalOdds = selections.reduce((acc, selection) => acc * selection.odds, 1);
  const potentialReturn = stake * totalOdds;
  const donationAmount = mykroEnabled ? (stake * mykroPercentage) / 100 : 0;

  const handleMykroToggle = () => {
    if (!mykroEnabled && !selectedCharityId) {
      setShowOnboarding(true);
    } else {
      toggleMykro();
    }
  };

  const placeBet = () => {
    // In a real app, this would submit to backend
    console.log('Placing bet:', {
      selections,
      stake,
      mykroEnabled,
      donationAmount,
      selectedCharityId,
    });
    
    // Show success message and clear slip
    alert(`Bet placed! ${mykroEnabled ? `You're donating $${donationAmount.toFixed(2)} to charity!` : ''}`);
    clearSlip();
  };

  return (
    <>
      <Card className="fixed right-4 top-24 w-80 z-50 max-h-[calc(100vh-8rem)] overflow-y-auto bg-[var(--theme-slipBg)] border-[var(--theme-slipBorder)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-[var(--theme-text)]">Bet Slip</h3>
            <Button variant="ghost" size="sm" onClick={clearSlip}>
              Clear All
            </Button>
          </div>

          {/* Selections */}
          <div className="space-y-2">
            {selections.map((selection) => (
              <div key={selection.matchId} className="p-3 bg-[var(--theme-surface)] rounded border border-[var(--theme-border)]">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--theme-text)]">
                      {selection.match.homeTeam} vs {selection.match.awayTeam}
                    </p>
                    <p className="text-xs text-[var(--theme-textMuted)]">
                      {selection.selection === 'home' ? selection.match.homeTeam : 
                       selection.selection === 'away' ? selection.match.awayTeam : 'Draw'} @ {selection.odds.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSelection(selection.matchId)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Stake Input */}
          <div>
            <label className="block text-sm font-medium text-[var(--theme-text)] mb-1">
              Stake Amount
            </label>
            <input
              type="number"
              value={stake}
              onChange={(e) => updateStake(Number(e.target.value))}
              className="w-full px-3 py-2 border border-[var(--theme-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] bg-[var(--theme-surface)] text-[var(--theme-text)]"
              min="1"
              step="0.01"
            />
          </div>

          {/* Mykro Section */}
          <div className="border-t border-[var(--theme-border)] pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={mykroEnabled}
                  onChange={handleMykroToggle}
                  className="rounded border-[var(--theme-border)] text-[var(--theme-primary)] focus:ring-[var(--theme-primary)]"
                />
                <span className="text-sm font-medium text-[var(--theme-text)]">Add Mykro donation</span>
              </label>
              <span className="text-xs bg-[var(--theme-success)] text-white px-2 py-1 rounded">
                ✨ Mykro
              </span>
            </div>

            {mykroEnabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-[var(--theme-textMuted)] mb-1">
                    Donation Percentage: {mykroPercentage}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={mykroPercentage}
                    onChange={(e) => updateMykroPercentage(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[var(--theme-textMuted)]">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[var(--theme-textMuted)] mb-1">
                    Select Charity
                  </label>
                  <select
                    value={selectedCharityId}
                    onChange={(e) => setSelectedCharity(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--theme-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] bg-[var(--theme-surface)] text-[var(--theme-text)]"
                  >
                    <option value="">Choose a charity...</option>
                    {charities.map((charity) => (
                      <option key={charity.id} value={charity.id}>
                        {charity.logo} {charity.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2 bg-[var(--theme-success)]/10 rounded text-sm border border-[var(--theme-success)]/20">
                  <p className="font-medium text-[var(--theme-success)]">
                    Donation: ${donationAmount.toFixed(2)}
                  </p>
                  <p className="text-[var(--theme-success)] text-xs">
                    Making a difference with every bet! 🌟
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bet Summary */}
          <div className="border-t border-[var(--theme-border)] pt-4 space-y-2">
            <div className="flex justify-between text-sm text-[var(--theme-text)]">
              <span>Total Odds:</span>
              <span className="font-medium">{totalOdds.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--theme-text)]">
              <span>Stake:</span>
              <span className="font-medium">${stake.toFixed(2)}</span>
            </div>
            {mykroEnabled && (
              <div className="flex justify-between text-sm text-[var(--theme-success)]">
                <span>Mykro Donation:</span>
                <span className="font-medium">-${donationAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t border-[var(--theme-border)] pt-2">
              <span className="text-[var(--theme-text)]">Potential Return:</span>
              <span className="text-[var(--theme-primary)]">${potentialReturn.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={placeBet} 
            className="w-full"
            disabled={!selectedCharityId && mykroEnabled}
          >
            Place Bet
          </Button>
        </div>
      </Card>

      {/* Mykro Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 bg-[var(--theme-surface)] border-[var(--theme-border)]">
            <div className="text-center space-y-4">
              <div className="text-4xl">🌟</div>
              <h2 className="text-xl font-bold text-[var(--theme-text)]">Welcome to Mykro!</h2>
              <p className="text-[var(--theme-textMuted)]">
                Turn your bets into charitable donations. Choose a percentage of your stake 
                to donate to your favorite charity.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => {
                    setSelectedCharity(charities[0]?.id || '');
                    toggleMykro();
                    setShowOnboarding(false);
                  }}
                  className="w-full bg-[var(--theme-success)] hover:bg-[var(--theme-success)]/90 text-white"
                >
                  Get Started with Mykro
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowOnboarding(false)}
                  className="w-full"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

