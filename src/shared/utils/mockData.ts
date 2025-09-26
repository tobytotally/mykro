import { Charity } from '../types';

class MockDataService {
  private static instance: MockDataService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MockDataService();
    }
    return this.instance;
  }

  getCharities(): Charity[] {
    return [
      {
        id: 'charity-1',
        name: 'Save the Children',
        category: 'Children',
        description: 'We believe every child deserves a future. In the UK and around the world, we work every day to give children a healthy start in life, the opportunity to learn and protection from harm.',
        logo: '🧸',
        impactMetrics: [
          { metric: 'Children helped', value: 125000, unit: 'children' },
          { metric: 'Schools built', value: 45, unit: 'schools' },
          { metric: 'Meals provided', value: 2500000, unit: 'meals' }
        ],
        totalRaised: 8500000,
        rating: 4.8,
        isActive: true,
        totalDonated: 2847,
        monthlyDonation: 45,
        allocationPercentage: 25,
        currentGoal: 5000,
        currentProgress: 2847
      },
      {
        id: 'charity-2',
        name: 'Médecins Sans Frontières',
        category: 'Health',
        description: 'We provide medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare. Our teams are made up of tens of thousands of health professionals.',
        logo: '🏥',
        impactMetrics: [
          { metric: 'Patients treated', value: 89000, unit: 'patients' },
          { metric: 'Medical missions', value: 120, unit: 'missions' },
          { metric: 'Countries served', value: 72, unit: 'countries' }
        ],
        totalRaised: 12200000,
        rating: 4.9,
        isActive: true,
        totalDonated: 1924,
        monthlyDonation: 38,
        allocationPercentage: 20,
        currentGoal: 3000,
        currentProgress: 1924
      },
      {
        id: 'charity-3',
        name: 'World Wildlife Fund',
        category: 'Environment',
        description: 'WWF is the world\'s leading conservation organization, working in 100 countries to help people and nature thrive. Together, we\'re safeguarding the natural world for our children\'s future.',
        logo: '🐼',
        impactMetrics: [
          { metric: 'Acres protected', value: 450000, unit: 'acres' },
          { metric: 'Species protected', value: 2800, unit: 'species' },
          { metric: 'Trees planted', value: 1200000, unit: 'trees' }
        ],
        totalRaised: 15800000,
        rating: 4.7,
        isActive: true,
        totalDonated: 1456,
        monthlyDonation: 28,
        allocationPercentage: 15,
        currentGoal: 2500,
        currentProgress: 1456
      },
      {
        id: 'charity-4',
        name: 'The Ocean Cleanup',
        category: 'Environment',
        description: 'Developing advanced technologies to rid the oceans of plastic. We\'re cleaning up what is already polluting our oceans and intercepting plastic on its way to the ocean.',
        logo: '🌊',
        impactMetrics: [
          { metric: 'Plastic removed', value: 2000000, unit: 'kg' },
          { metric: 'Rivers cleaned', value: 12, unit: 'rivers' },
          { metric: 'Ocean systems', value: 3, unit: 'systems' }
        ],
        totalRaised: 6700000,
        rating: 4.6,
        isActive: true,
        totalDonated: 892,
        monthlyDonation: 18,
        allocationPercentage: 10,
        currentGoal: 1500,
        currentProgress: 892
      },
      {
        id: 'charity-5',
        name: 'Action Against Hunger',
        category: 'Hunger',
        description: 'A global humanitarian organization committed to ending world hunger. We work in over 50 countries to save lives and help children grow strong.',
        logo: '🍎',
        impactMetrics: [
          { metric: 'People reached', value: 17000000, unit: 'people' },
          { metric: 'Countries active', value: 50, unit: 'countries' },
          { metric: 'Emergency responses', value: 31, unit: 'responses' }
        ],
        totalRaised: 3200000,
        rating: 4.5,
        isActive: true,
        totalDonated: 1234,
        monthlyDonation: 24,
        allocationPercentage: 20,
        currentGoal: 2000,
        currentProgress: 1234
      },
      {
        id: 'charity-6',
        name: 'charity: water',
        category: 'Water',
        description: 'We\'re a nonprofit organization bringing clean and safe water to people around the world. 100% of public donations go directly to fund clean water projects.',
        logo: '💧',
        impactMetrics: [
          { metric: 'People served', value: 14700000, unit: 'people' },
          { metric: 'Water projects', value: 91400, unit: 'projects' },
          { metric: 'Countries active', value: 29, unit: 'countries' }
        ],
        totalRaised: 9800000,
        rating: 4.8,
        isActive: true,
        totalDonated: 976,
        monthlyDonation: 19,
        allocationPercentage: 10,
        currentGoal: 1800,
        currentProgress: 976
      },
      {
        id: 'charity-7',
        name: 'Room to Read',
        category: 'Education',
        description: 'Creating a world free from illiteracy and gender inequality. We focus on literacy and gender equality in education across Asia and Africa.',
        logo: '📚',
        impactMetrics: [
          { metric: 'Children benefited', value: 23000000, unit: 'children' },
          { metric: 'Schools built', value: 2600, unit: 'schools' },
          { metric: 'Books distributed', value: 37000000, unit: 'books' }
        ],
        totalRaised: 5200000,
        rating: 4.7,
        isActive: false,
        totalDonated: 567,
        monthlyDonation: 0,
        allocationPercentage: 0
      },
      {
        id: 'charity-8',
        name: 'Trees for the Future',
        category: 'Environment',
        description: 'We plant trees to restore degraded land and rebuild livelihoods. Our Forest Garden approach transforms lives and landscapes across sub-Saharan Africa.',
        logo: '🌳',
        impactMetrics: [
          { metric: 'Trees planted', value: 250000000, unit: 'trees' },
          { metric: 'Farmers trained', value: 200000, unit: 'farmers' },
          { metric: 'Acres restored', value: 50000, unit: 'acres' }
        ],
        totalRaised: 4100000,
        rating: 4.6,
        isActive: false,
        totalDonated: 432,
        monthlyDonation: 0,
        allocationPercentage: 0
      }
    ];
  }

  getFeaturedCharity(): Charity {
    const charities = this.getCharities();
    return charities[Math.floor(Math.random() * charities.length)];
  }

  getCharityById(id: string): Charity | undefined {
    return this.getCharities().find(charity => charity.id === id);
  }

  generateImpactStories() {
    return [
      {
        id: 'story-1',
        title: 'Clean Water Transforms a Village',
        description: 'Thanks to your donations through Mykro, we completed a water project in rural Cambodia that now provides clean, safe drinking water to over 2,000 villagers. Children no longer miss school due to waterborne illnesses.',
        image: '/knowledge/images/website/pexels-ahmed-akacha-3313934-12102732.jpg',
        impact: '$2,847 raised',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        charity: 'charity: water',
        metrics: {
          peopleHelped: 2000,
          projectDuration: '3 months',
          waterAccess: '24/7'
        }
      },
      {
        id: 'story-2',
        title: 'Emergency Response in Syria',
        description: 'Your contributions helped deploy a mobile medical unit that provided life-saving care to 850 patients in conflict-affected areas. The unit performed 47 surgeries and delivered essential medicines.',
        image: '/knowledge/images/website/pexels-julia-m-cameron-6994963.jpg',
        impact: '$1,924 raised',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        charity: 'Médecins Sans Frontières',
        metrics: {
          patientsHelped: 850,
          surgeries: 47,
          medicinesDelivered: '2.5 tons'
        }
      },
      {
        id: 'story-3',
        title: 'School Meals Change Lives',
        description: 'Through your Mykro donations, we\'ve provided 125,000 nutritious meals to children in 15 schools across East Africa. School attendance has increased by 40% and academic performance improved significantly.',
        image: '/knowledge/images/website/pexels-julia-m-cameron-6995106.jpg',
        impact: '$1,234 raised',
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        charity: 'Action Against Hunger',
        metrics: {
          mealsProvided: 125000,
          schoolsReached: 15,
          attendanceIncrease: '40%'
        }
      },
      {
        id: 'story-4',
        title: 'Ocean Cleanup Success',
        description: 'Your support helped remove 50,000 kg of plastic from the Great Pacific Garbage Patch. This innovative cleanup system is now preventing millions of pieces of plastic from harming marine life.',
        image: '/knowledge/images/website/pexels-oliver-wagenblatt-238537059-14894380.jpg',
        impact: '$892 raised',
        date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        charity: 'The Ocean Cleanup',
        metrics: {
          plasticRemoved: '50,000 kg',
          areaCleared: '5 km²',
          marineLifeSaved: 'Countless'
        }
      },
      {
        id: 'story-5',
        title: 'Wildlife Habitat Protected',
        description: 'Together, we\'ve helped protect 10,000 acres of critical tiger habitat in India. Camera traps show a 25% increase in tiger sightings, indicating a growing population in the protected area.',
        image: '/knowledge/images/website/pexels-kublackphotography-10858387.jpg',
        impact: '$1,456 raised',
        date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        charity: 'World Wildlife Fund',
        metrics: {
          acresProtected: 10000,
          tigerIncrease: '25%',
          speciesProtected: 47
        }
      },
      {
        id: 'story-6',
        title: 'Children\'s Education Initiative',
        description: 'Your donations funded the construction of a new primary school in Bangladesh, providing quality education to 450 children who previously had no access to schooling. The school includes a library with 5,000 books.',
        image: '/knowledge/images/website/pexels-b-aristotle-guweh-jr-1643208950-32230250.jpg',
        impact: '$2,847 raised',
        date: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000),
        charity: 'Save the Children',
        metrics: {
          childrenEducated: 450,
          teachersHired: 12,
          booksProvided: 5000
        }
      }
    ];
  }

  generateOperatorMetrics() {
    return {
      totalDonations: 125000,
      activeUsers: 8500,
      conversionRate: 23.5,
      impactScore: 92,
      monthlyGrowth: 15.2,
      charitiesSupported: 12,
      averageDonation: 14.70,
      totalBets: 45000
    };
  }

  generateTransactionData() {
    const transactions = [];
    const charities = this.getCharities();
    
    for (let i = 0; i < 50; i++) {
      const charity = charities[Math.floor(Math.random() * charities.length)];
      transactions.push({
        id: `txn-${i}`,
        userId: `user-${Math.floor(Math.random() * 1000)}`,
        betAmount: Math.floor(Math.random() * 100) + 10,
        donationAmount: Math.floor(Math.random() * 10) + 1,
        donationPercentage: Math.floor(Math.random() * 8) + 2,
        charity: charity.name,
        charityId: charity.id,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        status: Math.random() > 0.1 ? 'completed' : 'pending'
      });
    }
    
    return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const mockDataService = MockDataService.getInstance();
