// ProjectMatch Synthesis Data Store & Mock Data Engine

export const INITIAL_USER_PROFILE = {
  id: 'usr_maya_chen',
  name: 'Maya Chen',
  role: 'Creative Technologist & Lead Product Architect',
  location: 'GMT-8 (San Francisco)',
  availability: '12-16 hrs/wk',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Specializing in high-density technical interfaces, WebGL data visualization pipelines, and robust modular design systems for deep-tech hardware and scientific computing.',
  capabilitySignature: [
    { label: 'Product Design', score: 95, color: 'primary' },
    { label: 'UX Research', score: 88, color: 'secondary' },
    { label: 'Design Systems', score: 92, color: 'tertiary' },
    { label: 'WebGL & Shaders', score: 90, color: 'primary' },
    { label: 'Prototyping', score: 80, color: 'text-secondary' }
  ],
  capabilityVector: [
    { label: 'Frontend Architecture', value: 0.89, score: '89%', color: 'primary' },
    { label: 'Data Visualization', value: 0.94, score: '94%', color: 'primary' },
    { label: 'Backend Services', value: 0.62, score: '62%', color: 'secondary' },
    { label: 'Distributed Systems', value: 0.74, score: '74%', color: 'tertiary' }
  ],
  selectedBuilds: [
    {
      id: 'build_fintech_core',
      title: 'Fintech Core App',
      description: 'Led UX overhaul for latency-sensitive ultra-high frequency trading terminal.',
      image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
      tags: ['TypeScript', 'WebGL', 'Design System'],
      accent: 'primary'
    },
    {
      id: 'build_aero_logistics',
      title: 'Aero Logistics Node',
      description: 'Created comprehensive design system for orbital payload and global supply chain tracker.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      tags: ['Three.js', 'Telemetry', 'Rust'],
      accent: 'secondary'
    },
    {
      id: 'build_quantum_circuits',
      title: 'Q-Simulator Studio',
      description: 'Interactive circuit visualizer for 128-qubit quantum state simulations.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
      tags: ['Quantum Viz', 'GLSL', 'Next.js'],
      accent: 'tertiary'
    }
  ]
};

export const INITIAL_PROJECTS = [
  {
    id: 'proj_quantum_state',
    title: 'Quantum State Visualizer',
    matchScore: 92,
    category: 'High Signal',
    tagline: 'WebGL-based visualization interface for real-time quantum circuit simulation telemetry.',
    description: 'We are developing an open-source real-time visualization layer for superconducting quantum processors. We need a specialist in WebGL, GPU buffer optimization, and ergonomic multi-dimensional UI representation.',
    duration: '3 mos',
    slotsFilled: 4,
    totalSlots: 5,
    capabilities: ['WebGL', 'React.js', 'Three.js', 'Data Viz'],
    matchingCapabilities: ['WebGL', 'React.js', 'Data Viz'],
    lead: 'Dr. Evelyn Vance',
    leadAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    whyThisMatch: 'Your extensive background in WebGL and recent projects in Data Visualization perfectly fills their current capability gap. The team operates in PST (aligned with your timezone).',
    bookmarked: false,
    colorAccent: 'primary'
  },
  {
    id: 'proj_quantum_network',
    title: 'Quantum Network Interface',
    matchScore: 94,
    category: 'High Signal',
    tagline: 'Designing the orchestration layer for photonic network routing infrastructure.',
    description: 'Looking for a systems architect to design the orchestration layer for a new photonic network infrastructure with sub-nanosecond synchronization guarantees.',
    duration: '4 mos',
    slotsFilled: 3,
    totalSlots: 6,
    capabilities: ['Rust', 'Architecture', 'Distributed Systems', 'C++'],
    matchingCapabilities: ['Rust', 'Architecture'],
    lead: 'Dr. Aris Thorne',
    leadAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    whyThisMatch: 'High resonance with your architectural modularity standards and system state modeling paradigms.',
    bookmarked: true,
    colorAccent: 'primary'
  },
  {
    id: 'proj_synth_vst',
    title: 'Synthesizer VST Engine',
    matchScore: 88,
    category: 'Audio / DSP',
    tagline: 'DSP specialist to optimize real-time audio processing for granular synthesis modules.',
    description: 'Need a DSP specialist and interface architect to build sleek hardware-inspired visual controllers and optimize audio processing algorithms for a new granular synthesis module.',
    duration: '2 mos',
    slotsFilled: 2,
    totalSlots: 3,
    capabilities: ['C++', 'DSP', 'Audio UI', 'JUCE'],
    matchingCapabilities: ['Audio UI', 'C++'],
    lead: 'Marcus Lindqvist',
    leadAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    whyThisMatch: 'Your precision tactile UI designs match their studio hardware philosophy.',
    bookmarked: false,
    colorAccent: 'secondary'
  },
  {
    id: 'proj_neural_mesh',
    title: 'Neural Mesh Infrastructure',
    matchScore: 75,
    category: 'Decentralized AI',
    tagline: 'Distributed node network for decentralized machine learning training protocol.',
    description: 'Architecting the peer-to-peer node network for distributed weight gradient aggregation across asynchronous compute nodes with Byzantine fault tolerance.',
    duration: '6 mos',
    slotsFilled: 2,
    totalSlots: 4,
    capabilities: ['Rust', 'Distributed Systems', 'GraphQL', 'PostgreSQL'],
    matchingCapabilities: ['Rust', 'GraphQL'],
    lead: 'Sora Takahashi',
    leadAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    whyThisMatch: 'Solid secondary capability alignment on distributed protocol APIs and schema modeling.',
    bookmarked: false,
    colorAccent: 'secondary'
  },
  {
    id: 'proj_drone_swarm',
    title: 'Autonomous Drone Swarm',
    matchScore: 82,
    category: 'Robotics',
    tagline: 'Computer vision and spatial topology tracking across distributed aerial nodes.',
    description: 'Seeking spatial data visualization and computer vision expertise for real-time collision avoidance and coordinated mesh navigation in unstructured outdoor environments.',
    duration: '5 mos',
    slotsFilled: 3,
    totalSlots: 5,
    capabilities: ['Python', 'Computer Vision', 'ROS 2', 'Spatial 3D'],
    matchingCapabilities: ['Spatial 3D', 'Python'],
    lead: 'Elena Rostova',
    leadAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    whyThisMatch: 'Your expertise in spatial rendering and 3D coordinate spaces completes their telemetry stack.',
    bookmarked: false,
    colorAccent: 'tertiary'
  },
  {
    id: 'proj_bio_sequencing',
    title: 'Genomic Helix Synthesizer',
    matchScore: 86,
    category: 'Biotech',
    tagline: 'High-throughput CRISPR target mutation mapping and interactive 3D visualizer.',
    description: 'Building an interactive 3D browser client for exploring genomic sequence alignments and predicting secondary RNA folding structures under targeted mutations.',
    duration: '4 mos',
    slotsFilled: 1,
    totalSlots: 4,
    capabilities: ['Three.js', 'Bioinformatics', 'WebGL', 'TypeScript'],
    matchingCapabilities: ['Three.js', 'WebGL', 'TypeScript'],
    lead: 'Dr. K. Vance',
    leadAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    whyThisMatch: 'Very high WebGL/Three.js overlap with an open frontend architect leadership seat.',
    bookmarked: false,
    colorAccent: 'primary'
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'req_01',
    type: 'RECEIVED',
    status: 'PENDING',
    initiatorName: 'Dr. Aris Thorne',
    initiatorTitle: 'Project Lead',
    initiatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    projectName: 'Orbital Tether Beta',
    role: 'Lead Telemetry Architect',
    compatibility: 94.2,
    keySkills: ['SYS-ARCH', 'MAT-SCI', 'WEBGL'],
    timeRemaining: '14:02:11',
    timestamp: '2026-08-25T08:30:00Z',
    note: 'Maya, your work on high-frequency state visualization would dramatically accelerate our flight control deployment.'
  },
  {
    id: 'req_02',
    type: 'SENT',
    status: 'ACCEPTED',
    initiatorName: 'Nexus Synthesis Lab',
    initiatorTitle: 'Research Institution',
    initiatorAvatar: null,
    projectName: 'Quantum State Visualizer',
    role: 'Lead Data Architect',
    compatibility: 88.7,
    keySkills: ['ML-OPS', 'DAT-ENG', 'THREE.JS'],
    timestamp: '2026-08-24T18:33:00Z',
    note: 'Application approved by Dr. Evelyn Vance. Team workspace unlocked.'
  },
  {
    id: 'req_03',
    type: 'RECEIVED',
    status: 'DECLINED',
    initiatorName: 'K. Vance',
    initiatorTitle: 'Security Director',
    initiatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    projectName: 'Project: Obsidian',
    role: 'SecOps Cryptographer',
    compatibility: 42.1,
    keySkills: ['SEC-OPS', 'CRYPTO'],
    timestamp: '2026-08-23T11:45:00Z',
    note: 'Topology mismatch: Current capability profile heavily weighted toward design/rendering.'
  }
];

export const TOPOLOGY_SATELLITE_NODES = [
  { name: 'WebGL Core', score: 94, angle: 0, radius: 2.2, color: 0x22d3ee, info: 'High-throughput GPU shader rendering and custom buffer geometry pipelines.' },
  { name: 'UI / UX Architecture', score: 96, angle: 1.256, radius: 2.3, color: 0x8b5cf6, info: 'Glassmorphic design system tokens, typography hierarchy, and fluid interaction.' },
  { name: 'Distributed Systems', score: 78, angle: 2.513, radius: 2.1, color: 0xd946ef, info: 'Asynchronous event streaming and resilient peer-to-peer state synchronization.' },
  { name: 'Real-time DSP', score: 85, angle: 3.769, radius: 2.4, color: 0x34d399, info: 'Ultra-low latency audio/telemetry processing and waveform analysis.' },
  { name: 'Bio/Quantum Viz', score: 91, angle: 5.026, radius: 2.2, color: 0x5de6ff, info: '3D spatial coordinate projection for complex scientific data models.' }
];

// Helper to access and mutate state with LocalStorage persistence
const STORAGE_KEY = 'projectmatch_synthesis_state_v1';

export function getAppState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('LocalStorage error, falling back to default mock data', e);
  }

  const initialState = {
    profile: INITIAL_USER_PROFILE,
    projects: INITIAL_PROJECTS,
    requests: INITIAL_REQUESTS,
    filters: {
      search: '',
      tech: 'ALL',
      availability: 'ALL'
    }
  };
  saveAppState(initialState);
  return initialState;
}

export function saveAppState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state to localStorage', e);
  }
}
