import { useBettingStore } from '../../../stores/bettingStore';
import { Card } from '../../../shared/components/UI/Card';
import { useOperatorTheme } from '../../../shared/hooks/useOperatorTheme';

export function BetSlipPage() {
  const { selections, stake, mykroEnabled, mykroPercentage } = useBettingStore();
  const { getThemeClasses } = useOperatorTheme();

  if (selections.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12 bg-[var(--theme-surface)] border-[var(--theme-border)]">
          <h1 className="text-2xl font-bold text-[var(--theme-text)] mb-4">Your Bet Slip</h1>
          <p className="text-[var(--theme-textMuted)] mb-4">Your bet slip is empty</p>
          <p className="text-sm text-[var(--theme-textMuted)]">Add some selections from the sports pages to get started!</p>
        </Card>
      </div>
    );
  }

  const totalOdds = selections.reduce((acc, selection) => acc * selection.odds, 1);
  const potentialReturn = stake * totalOdds;
  const donationAmount = mykroEnabled ? (stake * mykroPercentage) / 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[var(--theme-text)] mb-8">Bet Slip Summary</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selections */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-4">Your Selections</h2>
          {selections.map((selection) => (
            <Card key={selection.matchId} className="bg-[var(--theme-surface)] border-[var(--theme-border)]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[var(--theme-text)]">
                    {selection.match.homeTeam} vs {selection.match.awayTeam}
                  </h3>
                  <span className="text-sm text-[var(--theme-textMuted)]">{selection.match.league}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--theme-text)]">
                    {selection.selection === 'home' ? selection.match.homeTeam : 
                     selection.selection === 'away' ? selection.match.awayTeam : 'Draw'}
                  </span>
                  <span className="font-semibold text-[var(--theme-text)]">@ {selection.odds.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card className="bg-[var(--theme-slipBg)] border-[var(--theme-slipBorder)]">
            <h3 className="font-semibold text-lg mb-4 text-[var(--theme-text)]">Bet Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[var(--theme-text)]">
                <span>Selections:</span>
                <span>{selections.length}</span>
              </div>
              <div className="flex justify-between text-[var(--theme-text)]">
                <span>Total Odds:</span>
                <span className="font-medium">{totalOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--theme-text)]">
                <span>Stake:</span>
                <span className="font-medium">${stake.toFixed(2)}</span>
              </div>
              {mykroEnabled && (
                <>
                  <div className="flex justify-between text-[var(--theme-success)]">
                    <span>Mykro Donation ({mykroPercentage}%):</span>
                    <span className="font-medium">${donationAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-[var(--theme-success)] bg-[var(--theme-success)]/10 p-2 rounded border border-[var(--theme-success)]/20">
                    ✨ Making a difference with your bet!
                  </div>
                </>
              )}
              <div className="border-t border-[var(--theme-border)] pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[var(--theme-text)]">Potential Return:</span>
                  <span className="text-[var(--theme-primary)]">${potentialReturn.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

