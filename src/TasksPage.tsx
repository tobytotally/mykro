import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PencilIcon,
  DocumentTextIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTaskStore, Task, Deliverable, Document } from './stores/taskStore';
import { format } from 'date-fns';
import { useDocumentTitle } from './shared/hooks/useDocumentTitle';
import MykroDonationCalculator from '../knowledge/business/mykro-donation-calculator';

export function TasksPage() {
  const { 
    tasks, 
    deliverables,
    documents,
    addTask, 
    updateTask, 
    moveTask,
    deleteTask,
    getTasksByDeliverable,
    reorderDeliverables,
    addDocument,
    deleteDocument,
    getDocumentsByDeliverable
  } = useTaskStore();

  const [activeTab, setActiveTab] = useState<'tasks' | 'documents' | 'tools'>('tasks');

  // Update document title dynamically based on active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'tasks': return 'Tasks';
      case 'documents': return 'Documents';
      case 'tools': return 'Tools';
      default: return 'Tasks';
    }
  };

  useDocumentTitle(getPageTitle());
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddDeliverable, setShowAddDeliverable] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<string | null>(null);
  const [expandedDeliverable, setExpandedDeliverable] = useState<string | null>(null);
  const [draggedDeliverable, setDraggedDeliverable] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: 'Toby' as Task['assignee'],
    priority: 'medium' as Task['priority'],
    deliverable: '',
    dueDate: ''
  });

  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'pdf' as Document['type'],
    description: '',
    deliverable: '',
    tags: '',
    uploadedBy: 'Toby' as Document['uploadedBy']
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-white dark:bg-gray-700', lineColor: 'bg-gray-400' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-white dark:bg-gray-700', lineColor: 'bg-blue-500' },
    { id: 'review', title: 'Review', color: 'bg-white dark:bg-gray-700', lineColor: 'bg-yellow-500' },
    { id: 'done', title: 'Done', color: 'bg-white dark:bg-gray-700', lineColor: 'bg-green-500' }
  ];

  // Theme management
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => 
      task.status === status && 
      (!selectedDeliverable || task.deliverable === selectedDeliverable)
    );
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, status);
  };

  const handleDeliverableDragStart = (e: React.DragEvent, deliverableId: string) => {
    setDraggedDeliverable(deliverableId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDeliverableDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDeliverableDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedDeliverable && draggedDeliverable !== targetId) {
      const draggedIndex = deliverables.findIndex(d => d.id === draggedDeliverable);
      const targetIndex = deliverables.findIndex(d => d.id === targetId);
      
      const newDeliverables = [...deliverables];
      const [removed] = newDeliverables.splice(draggedIndex, 1);
      newDeliverables.splice(targetIndex, 0, removed);
      
      reorderDeliverables(newDeliverables);
    }
    setDraggedDeliverable(null);
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        status: 'todo',
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined
      });
      setNewTask({
        title: '',
        description: '',
        assignee: 'Toby',
        priority: 'medium',
        deliverable: '',
        dueDate: ''
      });
      setShowAddTask(false);
    }
  };

  const handleAddDocument = () => {
    if (newDocument.name.trim()) {
      const mockFileSize = Math.floor(Math.random() * 5000000) + 50000; // 50KB - 5MB
      const mockUrl = `/documents/${newDocument.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      addDocument({
        ...newDocument,
        size: mockFileSize,
        url: mockUrl,
        tags: newDocument.tags ? newDocument.tags.split(',').map(tag => tag.trim()) : []
      });
      
      setNewDocument({
        name: '',
        type: 'pdf',
        description: '',
        deliverable: '',
        tags: '',
        uploadedBy: 'Toby'
      });
      setShowAddDocument(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <DocumentIcon className="w-4 h-4 text-red-500" />;
      case 'docx':
        return <DocumentTextIcon className="w-4 h-4 text-blue-500" />;
      case 'markdown':
        return <DocumentTextIcon className="w-4 h-4 text-gray-500" />;
      default:
        return <DocumentIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    }
  };

  const getAssigneeColor = (assignee?: Task['assignee']) => {
    switch (assignee) {
      case 'Toby': return 'bg-blue-500';
      case 'Mike': return 'bg-purple-500';
      case 'Both': return 'bg-gradient-to-r from-blue-500 to-purple-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="w-full px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 dark:text-white">Project Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Collaborative workspace for Toby & Mike
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Horizontal Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="w-full px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'tasks', label: 'Tasks & Deliverables', count: tasks.length },
              { id: 'documents', label: 'Documents', count: documents.length },
              { id: 'tools', label: 'Tools', count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && (
        <div className="w-full px-8 py-8 flex gap-8">
          {/* Left Sidebar - Deliverables */}
          <aside className="w-80 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Core Deliverables</h2>
            <button
              onClick={() => setShowAddDeliverable(true)}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              title="Add Deliverable"
            >
              <PlusIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          {selectedDeliverable && (
            <div className="mb-4 p-3 bg-purple-600 dark:bg-purple-700 rounded-lg min-h-[60px] border-2 border-purple-700 dark:border-purple-800">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm text-white">Showing tasks for:</span>
                <button
                  onClick={() => setSelectedDeliverable(null)}
                  className="text-sm text-white hover:text-purple-100 underline"
                >
                  Clear filter
                </button>
              </div>
              <p className="text-sm font-semibold text-white">
                {deliverables.find(d => d.id === selectedDeliverable)?.name}
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            {deliverables.map((deliverable) => {
              const taskCount = getTasksByDeliverable(deliverable.id).length;
              const completedTasks = getTasksByDeliverable(deliverable.id).filter(
                t => t.status === 'done'
              ).length;
              const isExpanded = expandedDeliverable === deliverable.id;
              const isSelected = selectedDeliverable === deliverable.id;
              
              return (
                <motion.div
                  key={deliverable.id}
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 'auto' }}
                  className={`bg-white dark:bg-gray-700 rounded-lg border-2 transition-all cursor-move ${
                    isSelected
                      ? 'border-purple-500' 
                      : 'border-gray-200 dark:border-gray-600'
                  } ${
                    draggedDeliverable === deliverable.id ? 'opacity-50' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDeliverableDragStart(e, deliverable.id)}
                  onDragOver={handleDeliverableDragOver}
                  onDrop={(e) => handleDeliverableDrop(e, deliverable.id)}
                >
                  <div 
                    className="p-3 cursor-pointer"
                    onClick={() => setSelectedDeliverable(
                      isSelected ? null : deliverable.id
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDeliverable(isExpanded ? null : deliverable.id);
                          }}
                          className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        >
                          {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">{deliverable.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {isExpanded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit deliverable functionality here
                            }}
                            className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                            title="Edit Deliverable"
                          >
                            <PencilIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${getAssigneeColor(deliverable.owner)}`}>
                          <span className="text-white">{deliverable.owner}</span>
                        </span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{deliverable.progress}%</span>
                      </div>
                    </div>
                    
                    {/* Compact progress bar */}
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                      <div 
                        className="bg-purple-600 h-1 rounded-full transition-all"
                        style={{ width: `${deliverable.progress}%` }}
                      />
                    </div>
                    
                    {/* Task count - always visible */}
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {completedTasks}/{taskCount} tasks completed
                    </div>
                  </div>
                  
                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-3 pb-3 overflow-hidden"
                      >
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {deliverable.description}
                          </p>
                          {deliverable.dueDate && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Due: {format(deliverable.dueDate, 'MMMM d, yyyy')}
                            </p>
                          )}
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            Status: {deliverable.status.replace('-', ' ')}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </aside>

        {/* Right Side - Kanban Board */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Task Board</h2>
            <button
              onClick={() => setShowAddTask(true)}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              title="Add Task"
            >
              <PlusIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg p-4 min-h-[400px]`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            >
              <div className="mb-4">
                <h3 className="font-medium flex items-center justify-between text-gray-900 dark:text-white pb-2">
                  {column.title}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getTasksByStatus(column.id as Task['status']).length}
                  </span>
                </h3>
                <div className={`h-0.5 ${column.lineColor} rounded-full`}></div>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {getTasksByStatus(column.id as Task['status']).map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">{task.title}</h4>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit task functionality here
                            }}
                            className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                            title="Edit Task"
                          >
                            <PencilIcon className="w-3 h-3 text-gray-500" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-gray-400 hover:text-red-600 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        
                        {task.assignee && (
                          <span className={`text-xs text-white px-2 py-1 rounded-full ${getAssigneeColor(task.assignee)}`}>
                            {task.assignee}
                          </span>
                        )}
                        
                        {task.dueDate && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {format(new Date(task.dueDate), 'MMM d')}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
          </div>
        </main>
      </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="w-full px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Documents Library</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage project documents and files</p>
            </div>
            <button
              onClick={() => setShowAddDocument(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Add Document
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-4">
              <select
                value={selectedDeliverable || ''}
                onChange={(e) => setSelectedDeliverable(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 text-sm"
              >
                <option value="">All documents</option>
                {deliverables.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {selectedDeliverable && (
                <button
                  onClick={() => setSelectedDeliverable(null)}
                  className="text-sm text-purple-600 hover:text-purple-700 underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(selectedDeliverable
              ? getDocumentsByDeliverable(selectedDeliverable)
              : documents
            ).map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {doc.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(doc.size)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => window.open(doc.url, '_blank')}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      title="Download"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-500 hover:text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {doc.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {doc.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>By {doc.uploadedBy}</span>
                  <span>{format(doc.uploadedAt, 'MMM d, yyyy')}</span>
                </div>
                
                {doc.deliverable && (
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                      {deliverables.find(d => d.id === doc.deliverable)?.name}
                    </span>
                  </div>
                )}
                
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {(selectedDeliverable
            ? getDocumentsByDeliverable(selectedDeliverable).length === 0
            : documents.length === 0
          ) && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <DocumentIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                {selectedDeliverable ? 'No documents for this deliverable' : 'No documents yet'}
              </h3>
              <p className="text-sm mb-4">
                {selectedDeliverable 
                  ? 'Try selecting a different deliverable or clear the filter'
                  : 'Get started by uploading your first document'
                }
              </p>
              <button
                onClick={() => setShowAddDocument(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Document
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="w-full px-8 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Mykro Donation Calculator</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Model charitable impact for UK online betting market</p>
          </div>

          {/* Donation Calculator - Inline Display */}
          <div className="mb-8">
            <MykroDonationCalculator />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Project Tools</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Additional utilities and tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Analytics Tool */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Project Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View progress and statistics</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Tasks:</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                  <span className="font-medium text-green-600">{tasks.filter(t => t.status === 'done').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">In Progress:</span>
                  <span className="font-medium text-blue-600">{tasks.filter(t => t.status === 'in-progress').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                  <span className="font-medium">{documents.length}</span>
                </div>
              </div>
            </div>

            {/* Export Tool */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <ArrowDownTrayIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Export tasks and documents</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Export Tasks as CSV
                </button>
                <button className="w-full text-left px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Export Document List
                </button>
              </div>
            </div>

            {/* Settings Tool */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Project Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Configure project preferences</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{darkMode ? 'Dark' : 'Light'}</span>
                    <button
                      onClick={toggleTheme}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {darkMode ? (
                        <SunIcon className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <MoonIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Notifications:</span>
                  <span className="text-sm font-medium">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Add New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    placeholder="Task title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    rows={3}
                    placeholder="Task description (optional)"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Assignee</label>
                    <select
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value as Task['assignee'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    >
                      <option value="Toby">Toby</option>
                      <option value="Mike">Mike</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Deliverable</label>
                  <select
                    value={newTask.deliverable}
                    onChange={(e) => setNewTask({ ...newTask, deliverable: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                  >
                    <option value="">No deliverable</option>
                    {deliverables.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddTask}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Document Modal */}
      <AnimatePresence>
        {showAddDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddDocument(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Add New Document</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Document Name</label>
                  <input
                    type="text"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    placeholder="e.g., Business Plan v1.2.pdf"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">File Type</label>
                  <select
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value as Document['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">Word Document</option>
                    <option value="markdown">Markdown</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    rows={2}
                    placeholder="Brief description of the document (optional)"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Uploaded By</label>
                    <select
                      value={newDocument.uploadedBy}
                      onChange={(e) => setNewDocument({ ...newDocument, uploadedBy: e.target.value as Document['uploadedBy'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    >
                      <option value="Toby">Toby</option>
                      <option value="Mike">Mike</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Deliverable</label>
                    <select
                      value={newDocument.deliverable}
                      onChange={(e) => setNewDocument({ ...newDocument, deliverable: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    >
                      <option value="">No deliverable</option>
                      {deliverables.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tags</label>
                  <input
                    type="text"
                    value={newDocument.tags}
                    onChange={(e) => setNewDocument({ ...newDocument, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate tags with commas</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddDocument}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Document
                </button>
                <button
                  onClick={() => setShowAddDocument(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}