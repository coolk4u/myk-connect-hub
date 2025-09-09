export interface Interest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'quoted' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  quote?: Quote;
  progress?: Progress[];
  assessmentPaid: boolean;
  totalPaid: number;
  totalAmount: number;
}

export interface Quote {
  id: string;
  amount: number;
  materials: Material[];
  validUntil: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

export interface Progress {
  id: string;
  milestone: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
  paymentDue: number;
  paymentStatus: 'pending' | 'paid';
}

export const mockInterests: Interest[] = [
  {
    id: '1',
    title: 'Bathroom Renovation - Premium Tiles',
    description: 'Complete bathroom tiling with premium ceramic tiles and waterproofing',
    category: 'Bathroom Tiling',
    status: 'in-progress',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    assessmentPaid: true,
    totalPaid: 1500,
    totalAmount: 8500,
    quote: {
      id: 'q1',
      amount: 8500,
      validUntil: '2024-02-15',
      notes: 'Premium ceramic tiles with advanced waterproofing system',
      status: 'approved',
      materials: [
        {
          id: 'm1',
          name: 'Premium Ceramic Tiles (60x60cm)',
          quantity: 45,
          unit: 'sq ft',
          unitPrice: 85,
          totalPrice: 3825,
          category: 'Tiles'
        },
        {
          id: 'm2',
          name: 'LATICRETE Waterproofing Membrane',
          quantity: 50,
          unit: 'sq ft',
          unitPrice: 25,
          totalPrice: 1250,
          category: 'Waterproofing'
        },
        {
          id: 'm3',
          name: 'Premium Tile Adhesive',
          quantity: 8,
          unit: 'bags',
          unitPrice: 65,
          totalPrice: 520,
          category: 'Adhesive'
        },
        {
          id: 'm4',
          name: 'Grout & Sealant',
          quantity: 5,
          unit: 'kg',
          unitPrice: 45,
          totalPrice: 225,
          category: 'Finishing'
        }
      ]
    },
    progress: [
      {
        id: 'p1',
        milestone: 'Initial Assessment',
        description: 'Site survey and measurement',
        status: 'completed',
        completedAt: '2024-01-16',
        paymentDue: 500,
        paymentStatus: 'paid'
      },
      {
        id: 'p2',
        milestone: 'Material Delivery',
        description: 'All materials delivered to site',
        status: 'completed',
        completedAt: '2024-01-18',
        paymentDue: 1000,
        paymentStatus: 'paid'
      },
      {
        id: 'p3',
        milestone: 'Preparation & Waterproofing',
        description: 'Surface preparation and waterproofing installation',
        status: 'in-progress',
        paymentDue: 2500,
        paymentStatus: 'pending'
      },
      {
        id: 'p4',
        milestone: 'Tile Installation',
        description: 'Premium tile installation and alignment',
        status: 'pending',
        paymentDue: 3000,
        paymentStatus: 'pending'
      },
      {
        id: 'p5',
        milestone: 'Finishing & Cleanup',
        description: 'Grouting, sealing, and final cleanup',
        status: 'pending',
        paymentDue: 1500,
        paymentStatus: 'pending'
      }
    ]
  },
  {
    id: '2',
    title: 'Kitchen Backsplash - Designer Series',
    description: 'Designer kitchen backsplash with mosaic pattern',
    category: 'Kitchen Tiling',
    status: 'quoted',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22',
    assessmentPaid: true,
    totalPaid: 300,
    totalAmount: 4200,
    quote: {
      id: 'q2',
      amount: 4200,
      validUntil: '2024-02-20',
      notes: 'Designer mosaic tiles with premium finish',
      status: 'pending',
      materials: [
        {
          id: 'm5',
          name: 'Designer Mosaic Tiles',
          quantity: 25,
          unit: 'sq ft',
          unitPrice: 120,
          totalPrice: 3000,
          category: 'Tiles'
        },
        {
          id: 'm6',
          name: 'Premium Adhesive',
          quantity: 3,
          unit: 'bags',
          unitPrice: 75,
          totalPrice: 225,
          category: 'Adhesive'
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Commercial Floor Tiling',
    description: 'Large commercial space floor tiling project',
    category: 'Commercial Tiling',
    status: 'pending',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
    assessmentPaid: false,
    totalPaid: 0,
    totalAmount: 0
  }
];

export const tilingCategories = [
  'Bathroom Tiling',
  'Kitchen Tiling', 
  'Commercial Tiling',
  'Outdoor Tiling',
  'Pool Tiling',
  'Wall Tiling',
  'Floor Tiling'
];