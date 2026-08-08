/**
 * Experiment 6: Dynamic To-Do List Engine
 * Features: CRUD Operations, Category & Priority Filters, Search, LocalStorage
 */

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('exp6_tasks')) || this.getDefaultTasks();
        this.currentFilter = { status: 'all', category: 'all', priority: 'all', search: '' };
        
        this.initDOM();
        this.bindEvents();
        this.render();
    }

    getDefaultTasks() {
        return [
            {
                id: '1',
                title: 'Full-Stack WEB-SIMATS Assignment Submission',
                category: 'Academic',
                priority: 'High',
                dueDate: '2026-08-10',
                completed: true
            },
            {
                id: '2',
                title: 'Deploy Fitness Web Platform (React Native & Firebase)',
                category: 'Project',
                priority: 'High',
                dueDate: '2026-08-12',
                completed: false
            },
            {
                id: '3',
                title: 'Python API Integration for Weather Forecast App',
                category: 'Project',
                priority: 'Medium',
                dueDate: '2026-08-15',
                completed: false
            },
            {
                id: '4',
                title: 'Test Branch Prediction Algorithm Microarchitecture in C',
                category: 'Academic',
                priority: 'Medium',
                dueDate: '2026-08-18',
                completed: false
            }
        ];
    }

    initDOM() {
        this.taskList = document.getElementById('taskList');
        this.searchInput = document.getElementById('searchInput');
        this.statusFilter = document.getElementById('statusFilter');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.priorityFilter = document.getElementById('priorityFilter');
        
        this.totalCountEl = document.getElementById('totalTasksCount');
        this.activeCountEl = document.getElementById('activeTasksCount');
        this.completedCountEl = document.getElementById('completedTasksCount');
        
        this.modal = document.getElementById('taskModal');
        this.taskForm = document.getElementById('taskForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.taskIdInput = document.getElementById('taskId');
        this.titleInput = document.getElementById('taskTitle');
        this.categoryInput = document.getElementById('taskCategory');
        this.priorityInput = document.getElementById('taskPriority');
        this.dueDateInput = document.getElementById('taskDueDate');
    }

    bindEvents() {
        // Search & Filters
        this.searchInput.addEventListener('input', (e) => {
            this.currentFilter.search = e.target.value.toLowerCase();
            this.render();
        });

        this.statusFilter.addEventListener('change', (e) => {
            this.currentFilter.status = e.target.value;
            this.render();
        });

        this.categoryFilter.addEventListener('change', (e) => {
            this.currentFilter.category = e.target.value;
            this.render();
        });

        this.priorityFilter.addEventListener('change', (e) => {
            this.currentFilter.priority = e.target.value;
            this.render();
        });

        // Modal Open / Close
        document.getElementById('addTaskModalBtn').addEventListener('click', () => this.openModal());
        document.getElementById('closeModalBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelTaskBtn').addEventListener('click', () => this.closeModal());

        // Form Submit
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Theme Toggle
        document.getElementById('themeToggleBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }

    openModal(taskToEdit = null) {
        if (taskToEdit) {
            this.modalTitle.textContent = 'Edit Task';
            this.taskIdInput.value = taskToEdit.id;
            this.titleInput.value = taskToEdit.title;
            this.categoryInput.value = taskToEdit.category;
            this.priorityInput.value = taskToEdit.priority;
            this.dueDateInput.value = taskToEdit.dueDate;
        } else {
            this.modalTitle.textContent = 'Create New Task';
            this.taskForm.reset();
            this.taskIdInput.value = '';
            // Default due date to today
            this.dueDateInput.value = new Date().toISOString().split('T')[0];
        }
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
    }

    saveTask() {
        const id = this.taskIdInput.value;
        const title = this.titleInput.value.trim();
        const category = this.categoryInput.value;
        const priority = this.priorityInput.value;
        const dueDate = this.dueDateInput.value;

        if (!title) return;

        if (id) {
            // Edit existing
            const index = this.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], title, category, priority, dueDate };
            }
        } else {
            // Create new
            const newTask = {
                id: Date.now().toString(),
                title,
                category,
                priority,
                dueDate,
                completed: false
            };
            this.tasks.unshift(newTask);
        }

        this.syncLocalStorage();
        this.closeModal();
        this.render();
    }

    toggleComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.syncLocalStorage();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.syncLocalStorage();
        this.render();
    }

    syncLocalStorage() {
        localStorage.setItem('exp6_tasks', JSON.stringify(this.tasks));
    }

    getFilteredTasks() {
        return this.tasks.filter(task => {
            // Search filter
            if (this.currentFilter.search && !task.title.toLowerCase().includes(this.currentFilter.search)) {
                return false;
            }
            // Status filter
            if (this.currentFilter.status === 'active' && task.completed) return false;
            if (this.currentFilter.status === 'completed' && !task.completed) return false;

            // Category filter
            if (this.currentFilter.category !== 'all' && task.category !== this.currentFilter.category) return false;

            // Priority filter
            if (this.currentFilter.priority !== 'all' && task.priority !== this.currentFilter.priority) return false;

            return true;
        });
    }

    render() {
        const filtered = this.getFilteredTasks();

        // Update Stat Badges
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;

        this.totalCountEl.textContent = total;
        this.activeCountEl.textContent = active;
        this.completedCountEl.textContent = completed;

        if (filtered.length === 0) {
            this.taskList.innerHTML = `
                <li style="text-align: center; color: var(--text-muted); padding: 2rem 0;">
                    No tasks found matching your criteria.
                </li>
            `;
            return;
        }

        this.taskList.innerHTML = filtered.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-left">
                    <div class="custom-checkbox" onclick="taskApp.toggleComplete('${task.id}')"></div>
                    <div class="task-info">
                        <h3>${this.escapeHtml(task.title)}</h3>
                        <div class="meta-tags">
                            <span class="tag-cat">📁 ${task.category}</span>
                            <span class="prio-${task.priority.toLowerCase()}">⚡ ${task.priority}</span>
                            <span class="tag-cat">📅 Due: ${task.dueDate}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="icon-btn" title="Edit Task" onclick="taskApp.editTaskPrompt('${task.id}')">✏️</button>
                    <button class="icon-btn" title="Delete Task" onclick="taskApp.deleteTask('${task.id}')">🗑️</button>
                </div>
            </li>
        `).join('');
    }

    editTaskPrompt(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.openModal(task);
        }
    }

    escapeHtml(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
}

let taskApp;
document.addEventListener('DOMContentLoaded', () => {
    taskApp = new TaskManager();
});
