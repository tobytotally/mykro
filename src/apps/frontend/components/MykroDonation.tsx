import { HandshakeIcon } from 'lucide-react';

interface MykroDonationProps {
  enabled: boolean;
  percentage: number;
  amount: number;
  charity: string;
  onToggle: (enabled: boolean) => void;
  onPercentageChange: (percentage: number) => void;
  onCharityChange?: () => void;
}

export function MykroDonation({
  enabled,
  percentage,
  amount,
  charity,
  onToggle,
  onPercentageChange,
  onCharityChange
}: MykroDonationProps) {
  return (
    <div className="border-2 border-black p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <HandshakeIcon className="w-5 h-5" />
          <strong>Mykro Donation</strong>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
        </label>
      </div>
      
      {enabled && (
        <>
          <p className="text-sm text-gray-600 mb-3">Support charity with your bet</p>
          
          <div className="mb-3">
            <label className="text-sm">Donation amount: {percentage}%</label>
            <input
              type="range"
              min="1"
              max="10"
              value={percentage}
              onChange={(e) => onPercentageChange(Number(e.target.value))}
              className="w-full mt-1"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1%</span>
              <span>3%</span>
              <span>5%</span>
              <span>10%</span>
            </div>
          </div>
          
          <div className="bg-white p-3 border border-gray-300 rounded">
            <p className="font-bold">Your donation: ${amount.toFixed(2)}</p>
            <p className="text-xs text-gray-600">Going to: {charity}</p>
            {onCharityChange && (
              <button 
                onClick={onCharityChange}
                className="text-xs text-blue-600 hover:underline"
              >
                Change charity
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}