import { Trend } from '../types/trend';

export const mockTrends: Trend[] = [
  // Technology Quadrant (0-90 degrees)
  {
    id: '1',
    name: 'Quantum Computing',
    description: 'Revolutionary computing paradigm using quantum mechanical phenomena to process information exponentially faster than classical computers.',
    category: 'Technology',
    readinessLevel: 4,
    businessReadiness: 2,
    impact: 'Transformative',
    timeHorizon: '2029+',
    angle: 45,
    radius: 0.8,
    tags: ['Computing', 'Research', 'Cryptography'],
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Edge AI Chips',
    description: 'Specialized processors designed to run AI algorithms directly on devices, enabling real-time processing without cloud connectivity.',
    category: 'Technology',
    readinessLevel: 7,
    businessReadiness: 4,
    impact: 'High',
    timeHorizon: '2025',
    angle: 30,
    radius: 0.4,
    tags: ['AI', 'Hardware', 'IoT'],
    lastUpdated: '2024-01-20'
  },
  {
    id: '3',
    name: 'Neural Interfaces',
    description: 'Brain-computer interfaces that enable direct communication between the human brain and external devices.',
    category: 'Technology',
    readinessLevel: 5,
    businessReadiness: 2,
    impact: 'Transformative',
    timeHorizon: '2028',
    angle: 60,
    radius: 0.7,
    tags: ['Neuroscience', 'Medical', 'Interface'],
    lastUpdated: '2024-01-18'
  },
  {
    id: '4',
    name: 'Autonomous Vehicles',
    description: 'Self-driving vehicles using AI, sensors, and mapping technology to navigate without human intervention.',
    category: 'Technology',
    readinessLevel: 8,
    businessReadiness: 3,
    impact: 'High',
    timeHorizon: '2026',
    angle: 15,
    radius: 0.5,
    tags: ['Transportation', 'AI', 'Safety'],
    lastUpdated: '2024-01-22'
  },

  // Industry Quadrant (90-180 degrees)
  {
    id: '5',
    name: 'Vertical Farming',
    description: 'Indoor agriculture using controlled environments and stacked growing systems to maximize crop yield in minimal space.',
    category: 'Industry',
    readinessLevel: 8,
    businessReadiness: 4,
    impact: 'High',
    timeHorizon: '2025',
    angle: 120,
    radius: 0.3,
    tags: ['Agriculture', 'Sustainability', 'Food Security'],
    lastUpdated: '2024-01-19'
  },
  {
    id: '6',
    name: 'Space Manufacturing',
    description: 'Manufacturing processes conducted in space to take advantage of microgravity and vacuum conditions.',
    category: 'Industry',
    readinessLevel: 3,
    businessReadiness: 1,
    impact: 'Transformative',
    timeHorizon: '2029+',
    angle: 135,
    radius: 0.9,
    tags: ['Space', 'Manufacturing', 'Materials'],
    lastUpdated: '2024-01-16'
  },
  {
    id: '7',
    name: 'Synthetic Biology',
    description: 'Engineering biological systems and organisms to produce useful chemicals, materials, and medicines.',
    category: 'Industry',
    readinessLevel: 6,
    businessReadiness: 3,
    impact: 'High',
    timeHorizon: '2027',
    angle: 105,
    radius: 0.6,
    tags: ['Biotechnology', 'Medicine', 'Materials'],
    lastUpdated: '2024-01-21'
  },
  {
    id: '8',
    name: 'Digital Twins',
    description: 'Virtual replicas of physical systems that enable real-time monitoring, simulation, and optimization.',
    category: 'Industry',
    readinessLevel: 7,
    businessReadiness: 4,
    impact: 'Medium',
    timeHorizon: '2025',
    angle: 150,
    radius: 0.4,
    tags: ['Simulation', 'IoT', 'Optimization'],
    lastUpdated: '2024-01-23'
  },

  // Humanity Quadrant (180-270 degrees)
  {
    id: '9',
    name: 'Universal Basic Income',
    description: 'Government program providing regular, unconditional cash payments to all citizens regardless of employment status.',
    category: 'Humanity',
    readinessLevel: 9,
    businessReadiness: 2,
    impact: 'Transformative',
    timeHorizon: '2028',
    angle: 225,
    radius: 0.7,
    tags: ['Economics', 'Social Policy', 'Automation'],
    lastUpdated: '2024-01-17'
  },
  {
    id: '10',
    name: 'Personalized Medicine',
    description: 'Medical treatment tailored to individual genetic, environmental, and lifestyle factors.',
    category: 'Humanity',
    readinessLevel: 7,
    businessReadiness: 4,
    impact: 'High',
    timeHorizon: '2026',
    angle: 210,
    radius: 0.5,
    tags: ['Healthcare', 'Genetics', 'Treatment'],
    lastUpdated: '2024-01-24'
  },
  {
    id: '11',
    name: 'Virtual Reality Education',
    description: 'Immersive learning experiences using VR technology to enhance education and training.',
    category: 'Humanity',
    readinessLevel: 8,
    businessReadiness: 3,
    impact: 'Medium',
    timeHorizon: '2025',
    angle: 195,
    radius: 0.4,
    tags: ['Education', 'VR', 'Training'],
    lastUpdated: '2024-01-25'
  },
  {
    id: '12',
    name: 'Longevity Therapies',
    description: 'Medical interventions designed to extend healthy human lifespan and delay aging processes.',
    category: 'Humanity',
    readinessLevel: 4,
    businessReadiness: 2,
    impact: 'Transformative',
    timeHorizon: '2029+',
    angle: 240,
    radius: 0.8,
    tags: ['Healthcare', 'Aging', 'Biotechnology'],
    lastUpdated: '2024-01-26'
  },

  // Mixed/Cross-cutting trends (270-360 degrees)
  {
    id: '13',
    name: 'Decentralized Internet',
    description: 'Distributed network architecture that reduces reliance on centralized servers and intermediaries.',
    category: 'Technology',
    readinessLevel: 6,
    businessReadiness: 3,
    impact: 'High',
    timeHorizon: '2027',
    angle: 315,
    radius: 0.6,
    tags: ['Internet', 'Decentralization', 'Privacy'],
    lastUpdated: '2024-01-27'
  },
  {
    id: '14',
    name: 'Climate Engineering',
    description: 'Large-scale technological interventions to counteract climate change effects.',
    category: 'Industry',
    readinessLevel: 5,
    businessReadiness: 2,
    impact: 'Transformative',
    timeHorizon: '2028',
    angle: 285,
    radius: 0.7,
    tags: ['Climate', 'Engineering', 'Environment'],
    lastUpdated: '2024-01-28'
  },
  {
    id: '15',
    name: 'Augmented Reality Workspaces',
    description: 'AR-enhanced work environments that overlay digital information onto physical spaces.',
    category: 'Technology',
    readinessLevel: 7,
    businessReadiness: 4,
    impact: 'Medium',
    timeHorizon: '2025',
    angle: 300,
    radius: 0.4,
    tags: ['AR', 'Workplace', 'Productivity'],
    lastUpdated: '2024-01-29'
  }
];

export const radarQuadrants = [
  {
    name: 'Technology',
    color: '#22c55e',
    startAngle: 0,
    endAngle: 90
  },
  {
    name: 'Industry',
    color: '#3b82f6',
    startAngle: 90,
    endAngle: 180
  },
  {
    name: 'Humanity',
    color: '#f59e0b',
    startAngle: 180,
    endAngle: 270
  },
  {
    name: 'Future',
    color: '#8b5cf6',
    startAngle: 270,
    endAngle: 360
  }
];