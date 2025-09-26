import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/UI/Card';
import { Button } from '../../../shared/components/UI/Button';

export function ResultPage() {
  const { betId } = useParams();
  
  // In a real app, this would fetch the bet result from the backend
  const mockResult = {
    id: betId,
    status: Math.random() > 0.5 ? 'won' : 'lost',
    stake: 25,
    return: 67.50,
    mykroDonation: 2.50,
    charity: 'Save the Children',
    impactMessage: 'Your donation helped provide 5 meals to children in need!'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className={`text-6xl mb-4 ${mockResult.status === 'won' ? 'text-green-500' : 'text-red-500'}`}>
          {mockResult.status === 'won' ? '🎉' : '😔'}
        </div>
        
        <h1 className={`text-4xl font-bold mb-4 ${mockResult.status === 'won' ? 'text-green-600' : 'text-red-600'}`}>
          {mockResult.status === 'won' ? 'Congratulations!' : 'Better Luck Next Time!'}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {mockResult.status === 'won' 
            ? `You won $${mockResult.return}!` 
            : `Your bet didn't come through this time.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="font-semibold text-lg mb-4">Bet Details</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span>Bet ID:</span>
                <span className="font-mono text-sm">{betId}</span>
              </div>
              <div className="flex justify-between">
                <span>Stake:</span>
                <span>${mockResult.stake}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-medium capitalize ${mockResult.status === 'won' ? 'text-green-600' : 'text-red-600'}`}>
                  {mockResult.status}
                </span>
              </div>
              {mockResult.status === 'won' && (
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Winnings:</span>
                  <span className="font-semibold text-green-600">${mockResult.return}</span>
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <h3 className="font-semibold text-lg mb-4 text-green-800">🌟 Mykro Impact</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span>Donation Amount:</span>
                <span className="font-semibold text-green-600">${mockResult.mykroDonation}</span>
              </div>
              <div className="flex justify-between">
                <span>Charity:</span>
                <span className="font-medium">{mockResult.charity}</span>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded text-sm text-green-800">
                <p className="font-medium mb-1">Impact Update:</p>
                <p>{mockResult.impactMessage}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-x-4">
          <Button onClick={() => window.location.href = '/sports'}>
            Place Another Bet
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/donor'}>
            View Your Impact
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
