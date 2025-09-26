import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee?: 'Toby' | 'Mike' | 'Both';
  priority: 'low' | 'medium' | 'high';
  deliverable?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  dueDate?: Date;
  owner: 'Toby' | 'Mike' | 'Both';
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'markdown';
  size: number;
  url: string;
  uploadedBy: 'Toby' | 'Mike';
  uploadedAt: Date;
  deliverable?: string;
  tags?: string[];
  description?: string;
}

interface TaskStore {
  tasks: Task[];
  deliverables: Deliverable[];
  documents: Document[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  addDeliverable: (deliverable: Omit<Deliverable, 'id'>) => void;
  updateDeliverable: (id: string, updates: Partial<Deliverable>) => void;
  reorderDeliverables: (deliverables: Deliverable[]) => void;
  getTasksByDeliverable: (deliverableId: string) => Task[];
  getTasksByAssignee: (assignee: Task['assignee']) => Task[];
  addDocument: (doc: Omit<Document, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;
  getDocumentsByDeliverable: (deliverableId: string) => Document[];
}

// Core deliverables
const initialDeliverables: Deliverable[] = [
  {
    id: 'pitch-deck',
    name: 'Pitch Deck',
    description: 'Investor presentation deck with business model, market opportunity, and financial projections',
    status: 'in-progress',
    progress: 65,
    owner: 'Both',
    dueDate: new Date('2024-02-15')
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    description: 'Complete brand guidelines including logo, colors, typography, and visual assets',
    status: 'in-progress',
    progress: 80,
    owner: 'Mike'
  },
  {
    id: 'business-model',
    name: 'Business Model',
    description: 'Revenue streams, pricing strategy, and unit economics',
    status: 'in-progress',
    progress: 70,
    owner: 'Toby'
  },
  {
    id: 'mvp-development',
    name: 'MVP Development',
    description: 'Minimum viable product with core features for initial market testing',
    status: 'in-progress',
    progress: 85,
    owner: 'Mike'
  },
  {
    id: 'go-to-market',
    name: 'Go-to-Market Strategy',
    description: 'Launch plan, marketing channels, and customer acquisition strategy',
    status: 'not-started',
    progress: 0,
    owner: 'Toby'
  },
  {
    id: 'partnerships',
    name: 'Strategic Partnerships',
    description: 'Operator partnerships and charity network development',
    status: 'in-progress',
    progress: 40,
    owner: 'Both'
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    description: 'Gambling regulations, charity compliance, and legal structure',
    status: 'not-started',
    progress: 0,
    owner: 'Toby'
  },
  {
    id: 'fundraising',
    name: 'Fundraising',
    description: 'Seed round preparation and investor outreach',
    status: 'not-started',
    progress: 0,
    owner: 'Both',
    dueDate: new Date('2024-03-01')
  }
];

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Finalize financial projections',
    description: 'Complete 3-year financial model with revenue assumptions',
    status: 'in-progress',
    assignee: 'Toby',
    priority: 'high',
    deliverable: 'pitch-deck',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    dueDate: new Date('2024-01-25')
  },
  {
    id: '2',
    title: 'Design pitch deck slides',
    description: 'Create visual design for all slides maintaining brand consistency',
    status: 'todo',
    assignee: 'Mike',
    priority: 'high',
    deliverable: 'pitch-deck',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    title: 'Implement donation tracking API',
    description: 'Build API endpoints for tracking and aggregating donations',
    status: 'in-progress',
    assignee: 'Mike',
    priority: 'high',
    deliverable: 'mvp-development',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '4',
    title: 'Research UK gambling regulations',
    description: 'Document compliance requirements for charity integration',
    status: 'todo',
    assignee: 'Toby',
    priority: 'medium',
    deliverable: 'legal-compliance',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '5',
    title: 'Create brand style guide',
    description: 'Document all brand assets and usage guidelines',
    status: 'review',
    assignee: 'Mike',
    priority: 'medium',
    deliverable: 'brand-identity',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '6',
    title: 'Operator partnership deck',
    description: 'Create presentation for betting operator partnerships',
    status: 'todo',
    assignee: 'Both',
    priority: 'high',
    deliverable: 'partnerships',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    dueDate: new Date('2024-02-01')
  }
];

// Sample initial documents
const initialDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Mykro Pitch Deck v2.3.pdf',
    type: 'pdf',
    size: 2457600, // 2.4 MB
    url: '/documents/mykro-pitch-deck.pdf',
    uploadedBy: 'Toby',
    uploadedAt: new Date('2024-01-14'),
    deliverable: 'pitch-deck',
    description: 'Latest version with updated financial projections',
    tags: ['pitch', 'investors', 'financials']
  },
  {
    id: 'doc-2',
    name: 'Brand Guidelines.pdf',
    type: 'pdf',
    size: 5242880, // 5 MB
    url: '/documents/brand-guidelines.pdf',
    uploadedBy: 'Mike',
    uploadedAt: new Date('2024-01-12'),
    deliverable: 'brand-identity',
    description: 'Complete brand identity guidelines including logo usage',
    tags: ['branding', 'design', 'guidelines']
  },
  {
    id: 'doc-3',
    name: 'Technical Architecture.md',
    type: 'markdown',
    size: 45056, // 44 KB
    url: '/documents/technical-architecture.md',
    uploadedBy: 'Mike',
    uploadedAt: new Date('2024-01-10'),
    deliverable: 'mvp-development',
    description: 'System architecture and API documentation',
    tags: ['technical', 'api', 'architecture']
  },
  {
    id: 'doc-4',
    name: 'UK Gambling Regulations Summary.docx',
    type: 'docx',
    size: 89088, // 87 KB
    url: '/documents/uk-gambling-regulations.docx',
    uploadedBy: 'Toby',
    uploadedAt: new Date('2024-01-08'),
    deliverable: 'legal-compliance',
    description: 'Key regulatory requirements for UK market',
    tags: ['legal', 'compliance', 'regulations']
  },
  {
    id: 'doc-5',
    name: 'Partnership Proposal Template.docx',
    type: 'docx',
    size: 67584, // 66 KB
    url: '/documents/partnership-template.docx',
    uploadedBy: 'Toby',
    uploadedAt: new Date('2024-01-15'),
    deliverable: 'partnerships',
    description: 'Template for operator partnership proposals',
    tags: ['partnerships', 'template']
  }
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      deliverables: initialDeliverables,
      documents: initialDocuments,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date() }
              : task
          )
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }));
      },

      moveTask: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus, updatedAt: new Date() }
              : task
          )
        }));
      },

      addDeliverable: (deliverableData) => {
        const newDeliverable: Deliverable = {
          ...deliverableData,
          id: Date.now().toString()
        };
        set((state) => ({
          deliverables: [...state.deliverables, newDeliverable]
        }));
      },

      updateDeliverable: (id, updates) => {
        set((state) => ({
          deliverables: state.deliverables.map((deliverable) =>
            deliverable.id === id
              ? { ...deliverable, ...updates }
              : deliverable
          )
        }));

        // Update progress based on related tasks
        if (updates.status !== undefined) {
          const tasks = get().getTasksByDeliverable(id);
          const completedTasks = tasks.filter(t => t.status === 'done').length;
          const progress = tasks.length > 0 
            ? Math.round((completedTasks / tasks.length) * 100)
            : 0;
          
          set((state) => ({
            deliverables: state.deliverables.map((deliverable) =>
              deliverable.id === id
                ? { ...deliverable, progress }
                : deliverable
            )
          }));
        }
      },

      reorderDeliverables: (newDeliverables) => {
        set({ deliverables: newDeliverables });
      },

      getTasksByDeliverable: (deliverableId) => {
        return get().tasks.filter((task) => task.deliverable === deliverableId);
      },

      getTasksByAssignee: (assignee) => {
        return get().tasks.filter((task) => 
          assignee === 'Both' 
            ? task.assignee === 'Both'
            : task.assignee === assignee || task.assignee === 'Both'
        );
      },

      addDocument: (docData) => {
        const newDocument: Document = {
          ...docData,
          id: Date.now().toString(),
          uploadedAt: new Date()
        };
        set((state) => ({ documents: [...state.documents, newDocument] }));
      },

      deleteDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id)
        }));
      },

      getDocumentsByDeliverable: (deliverableId) => {
        return get().documents.filter((doc) => doc.deliverable === deliverableId);
      }
    }),
    {
      name: 'mykro-tasks-storage'
    }
  )
);