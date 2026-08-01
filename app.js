const STORAGE_KEY = 'yueyue-tasks-v2';
const SYNC_CODE_KEY = 'yueyue-sync-code';
const SYNC_REMOTE_KEY = 'yueyue-last-remote';

// ===== 云端同步配置（Supabase 免费版）=====
// 把下面两个值替换成你在 supabase.com 项目里拿到的
// Project URL 和 anon public key（anon key 设计上可安全放前端）
const SUPABASE_URL = 'https://uvyxtknslaeuhmecyvrw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2eXh0a25zbGFldWhtZWN5dnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NjU4OTIsImV4cCI6MjEwMTA0MTg5Mn0.rerO0qMnhsY1m5t53FgPlw0riBZhH7U2qPP6WR1ChZw';

const DEFAULT_TASKS = [
  { id: 't1', title: '签证', category: '行政出行', priority: 'P0', status: 'todo', week: '第1周', notes: '确认签证类型、准备材料、预约递交', subtasks: [
    { id: 's1-1', title: '确认签证类型与所需材料', status: 'todo', date: '' },
    { id: 's1-2', title: '预约签证中心/线上递交', status: 'todo', date: '' },
    { id: 's1-3', title: '准备并递交材料', status: 'todo', date: '' }
  ]},
  { id: 't2', title: '学前课', category: '学习成长', priority: 'P0', status: 'todo', week: '第1周', notes: '确认课程内容、时间安排', subtasks: [
    { id: 's2-1', title: '确认学前课平台与课程表', status: 'todo', date: '' },
    { id: 's2-2', title: '完成第一节课', status: 'todo', date: '' }
  ]},
  { id: 't3', title: '回程购物', category: '行政出行', priority: 'P0', status: 'todo', week: '第4周', notes: '列出清单、采购伴手礼/必需品', subtasks: [
    { id: 's3-1', title: '列回程购物清单', status: 'todo', date: '' },
    { id: 's3-2', title: '集中采购', status: 'todo', date: '' }
  ]},
  { id: 't4', title: '买衣服', category: '购物消费', priority: 'P1', status: 'todo', week: '第1周', notes: '换季/日常衣物', subtasks: [
    { id: 's4-1', title: '盘点缺什么衣服', status: 'todo', date: '' },
    { id: 's4-2', title: '线下/线上下单', status: 'todo', date: '' }
  ]},
  { id: 't5', title: '剪头发', category: '生活护理', priority: 'P1', status: 'todo', week: '第1周', notes: '预约理发师', subtasks: [
    { id: 's5-1', title: '预约理发店', status: 'todo', date: '' }
  ]},
  { id: 't6', title: '买相机', category: '购物消费', priority: 'P1', status: 'todo', week: '第2周', notes: '确定型号、比价', subtasks: [
    { id: 's6-1', title: '确定预算与型号', status: 'todo', date: '' },
    { id: 's6-2', title: '比价并下单/到店购买', status: 'todo', date: '' }
  ]},
  { id: 't7', title: '脱毛两次', category: '生活护理', priority: 'P1', status: 'todo', week: '第2周', notes: '两次间隔约2-3周', subtasks: [
    { id: 's7-1', title: '第一次脱毛', status: 'todo', date: '' },
    { id: 's7-2', title: '第二次脱毛', status: 'todo', date: '' }
  ]},
  { id: 't8', title: '皮肤护理', category: '生活护理', priority: 'P1', status: 'todo', week: '第2周', notes: '医美/皮肤管理项目', subtasks: [
    { id: 's8-1', title: '预约皮肤管理机构', status: 'todo', date: '' },
    { id: 's8-2', title: '完成第一次护理', status: 'todo', date: '' }
  ]},
  { id: 't9', title: '学炒股', category: '学习成长', priority: 'P2', status: 'todo', week: '第3周', notes: '基础概念、模拟盘', subtasks: [
    { id: 's9-1', title: '学习基础术语与规则', status: 'todo', date: '' },
    { id: 's9-2', title: '模拟盘练习', status: 'todo', date: '' }
  ]},
  { id: 't10', title: '学AI', category: '学习成长', priority: 'P2', status: 'todo', week: '第3周', notes: '了解AI工具、Prompt技巧', subtasks: [
    { id: 's10-1', title: '选一个AI工具深入学习', status: 'todo', date: '' },
    { id: 's10-2', title: '练习Prompt并记录案例', status: 'todo', date: '' }
  ]},
  { id: 't11', title: '学SQL', category: '学习成长', priority: 'P2', status: 'todo', week: '第3周', notes: '基础查询、练习', subtasks: [
    { id: 's11-1', title: '学习SELECT/JOIN等基础语法', status: 'todo', date: '' },
    { id: 's11-2', title: '完成练习题目', status: 'todo', date: '' }
  ]},
  { id: 't12', title: '看书', category: '学习成长', priority: 'P2', status: 'todo', week: '第4周', notes: '选一本想看的书', subtasks: [
    { id: 's12-1', title: '选定书籍', status: 'todo', date: '' },
    { id: 's12-2', title: '每天阅读30分钟', status: 'todo', date: '' }
  ]},
  { id: 't13', title: '按摩', category: '生活护理', priority: 'P2', status: 'todo', week: '第3周', notes: '放松肩颈/全身', subtasks: [
    { id: 's13-1', title: '预约按摩', status: 'todo', date: '' }
  ]},
  { id: 't14', title: '健身', category: '生活护理', priority: 'P2', status: 'todo', week: '第2周', notes: '制定运动计划', subtasks: [
    { id: 's14-1', title: '确定健身方式（健身房/居家/户外）', status: 'todo', date: '' },
    { id: 's14-2', title: '每周运动3次', status: 'todo', date: '' }
  ]},
  { id: 't15', title: '护肤', category: '生活护理', priority: 'P2', status: 'todo', week: '第4周', notes: '日常护肤流程', subtasks: [
    { id: 's15-1', title: '整理护肤品并制定早晚流程', status: 'todo', date: '' }
  ]},
  { id: 't16', title: '买化妆品', category: '购物消费', priority: 'P2', status: 'todo', week: '第3周', notes: '列出缺货清单', subtasks: [
    { id: 's16-1', title: '盘点缺什么化妆品', status: 'todo', date: '' },
    { id: 's16-2', title: '下单购买', status: 'todo', date: '' }
  ]},
  { id: 't17', title: '脱毛仪', category: '购物消费', priority: 'P2', status: 'todo', week: '第3周', notes: '调研型号、价格', subtasks: [
    { id: 's17-1', title: '调研脱毛仪品牌与型号', status: 'todo', date: '' },
    { id: 's17-2', title: '下单购买', status: 'todo', date: '' }
  ]}
];

const DEFAULT_ROUTINES = [];

const CATEGORIES = ['全部', '行政出行', '学习成长', '购物消费', '生活护理'];
const PRIORITIES = ['全部', 'P0', 'P1', 'P2'];
const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];
const ROUTINE_COLORS = ['blue', 'green', 'orange', 'pink', 'purple', 'teal'];

const SKINCARE_CATEGORIES = [
  { key: 'mask', label: '面膜', emoji: '💆' },
  { key: 'apply', label: '擦护肤品', emoji: '🧴' },
  { key: 'salon', label: '去美容店', emoji: '💇' }
];

// ===== 像素风 dither 图片生成器（复古热敏打印感）=====
const PIXEL_PATTERNS = ['plant', 'hourglass', 'star', 'moon', 'cat', 'coffee', 'cloud', 'flower'];
const BAYER_4X4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5]
];

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function generatePixelArt(dateStr) {
  const rng = mulberry32(hashString(dateStr || '2026-01-01'));
  const pattern = PIXEL_PATTERNS[Math.floor(rng() * PIXEL_PATTERNS.length)];
  const W = 96, H = 96;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1. 画一个灰度图案到离屏 canvas（模拟「原图」）
  const g = document.createElement('canvas');
  g.width = W; g.height = H;
  const gx = g.getContext('2d');
  gx.fillStyle = '#fff'; gx.fillRect(0, 0, W, H);
  gx.fillStyle = '#000';
  gx.strokeStyle = '#000';
  gx.lineWidth = 1.5;
  gx.lineCap = 'square';

  const cx = W / 2, cy = H / 2;
  const rnd = () => rng();

  if (pattern === 'plant') {
    // 盆栽
    gx.fillRect(cx - 18, cy + 10, 36, 18);
    gx.fillRect(cx - 2, cy - 28, 4, 38);
    gx.beginPath(); gx.ellipse(cx - 10, cy - 22, 8, 5, Math.PI / 4, 0, Math.PI * 2); gx.fill();
    gx.beginPath(); gx.ellipse(cx + 10, cy - 22, 8, 5, -Math.PI / 4, 0, Math.PI * 2); gx.fill();
    gx.beginPath(); gx.ellipse(cx, cy - 34, 6, 4, 0, 0, Math.PI * 2); gx.fill();
  } else if (pattern === 'hourglass') {
    // 沙漏
    gx.beginPath(); gx.moveTo(cx - 22, cy - 30); gx.lineTo(cx + 22, cy - 30);
    gx.lineTo(cx - 2, cy); gx.lineTo(cx + 2, cy); gx.closePath(); gx.fill();
    gx.beginPath(); gx.moveTo(cx - 2, cy); gx.lineTo(cx + 2, cy);
    gx.lineTo(cx + 22, cy + 30); gx.lineTo(cx - 22, cy + 30); gx.closePath(); gx.fill();
    gx.fillRect(cx - 24, cy - 32, 48, 3); gx.fillRect(cx - 24, cy + 29, 48, 3);
  } else if (pattern === 'star') {
    // 五角星
    gx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 28 : 12, a = (i * Math.PI) / 5 - Math.PI / 2;
      gx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    gx.closePath(); gx.fill();
  } else if (pattern === 'moon') {
    // 月亮
    gx.beginPath(); gx.arc(cx - 4, cy, 26, 0, Math.PI * 2); gx.fill();
    gx.fillStyle = '#fff'; gx.beginPath(); gx.arc(cx + 6, cy - 4, 22, 0, Math.PI * 2); gx.fill();
  } else if (pattern === 'cat') {
    // 小猫脸
    gx.beginPath(); gx.arc(cx, cy + 2, 22, 0, Math.PI * 2); gx.fill();
    gx.beginPath(); gx.moveTo(cx - 20, cy - 10); gx.lineTo(cx - 28, cy - 30); gx.lineTo(cx - 8, cy - 18); gx.closePath(); gx.fill();
    gx.beginPath(); gx.moveTo(cx + 20, cy - 10); gx.lineTo(cx + 28, cy - 30); gx.lineTo(cx + 8, cy - 18); gx.closePath(); gx.fill();
    gx.fillStyle = '#fff'; gx.fillRect(cx - 8, cy - 2, 4, 4); gx.fillRect(cx + 4, cy - 2, 4, 4);
  } else if (pattern === 'coffee') {
    // 咖啡杯
    gx.fillRect(cx - 16, cy - 16, 32, 36);
    gx.beginPath(); gx.arc(cx + 16, cy - 2, 9, -Math.PI / 2, Math.PI / 2); gx.stroke();
    gx.fillRect(cx - 18, cy - 20, 36, 5);
    // 热气
    gx.strokeStyle = '#000';
    gx.beginPath(); gx.moveTo(cx - 6, cy - 28); gx.quadraticCurveTo(cx - 10, cy - 36, cx - 4, cy - 42); gx.stroke();
    gx.beginPath(); gx.moveTo(cx + 6, cy - 28); gx.quadraticCurveTo(cx + 10, cy - 36, cx + 4, cy - 42); gx.stroke();
  } else if (pattern === 'cloud') {
    // 云
    gx.beginPath(); gx.arc(cx - 16, cy + 6, 14, 0, Math.PI * 2); gx.fill();
    gx.beginPath(); gx.arc(cx + 16, cy + 6, 14, 0, Math.PI * 2); gx.fill();
    gx.beginPath(); gx.arc(cx, cy - 8, 18, 0, Math.PI * 2); gx.fill();
    gx.fillRect(cx - 22, cy + 6, 44, 14);
  } else if (pattern === 'flower') {
    // 花
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      gx.beginPath(); gx.ellipse(cx + 14 * Math.cos(a), cy + 14 * Math.sin(a), 7, 4, a, 0, Math.PI * 2); gx.fill();
    }
    gx.beginPath(); gx.arc(cx, cy, 7, 0, Math.PI * 2); gx.fill();
    gx.fillRect(cx - 2, cy + 7, 4, 22);
  }

  // 随机装饰：小星星/点
  gx.fillStyle = '#000';
  for (let i = 0; i < 8; i++) {
    if (rnd() > 0.6) {
      const x = 6 + Math.floor(rnd() * (W - 12));
      const y = 6 + Math.floor(rnd() * (H - 12));
      gx.fillRect(x, y, 2, 2);
    }
  }

  // 2. 用 Bayer 4x4 ordered dither 转成 1-bit
  const src = gx.getImageData(0, 0, W, H).data;
  const dst = ctx.createImageData(W, H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const gray = src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114;
      const threshold = (BAYER_4X4[y % 4][x % 4] / 16) * 255;
      const c = gray > threshold ? 255 : 0;
      dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = c;
      dst.data[i + 3] = 255;
    }
  }
  ctx.putImageData(dst, 0, 0);
  return { dataUrl: canvas.toDataURL('image/png'), pattern };
}

class TaskApp {
  constructor() {
    const data = this.loadData();
    this.tasks = data.tasks || [];
    this.routines = data.routines || [];
    this.todayTodos = data.todayTodos || [];
    this.poopDates = data.poopDates || [];
    this.skincareDates = data.skincareDates || {};
    this.receipts = data.receipts || [];
    this.syncCode = localStorage.getItem(SYNC_CODE_KEY) || '';
    this.lastRemoteUpdatedAt = localStorage.getItem(SYNC_REMOTE_KEY) || '';
    this._supabase = null;
    this._pushTimer = null;
    this._syncTimer = null;
    this._dirty = false;
    this.filterCategory = '全部';
    this.filterPriority = '全部';
    this.searchQuery = '';
    this.expandedTasks = new Set();
    this.collapsedCategories = new Set();
    this.currentView = 'main';
    this.todayFilter = 'all';
    this.todayViewDate = this.todayStr();
    this.todayCalendarMonth = new Date();
    this.aiEvaluationOpen = false;
    this.calendarMode = 'month';
    this.layoutMode = this.getLayoutMode();
    this.currentMonth = new Date();
    this.currentWeekStart = this.getWeekStart(new Date());
    this.selectedDate = null;
    this.habitMonth = new Date();
    this.habitSelectedDate = null;
    this.poopMonth = new Date();
    this.skincareMonth = new Date();
    this.skincareSelectedDate = null;
    this.dragData = null;
    this.init();
  }

  init() {
    this.renderFilters();
    this.renderView();
    this.updateStats();

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          if (overlay.id === 'task-modal') this.closeTaskModal();
          if (overlay.id === 'subtask-modal') this.closeSubtaskModal();
          if (overlay.id === 'day-modal') this.closeDayModal();
          if (overlay.id === 'routine-modal') this.closeRoutineModal();
          if (overlay.id === 'habit-day-modal') this.closeHabitDayModal();
          if (overlay.id === 'today-todo-modal') this.closeTodayTodoModal();
          if (overlay.id === 'skincare-day-modal') this.closeSkincareDayModal();
          if (overlay.id === 'receipt-modal') this.closeReceipt();
        }
      });
    });

    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeTopModal(); });
    this.autoConnect();
  }

  getLayoutMode() {
    return window.innerWidth > 1100 ? 'wide' : 'narrow';
  }

  handleResize() {
    const newMode = this.getLayoutMode();
    if (newMode !== this.layoutMode) {
      this.layoutMode = newMode;
      if (this.currentView === 'main') {
        this.renderTasks();
        this.renderScheduleCalendar();
      }
    }
  }

  loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) return { tasks: data, routines: [], todayTodos: [] };
        return {
          tasks: data.tasks || DEFAULT_TASKS,
          routines: data.routines || DEFAULT_ROUTINES,
          todayTodos: data.todayTodos || [],
          poopDates: data.poopDates || [],
          skincareDates: data.skincareDates || {},
          receipts: data.receipts || []
        };
      }
    } catch (e) {
      console.error('Failed to load data', e);
    }
    return { tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)), routines: JSON.parse(JSON.stringify(DEFAULT_ROUTINES)) };
  }

  persistLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks: this.tasks, routines: this.routines, todayTodos: this.todayTodos, poopDates: this.poopDates, skincareDates: this.skincareDates, receipts: this.receipts }));
    } catch (e) {
      console.error('Failed to save data', e);
    }
  }

  saveData() {
    this.persistLocal();
    this.renderView();
    this.updateStats();
    this._dirty = true;
    this.schedulePush();
  }

  // View switching
  switchView(view) {
    this.currentView = view;
    document.getElementById('tab-main').classList.toggle('active', view === 'main');
    document.getElementById('tab-today').classList.toggle('active', view === 'today');
    document.getElementById('tab-habits').classList.toggle('active', view === 'habits');
    document.getElementById('tab-poop').classList.toggle('active', view === 'poop');
    document.getElementById('tab-skincare').classList.toggle('active', view === 'skincare');
    document.getElementById('tab-receipt').classList.toggle('active', view === 'receipt');
    this.renderView();
  }

  renderView() {
    document.getElementById('main-view').style.display = this.currentView === 'main' ? 'flex' : 'none';
    document.getElementById('today-view').style.display = this.currentView === 'today' ? 'block' : 'none';
    document.getElementById('habits-view').style.display = this.currentView === 'habits' ? 'block' : 'none';
    document.getElementById('poop-view').style.display = this.currentView === 'poop' ? 'block' : 'none';
    document.getElementById('skincare-view').style.display = this.currentView === 'skincare' ? 'block' : 'none';
    document.getElementById('receipt-view').style.display = this.currentView === 'receipt' ? 'block' : 'none';
    document.getElementById('empty-state').style.display = 'none';

    if (this.currentView === 'main') {
      this.renderTasks();
      this.renderScheduleCalendar();
    } else if (this.currentView === 'today') {
      this.renderTodayView();
    } else if (this.currentView === 'habits') {
      this.renderRoutines();
      this.renderHabitCalendar();
    } else if (this.currentView === 'poop') {
      this.renderPoopView();
    } else if (this.currentView === 'skincare') {
      this.renderSkincareView();
    } else if (this.currentView === 'receipt') {
      this.renderReceiptView();
    }
  }

  // Calendar mode
  setCalendarView(mode) {
    this.calendarMode = mode;
    document.getElementById('view-month').classList.toggle('active', mode === 'month');
    document.getElementById('view-week').classList.toggle('active', mode === 'week');
    this.renderScheduleCalendar();
  }

  navigateCalendar(delta) {
    if (this.calendarMode === 'month') {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
      this.currentMonth = new Date(this.currentMonth);
    } else {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() + delta * 7);
      this.currentWeekStart = new Date(this.currentWeekStart);
    }
    this.renderScheduleCalendar();
  }

  // Schedule Calendar Rendering
  renderScheduleCalendar() {
    if (this.calendarMode === 'month') {
      this.renderMonthCalendar();
    } else {
      this.renderWeekCalendar();
    }
  }

  renderMonthCalendar() {
    const container = document.getElementById('calendar-body');
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    document.getElementById('calendar-title').textContent = `${year}年${month + 1}月`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

    let html = '<div class="calendar-grid">';
    html += WEEKDAY_NAMES.map(d => `<div class="calendar-weekday">周${d}</div>`).join('');

    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - startOffset + 1;
      let dateStr, displayDay, otherMonth = false, isToday = false;

      if (dayIndex <= 0) {
        displayDay = prevLastDay + dayIndex;
        const prevMonth = new Date(year, month, 0);
        dateStr = this.formatDate(prevMonth.getFullYear(), prevMonth.getMonth(), displayDay);
        otherMonth = true;
      } else if (dayIndex > daysInMonth) {
        displayDay = dayIndex - daysInMonth;
        const nextMonth = new Date(year, month + 1, 1);
        dateStr = this.formatDate(nextMonth.getFullYear(), nextMonth.getMonth(), displayDay);
        otherMonth = true;
      } else {
        displayDay = dayIndex;
        dateStr = this.formatDate(year, month, dayIndex);
        isToday = dateStr === this.todayStr();
      }

      const daySubtasks = this.getSubtasksByDate(dateStr);
      const visibleItems = daySubtasks.slice(0, 3);
      const moreCount = daySubtasks.length - visibleItems.length;

      html += `
        <div class="calendar-day ${otherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}"
             data-date="${dateStr}"
             ondragover="app.handleDragOver(event)"
             ondragleave="app.handleDragLeave(event)"
             ondrop="app.handleDrop(event)"
             onclick="app.openDayModal('${dateStr}')">
          <div class="calendar-day-number">${displayDay}</div>
          <div class="calendar-day-items" onclick="event.stopPropagation()">
            ${visibleItems.map(s => `
              <div class="calendar-day-item cat-${s.category} ${s.status === 'done' ? 'done' : ''}"
                   draggable="true"
                   ondragstart="app.handleDragStart(event, '${s.taskId}', '${s.id}')"
                   ondragend="app.handleDragEnd(event)"
                   onclick="event.stopPropagation(); app.toggleSubtask('${s.taskId}', '${s.id}')">
                ${this.escapeHtml(s.title)}
              </div>
            `).join('')}
            ${moreCount > 0 ? `<div class="calendar-day-more">+${moreCount} 项</div>` : ''}
          </div>
        </div>
      `;
    }
    html += '</div>';
    container.innerHTML = html;
  }

  renderWeekCalendar() {
    const container = document.getElementById('calendar-body');
    const start = new Date(this.currentWeekStart);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    document.getElementById('calendar-title').textContent =
      `${this.formatDateSimple(start)} - ${this.formatDateSimple(end)}`;

    let html = '<div class="week-view">';
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = this.dateToStr(date);
      const isToday = dateStr === this.todayStr();
      const daySubtasks = this.getSubtasksByDate(dateStr);

      html += `
        <div class="week-day ${isToday ? 'today' : ''}"
             data-date="${dateStr}"
             ondragover="app.handleDragOver(event)"
             ondragleave="app.handleDragLeave(event)"
             ondrop="app.handleDrop(event)">
          <div class="week-day-header">
            <div class="week-day-number">${date.getDate()}</div>
            <div>周${WEEKDAY_NAMES[date.getDay()]}</div>
          </div>
          <div class="week-day-items" onclick="event.stopPropagation()">
            ${daySubtasks.length === 0 ? '<div style="color: var(--text-secondary); font-size: 11px; text-align: center; padding: 8px 0;">拖入子任务</div>' : ''}
            ${daySubtasks.map(s => `
              <div class="week-item cat-${s.category} ${s.status === 'done' ? 'done' : ''}"
                   draggable="true"
                   ondragstart="app.handleDragStart(event, '${s.taskId}', '${s.id}')"
                   ondragend="app.handleDragEnd(event)"
                   onclick="event.stopPropagation(); app.toggleSubtask('${s.taskId}', '${s.id}')">
                <div class="subtask-checkbox ${s.status === 'done' ? 'checked' : ''}" style="width: 14px; height: 14px; font-size: 10px;">
                  ${s.status === 'done' ? '✓' : ''}
                </div>
                <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${this.escapeHtml(s.title)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    html += '</div>';
    container.innerHTML = html;
  }

  // Today View
  renderTodayView() {
    const today = this.todayViewDate;
    const dateObj = new Date(today);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    const isToday = today === this.todayStr();
    document.getElementById('today-date-title').textContent = `${today} 周${weekday}${isToday ? ' · 今日待办' : ' · 待办'}`;

    const todayTodos = this.getTodayTodos(today);
    const todaySubtasks = this.getSubtasksByDate(today);
    const routineItems = this.buildRoutineItems(today);
    const limitedItems = this.buildLimitedItems(todayTodos);

    const visibleRoutines = this.todayFilter === 'undone'
      ? routineItems.filter(item => !item.done)
      : routineItems;
    const visibleLimited = this.todayFilter === 'undone'
      ? limitedItems.filter(item => !item.done)
      : limitedItems;
    const visibleSubtasks = this.todayFilter === 'undone'
      ? todaySubtasks.filter(s => s.status !== 'done')
      : todaySubtasks;

    document.getElementById('routine-count').textContent = visibleRoutines.length;
    document.getElementById('today-todo-count').textContent = visibleLimited.length;
    document.getElementById('subtask-count').textContent = visibleSubtasks.length;

    this.renderTodayCalendar();
    this.renderTodayRoutines(visibleRoutines);
    this.renderTodayLimited(visibleLimited);
    this.renderTodaySubtasks(visibleSubtasks);
    this.updateTodayProgress(routineItems, limitedItems, todaySubtasks);
    this.renderAiEvaluation(routineItems, limitedItems, todaySubtasks);
  }

  goToToday() {
    this.todayViewDate = this.todayStr();
    this.todayCalendarMonth = new Date();
    this.renderTodayView();
  }

  changeTodayDate(days) {
    const d = new Date(this.todayViewDate);
    d.setDate(d.getDate() + days);
    this.todayViewDate = this.dateToStr(d);
    this.todayCalendarMonth = new Date(d);
    this.renderTodayView();
  }

  setTodayViewDate(dateStr) {
    this.todayViewDate = dateStr;
    this.todayCalendarMonth = new Date(dateStr);
    this.renderTodayView();
  }

  renderTodayCalendar() {
    const container = document.getElementById('today-calendar');
    if (!container) return;
    const year = this.todayCalendarMonth.getFullYear();
    const month = this.todayCalendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const start = new Date(firstDay);
    start.setDate(start.getDate() - firstDay.getDay());
    const today = this.todayStr();
    const selected = this.todayViewDate;

    let html = `<div class="today-cal-header">
      <button class="today-cal-nav" onclick="app.changeTodayCalendarMonth(-1)">‹</button>
      <span class="today-cal-month">${year}年${month + 1}月</span>
      <button class="today-cal-nav" onclick="app.changeTodayCalendarMonth(1)">›</button>
    </div>
    <div class="today-cal-grid">
      <div class="today-cal-week">日</div><div class="today-cal-week">一</div><div class="today-cal-week">二</div><div class="today-cal-week">三</div><div class="today-cal-week">四</div><div class="today-cal-week">五</div><div class="today-cal-week">六</div>`;

    const end = new Date(start);
    end.setDate(end.getDate() + 41);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const ds = this.dateToStr(d);
      const isCurrentMonth = d.getMonth() === month;
      const isToday = ds === today;
      const isSelected = ds === selected;
      const hasItems = this.getTodayTodos(ds).length > 0 || this.getSubtasksByDate(ds).length > 0;
      const classes = ['today-cal-day'];
      if (!isCurrentMonth) classes.push('other-month');
      if (isToday) classes.push('today');
      if (isSelected) classes.push('selected');
      html += `<div class="${classes.join(' ')}" onclick="app.setTodayViewDate('${ds}')">
        <span class="today-cal-num">${d.getDate()}</span>
        ${hasItems ? '<span class="today-cal-dot"></span>' : ''}
      </div>`;
    }
    html += '</div>';
    container.innerHTML = html;
  }

  changeTodayCalendarMonth(delta) {
    const d = new Date(this.todayCalendarMonth);
    d.setMonth(d.getMonth() + delta);
    this.todayCalendarMonth = d;
    this.renderTodayCalendar();
  }

  getTodayTodos(today) {
    return this.todayTodos.filter(t => t.date === today);
  }

  buildRoutineItems(today) {
    return this.routines.map(r => ({
      id: r.id,
      type: 'routine',
      title: r.title,
      icon: r.icon,
      done: (r.dates || []).includes(today),
      data: r
    }));
  }

  buildLimitedItems(todayTodos) {
    return todayTodos.map(t => ({
      id: t.id,
      type: 'todo',
      title: t.title,
      icon: '📝',
      done: t.status === 'done',
      data: t
    }));
  }

  renderTodayRoutines(items) {
    const container = document.getElementById('today-routines');
    if (items.length === 0) {
      container.innerHTML = '<div class="today-empty">还没有每日必做事项<br>去打卡日历添加固定日程</div>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="today-item ${item.done ? 'done' : ''}" onclick="app.openRoutineModal('${item.id}')">
        <div class="today-item-checkbox ${item.done ? 'checked' : ''}" onclick="event.stopPropagation(); app.toggleHabitCheck('${item.id}', '${this.todayViewDate}')">
          ${item.done ? '✓' : ''}
        </div>
        <div class="today-item-icon">${item.icon}</div>
        <div class="today-item-content">
          <div class="today-item-title">${this.escapeHtml(item.title)}</div>
          <div class="today-item-meta">
            <span class="today-item-tag today-tag-type">ROUTINE</span>
          </div>
        </div>
        <div class="today-item-actions" onclick="event.stopPropagation()">
          <button class="icon-btn" title="删除" onclick="app.deleteRoutine('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  renderTodayLimited(items) {
    const container = document.getElementById('today-limited');
    if (items.length === 0) {
      container.innerHTML = '<div class="today-empty">还没有今日限定待办<br>在上方输入框添加今天想完成的小任务</div>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="today-item ${item.done ? 'done' : ''}" onclick="app.openTodayTodoModal('${item.id}')">
        <div class="today-item-checkbox ${item.done ? 'checked' : ''}" onclick="event.stopPropagation(); app.toggleTodayTodo('${item.id}')">
          ${item.done ? '✓' : ''}
        </div>
        <div class="today-item-icon">${item.icon}</div>
        <div class="today-item-content">
          <div class="today-item-title">${this.escapeHtml(item.title)}</div>
          <div class="today-item-meta">
            <span class="today-item-tag today-tag-today">TODAY</span>
          </div>
        </div>
        <div class="today-item-actions" onclick="event.stopPropagation()">
          <button class="icon-btn" title="删除" onclick="app.deleteTodayTodo('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  renderTodaySubtasks(subtasks) {
    const container = document.getElementById('today-subtasks');
    if (subtasks.length === 0) {
      container.innerHTML = '<div class="today-empty">今天还没有分配子任务<br>去任务列表里把子任务拖到日历上吧</div>';
      return;
    }

    container.innerHTML = subtasks.map(s => `
      <div class="today-item ${s.status === 'done' ? 'done' : ''}" onclick="app.openSubtaskModal('${s.taskId}', '${s.id}')">
        <div class="today-item-checkbox ${s.status === 'done' ? 'checked' : ''}" onclick="event.stopPropagation(); app.toggleSubtask('${s.taskId}', '${s.id}')">
          ${s.status === 'done' ? '✓' : ''}
        </div>
        <div class="today-item-content">
          <div class="today-item-title">${this.escapeHtml(s.title)}</div>
          <div class="today-item-meta">
            <span class="today-item-tag today-tag-parent">${this.escapeHtml(s.taskTitle)}</span>
          </div>
        </div>
        <div class="today-item-actions" onclick="event.stopPropagation()">
          <button class="icon-btn" title="编辑" onclick="app.openSubtaskModal('${s.taskId}', '${s.id}')">✏️</button>
          <button class="icon-btn" title="删除" onclick="app.deleteSubtask('${s.taskId}', '${s.id}')">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  updateTodayProgress(routineItems, limitedItems, subtasks) {
    const routineDone = routineItems.filter(item => item.done).length;
    const limitedDone = limitedItems.filter(item => item.done).length;
    const subDone = subtasks.filter(s => s.status === 'done').length;
    const total = routineItems.length + limitedItems.length + subtasks.length;
    const done = routineDone + limitedDone + subDone;
    const pct = total === 0 ? 0 : Math.round(done / total * 100);

    document.getElementById('today-progress-text').textContent = `${done}/${total}`;
    document.getElementById('today-progress-fill').style.width = `${pct}%`;
  }

  toggleAiEvaluation() {
    this.aiEvaluationOpen = !this.aiEvaluationOpen;
    this.renderTodayView();
  }

  renderAiEvaluation(routineItems, limitedItems, subtasks) {
    const body = document.getElementById('today-ai-body');
    const toggle = document.getElementById('today-ai-toggle');
    if (!body || !toggle) return;

    toggle.textContent = this.aiEvaluationOpen ? '▾' : '▸';
    if (!this.aiEvaluationOpen) {
      body.style.display = 'none';
      return;
    }

    body.style.display = 'block';
    const evalResult = this.evaluateTodayWorkload(routineItems, limitedItems, subtasks);

    body.innerHTML = `
      <div class="today-ai-result">
        <div class="today-ai-verdict ${evalResult.level}">
          <span class="today-ai-level">${evalResult.levelText}</span>
          <span class="today-ai-time">预计耗时约 ${evalResult.totalMinutes} 分钟</span>
        </div>
        <div class="today-ai-detail">
          <p>${evalResult.summary}</p>
          <ul>
            ${evalResult.suggestions.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  evaluateTodayWorkload(routineItems, limitedItems, subtasks) {
    const today = this.todayStr();
    const undoneRoutines = routineItems.filter(item => !item.done);
    const undoneLimited = limitedItems.filter(item => !item.done);
    const undoneSubtasks = subtasks.filter(s => s.status !== 'done');
    const undoneMustDo = [...undoneRoutines, ...undoneLimited];

    let totalMinutes = 0;
    let breakdown = [];

    undoneRoutines.forEach(item => {
      totalMinutes += 15;
      breakdown.push({ name: item.title, minutes: 15, type: 'routine' });
    });

    undoneLimited.forEach(item => {
      totalMinutes += 20;
      breakdown.push({ name: item.title, minutes: 20, type: 'today' });
    });

    const categoryMinutes = {
      '行政出行': 60,
      '学习成长': 90,
      '购物消费': 60,
      '生活护理': 90
    };

    undoneSubtasks.forEach(sub => {
      const minutes = categoryMinutes[sub.category] || 45;
      totalMinutes += minutes;
      breakdown.push({ name: sub.title, minutes, type: 'subtask', category: sub.category });
    });

    const count = undoneMustDo.length + undoneSubtasks.length;
    let level, levelText, summary, suggestions = [];

    if (count === 0) {
      level = 'easy';
      levelText = '今日清闲';
      summary = '今天没有未完成的待办事项，可以自由安排或提前完成明天的任务。';
      suggestions = ['利用空档复盘近期进度', '为明天的重点任务做准备'];
    } else if (totalMinutes <= 60) {
      level = 'easy';
      levelText = '轻松';
      summary = `今天还有 ${count} 项未完成，预计总耗时约 ${totalMinutes} 分钟，节奏比较轻松。`;
      suggestions = ['可以顺手多完成一项小任务', '留出时间给长期学习或休息'];
    } else if (totalMinutes <= 120) {
      level = 'moderate';
      levelText = '适中';
      summary = `今天还有 ${count} 项未完成，预计总耗时约 ${totalMinutes} 分钟，是充实的节奏。`;
      suggestions = ['按优先级顺序推进', '注意在学习类和外出类任务之间留出缓冲'];
    } else if (totalMinutes <= 180) {
      level = 'heavy';
      levelText = '偏多';
      summary = `今天还有 ${count} 项未完成，预计总耗时约 ${totalMinutes} 分钟，任务量偏多，建议集中精力。`;
      suggestions = ['优先完成 P0 / 外出类事项', '把低优先级的子任务推迟到明天', '每完成一项休息 5-10 分钟'];
    } else if (totalMinutes <= 240) {
      level = 'overloaded';
      levelText = '过多';
      summary = `今天还有 ${count} 项未完成，预计总耗时约 ${totalMinutes} 分钟，任务量已经过多。`;
      suggestions = ['立刻把至少 1-2 项非紧急任务移到其他日期', '只保留必须今天完成的事项', '避免连续安排外出/学习类大块任务'];
    } else {
      level = 'overloaded';
      levelText = '超负荷';
      summary = `今天还有 ${count} 项未完成，预计总耗时超过 ${totalMinutes} 分钟，明显超负荷，不建议按当前计划执行。`;
      suggestions = ['重新分配任务到本周其他日期', '今天只保留最紧急的 1-2 件事', '考虑把部分子任务拆分或减少范围'];
    }

    const p0Tasks = undoneSubtasks.filter(s => {
      const task = this.tasks.find(t => t.id === s.taskId);
      return task && task.priority === 'P0';
    });
    if (p0Tasks.length > 0) {
      suggestions.unshift(`建议优先处理 P0 任务：${p0Tasks.map(s => s.title).slice(0, 2).join('、')}${p0Tasks.length > 2 ? ' 等' : ''}`);
    }

    const outCategories = ['行政出行', '生活护理'];
    const outTasks = undoneSubtasks.filter(s => outCategories.includes(s.category));
    if (outTasks.length > 1) {
      suggestions.push(`今天有 ${outTasks.length} 项外出/护理类安排，注意预留交通和缓冲时间。`);
    }

    return { level, levelText, totalMinutes, summary, suggestions, breakdown };
  }

  setTodayFilter(filter) {
    this.todayFilter = filter;
    document.getElementById('today-filter-all').classList.toggle('active', filter === 'all');
    document.getElementById('today-filter-undone').classList.toggle('active', filter === 'undone');
    this.renderTodayView();
  }

  addTodayTodo() {
    const input = document.getElementById('today-input');
    const title = input.value.trim();
    if (!title) return;

    this.todayTodos.push({ id: 'td' + Date.now(), title, status: 'todo', date: this.todayViewDate });
    input.value = '';
    this.saveData();
  }

  toggleTodayTodo(todoId) {
    const todo = this.todayTodos.find(t => t.id === todoId);
    if (!todo) return;
    todo.status = todo.status === 'done' ? 'todo' : 'done';
    this.saveData();
  }

  deleteTodayTodo(todoId) {
    if (!confirm('确定要删除这个今日待办吗？')) return;
    this.todayTodos = this.todayTodos.filter(t => t.id !== todoId);
    this.saveData();
  }

  clearCompletedToday() {
    const today = this.todayViewDate;
    const isToday = today === this.todayStr();
    const doneTodos = this.todayTodos.filter(t => t.date === today && t.status === 'done');
    const doneRoutines = this.routines.filter(r => (r.dates || []).includes(today));

    if (doneTodos.length === 0 && doneRoutines.length === 0) {
      alert(isToday ? '今天没有已完成的事项' : '该日期没有已完成的事项');
      return;
    }

    const messages = [];
    if (doneTodos.length > 0) messages.push(`${doneTodos.length} 个今日限定`);
    if (doneRoutines.length > 0) messages.push(`${doneRoutines.length} 个固定日程打卡记录`);
    if (!confirm(`确定清除 ${messages.join(' 和 ')} 吗？`)) return;

    this.todayTodos = this.todayTodos.filter(t => !(t.date === today && t.status === 'done'));
    this.routines.forEach(r => {
      if (!r.dates) r.dates = [];
      const idx = r.dates.indexOf(today);
      if (idx >= 0) r.dates.splice(idx, 1);
    });
    this.saveData();
  }

  // ===== 每日小票 =====
  openReceipt(dateOverride) {
    const date = dateOverride || this.todayViewDate;
    const today = this.todayStr();
    const isToday = date === today;
    const routineDone = this.buildRoutineItems(date).filter(i => i.done);
    const limitedDone = this.buildLimitedItems(this.getTodayTodos(date)).filter(i => i.done);
    const subDone = this.getSubtasksByDate(date).filter(s => s.status === 'done');

    const items = [];
    routineDone.forEach(i => items.push({ icon: i.icon || '🔥', title: i.title, tag: 'ROUTINE' }));
    limitedDone.forEach(i => items.push({ icon: i.icon || '📝', title: i.title, tag: 'TODAY' }));
    subDone.forEach(s => items.push({ icon: '✅', title: s.title, tag: 'TASK' }));

    const totalItems = items.length;

    const allRoutine = this.buildRoutineItems(date).length;
    const allLimited = this.getTodayTodos(date).length;
    const allSub = this.getSubtasksByDate(date).length;
    const allTotal = allRoutine + allLimited + allSub;
    const rate = allTotal === 0 ? 0 : Math.round(totalItems / allTotal * 100);

    const dateObj = new Date(date);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    const dateLabel = `${date} 周${weekday}`;
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mmdd = `${mm}.${dd}`;
    const mmddDash = `${mm}-${dd}`;
    const yyyy = dateObj.getFullYear();
    const enWeekdays = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const enMonth = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    const orderId = `${yyyy}${mm}${dd}`;

    // 每天一张像素图：有缓存用缓存，没缓存生成并保存
    let cached = this.receipts.find(r => r.date === date);
    if (!cached || !cached.pixelUrl) {
      const pixel = generatePixelArt(date);
      cached = {
        date,
        createdAt: new Date().toISOString(),
        pattern: pixel.pattern,
        pixelUrl: pixel.dataUrl,
        order: this.receipts.length
      };
      const idx = this.receipts.findIndex(r => r.date === date);
      if (idx >= 0) this.receipts[idx] = cached;
      else this.receipts.unshift(cached);
      this.persistLocal();
      this._dirty = true;
      this.schedulePush();
    }
    this._viewingReceiptDate = date;

    // 数据行：左侧分类，右侧数值（像视频里 Messages handled / Meeting hours 那样）
    const skincareDone = SKINCARE_CATEGORIES.filter(c => {
      const day = this.skincareDates[date];
      return day && day[c.key];
    }).length;
    const poopDone = this.poopDates.includes(date) ? 1 : 0;

    const rows = [
      { label: '每日必做完成', value: `${routineDone.length}/${allRoutine || '-'}` },
      { label: '今日限定完成', value: `${limitedDone.length}/${allLimited || '-'}` },
      { label: '子任务完成', value: `${subDone.length}/${allSub || '-'}` },
      { label: '护肤打卡', value: skincareDone + ' 项' },
      { label: '拉粑粑记录', value: poopDone ? '✓' : '-' },
      { label: '总完成率', value: rate + '%' }
    ];

    const itemsHtml = totalItems === 0
      ? '<div class="receipt-empty">今日暂无完成记录 🥲<br>做一件小事，再回来开票吧～</div>'
      : rows.map((r, idx) => `
        <div class="receipt-row-data" style="animation-delay:${360 + idx * 70}ms">
          <span class="receipt-row-label">${r.label}</span>
          <span class="receipt-row-dots"></span>
          <span class="receipt-row-value">${r.value}</span>
        </div>
      `).join('');

    document.getElementById('receipt-date-display').textContent = mmdd;
    document.getElementById('receipt-date-label').textContent = `Daily Receipt ${mmddDash}`;
    document.getElementById('receipt-meta-weekday').textContent = `${enWeekdays[dateObj.getDay()]}, ${enMonth[dateObj.getMonth()]} ${dateObj.getDate()}, ${yyyy}`;
    document.getElementById('receipt-meta-order').textContent = 'ORDER ' + orderId;
    document.getElementById('receipt-hero-img').src = cached.pixelUrl;
    document.getElementById('receipt-hero-img').alt = cached.pattern || 'pixel art';
    document.getElementById('receipt-date').textContent = dateLabel + (isToday ? ' · 今日' : '');
    document.getElementById('receipt-body').innerHTML = itemsHtml;
    document.getElementById('receipt-count').textContent = totalItems;
    document.getElementById('receipt-rate').textContent = rate + '%';
    document.getElementById('receipt-barcode').innerHTML = this.barcodeSvg(date);
    document.getElementById('receipt-modal').style.display = 'flex';
  }

  closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
  }

  closeTopModal() {
    const map = {
      'receipt-modal': () => this.closeReceipt(),
      'skincare-day-modal': () => this.closeSkincareDayModal(),
      'today-todo-modal': () => this.closeTodayTodoModal(),
      'habit-day-modal': () => this.closeHabitDayModal(),
      'day-modal': () => this.closeDayModal(),
      'routine-modal': () => this.closeRoutineModal(),
      'subtask-modal': () => this.closeSubtaskModal(),
      'task-modal': () => this.closeTaskModal(),
      'sync-modal': () => this.closeSyncModal()
    };
    for (const id of Object.keys(map)) {
      const el = document.getElementById(id);
      if (el && el.style.display === 'flex') {
        map[id]();
        break;
      }
    }
  }

  barcodeSvg(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    let x = 0; const W = 300; let rects = '';
    while (x < W) {
      h = (h * 1103515245 + 12345) >>> 0;
      const bw = 1 + (h % 3);
      h = (h * 1103515245 + 12345) >>> 0;
      const gap = 1 + (h % 3);
      rects += `<rect x="${x}" y="0" width="${bw}" height="46" fill="#1a1a1a"/>`;
      x += bw + gap;
    }
    return `<svg class="receipt-barcode-svg" viewBox="0 0 300 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  // ===== 小票收藏夹 / 托盘 =====
  renderReceiptView() {
    const tray = document.getElementById('receipt-tray');
    const empty = document.getElementById('receipt-tray-empty');
    if (!tray) return;
    const list = [...this.receipts].sort((a, b) => (a.order || 0) - (b.order || 0));
    if (list.length === 0) {
      tray.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tray.innerHTML = list.map((r, idx) => {
      const d = new Date(r.date);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `
        <div class="receipt-card" draggable="true" data-date="${r.date}" data-idx="${idx}"
             ondragstart="app.dragReceipt(event, '${r.date}')"
             ondragend="app.endDragReceipt(event)"
             onclick="app.openReceipt('${r.date}')">
          <div class="receipt-card-date">${mm}.${dd}</div>
          <img class="receipt-card-img" src="${r.pixelUrl || ''}" alt="${r.pattern || ''}" />
          <div class="receipt-card-pattern">${r.pattern || 'pixel'}</div>
        </div>
      `;
    }).join('');
  }

  dragReceipt(e, date) {
    this._dragReceiptDate = date;
    e.dataTransfer.effectAllowed = 'move';
    const card = e.target.closest('.receipt-card');
    if (card) card.classList.add('dragging');
  }

  endDragReceipt(e) {
    const card = e.target.closest('.receipt-card');
    if (card) card.classList.remove('dragging');
    delete this._dragReceiptDate;
  }

  allowDropReceipt(e) {
    e.preventDefault();
    const tray = document.getElementById('receipt-tray');
    if (!tray) return;
    const after = this._getDragAfterElement(tray, e.clientX, e.clientY);
    const dragging = tray.querySelector('.dragging');
    if (!dragging) return;
    if (after == null) tray.appendChild(dragging);
    else tray.insertBefore(dragging, after);
  }

  _getDragAfterElement(container, x, y) {
    const cards = [...container.querySelectorAll('.receipt-card:not(.dragging)')];
    return cards.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetX = x - box.left - box.width / 2;
      const offsetY = y - box.top - box.height / 2;
      const dist = offsetX * offsetX + offsetY * offsetY;
      if (dist < closest.dist) return { dist, offsetX, offsetY, element: child };
      return closest;
    }, { dist: Number.POSITIVE_INFINITY }).element;
  }

  dropReceipt(e) {
    e.preventDefault();
    const tray = document.getElementById('receipt-tray');
    if (!tray || !this._dragReceiptDate) return;
    const order = [...tray.querySelectorAll('.receipt-card')].map(c => c.dataset.date);
    const map = new Map(this.receipts.map(r => [r.date, r]));
    this.receipts = order.map(date => map.get(date)).filter(Boolean);
    this.receipts.forEach((r, i) => r.order = i);
    this.saveData();
    this.renderReceiptView();
  }

  openTodayTodoModal(todoId) {
    const modal = document.getElementById('today-todo-modal');
    const todo = this.todayTodos.find(t => t.id === todoId);
    if (!todo) return;
    document.getElementById('today-todo-id').value = todo.id;
    document.getElementById('today-todo-title').value = todo.title;
    modal.style.display = 'flex';
    document.getElementById('today-todo-title').focus();
  }

  closeTodayTodoModal() {
    document.getElementById('today-todo-modal').style.display = 'none';
  }

  saveTodayTodo(event) {
    event.preventDefault();
    const id = document.getElementById('today-todo-id').value;
    const title = document.getElementById('today-todo-title').value.trim();
    if (!title) return;
    const todo = this.todayTodos.find(t => t.id === id);
    if (todo) {
      todo.title = title;
      this.closeTodayTodoModal();
      this.saveData();
    }
  }

  // Drag and Drop
  handleDragStart(event, taskId, subtaskId) {
    this.dragData = { taskId, subtaskId };
    event.dataTransfer.effectAllowed = 'move';
    event.target.classList.add('dragging');
  }

  handleDragEnd(event) {
    event.target.classList.remove('dragging');
    this.dragData = null;
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  }

  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const target = event.currentTarget;
    target.classList.add('drag-over');
  }

  handleDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
  }

  handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    if (!this.dragData) return;

    const dateStr = event.currentTarget.dataset.date;
    const { taskId, subtaskId } = this.dragData;
    const task = this.tasks.find(t => t.id === taskId);
    const sub = task.subtasks.find(s => s.id === subtaskId);

    if (sub) {
      sub.date = dateStr;
      this.updateTaskStatusFromSubtasks(task);
      this.saveData();
      if (this.selectedDate) {
        this.openDayModal(this.selectedDate);
      }
    }
  }

  // Helpers
  todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  dateToStr(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  formatDate(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  formatDateSimple(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  }

  getSubtasksByDate(dateStr) {
    const result = [];
    this.tasks.forEach(task => {
      task.subtasks.forEach(sub => {
        if (sub.date === dateStr) {
          result.push({ ...sub, taskId: task.id, taskTitle: task.title, category: task.category });
        }
      });
    });
    return result;
  }

  // Filters
  renderFilters() {
    const catContainer = document.getElementById('category-filters');
    catContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="filter-btn ${this.filterCategory === cat ? 'active' : ''}" onclick="app.setCategoryFilter('${cat}')">${cat}</button>
    `).join('');

    const priContainer = document.getElementById('priority-filters');
    priContainer.innerHTML = PRIORITIES.map(pri => `
      <button class="filter-btn ${this.filterPriority === pri ? 'active' : ''}" onclick="app.setPriorityFilter('${pri}')">${pri}</button>
    `).join('');
  }

  setCategoryFilter(cat) {
    this.filterCategory = cat;
    this.renderFilters();
    this.renderTasks();
  }

  setPriorityFilter(pri) {
    this.filterPriority = pri;
    this.renderFilters();
    this.renderTasks();
  }

  handleSearch(query) {
    this.searchQuery = query.trim().toLowerCase();
    this.renderTasks();
  }

  getFilteredTasks() {
    return this.tasks.filter(task => {
      const matchCat = this.filterCategory === '全部' || task.category === this.filterCategory;
      const matchPri = this.filterPriority === '全部' || task.priority === this.filterPriority;
      const q = this.searchQuery;
      const matchSearch = !q ||
        task.title.toLowerCase().includes(q) ||
        task.notes.toLowerCase().includes(q) ||
        task.subtasks.some(s => s.title.toLowerCase().includes(q));
      return matchCat && matchPri && matchSearch;
    });
  }

  // Task List
  renderTasks() {
    const leftContainer = document.getElementById('task-list-left');
    const rightContainer = document.getElementById('task-list-right');
    const emptyState = document.getElementById('empty-state');
    const mainLayout = document.getElementById('main-layout');
    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      leftContainer.innerHTML = '';
      rightContainer.innerHTML = '';
      mainLayout.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    mainLayout.style.display = 'grid';

    const priorityOrder = { 'P0': 0, 'P1': 1, 'P2': 2 };
    filtered.sort((a, b) => {
      const pa = priorityOrder[a.priority] ?? 3;
      const pb = priorityOrder[b.priority] ?? 3;
      if (pa !== pb) return pa - pb;
      const da = a.status === 'done' ? 1 : 0;
      const db = b.status === 'done' ? 1 : 0;
      return da - db;
    });

    const groups = this.groupTasksByCategory(filtered);

    if (this.layoutMode === 'wide') {
      const { left, right } = this.distributeCategories(groups);
      leftContainer.innerHTML = left.map(g => this.renderCategorySection(g.category, g.tasks)).join('');
      rightContainer.innerHTML = right.map(g => this.renderCategorySection(g.category, g.tasks)).join('');
    } else {
      leftContainer.innerHTML = groups.map(g => this.renderCategorySection(g.category, g.tasks)).join('');
      rightContainer.innerHTML = '';
    }
  }

  groupTasksByCategory(tasks) {
    const categoryOrder = CATEGORIES.slice(1);
    if (this.filterCategory !== '全部') {
      return [{ category: this.filterCategory, tasks: tasks.filter(t => t.category === this.filterCategory) }];
    }
    return categoryOrder.map(category => ({
      category,
      tasks: tasks.filter(t => t.category === category)
    })).filter(g => g.tasks.length > 0);
  }

  distributeCategories(groups) {
    let leftWeight = 0;
    let rightWeight = 0;
    const left = [];
    const right = [];

    groups.forEach(g => {
      if (leftWeight <= rightWeight) {
        left.push(g);
        leftWeight += g.tasks.length;
      } else {
        right.push(g);
        rightWeight += g.tasks.length;
      }
    });

    return { left, right };
  }

  renderCategorySection(category, tasks) {
    const collapsed = this.collapsedCategories.has(category);
    const totalSubtasks = tasks.reduce((sum, t) => sum + t.subtasks.length, 0);
    const doneSubtasks = tasks.reduce((sum, t) => sum + t.subtasks.filter(s => s.status === 'done').length, 0);

    return `
      <div class="category-section ${collapsed ? 'collapsed' : ''}">
        <div class="category-header" onclick="app.toggleCategory('${category}')">
          <div class="category-info">
            <span class="category-icon">${this.categoryIcon(category)}</span>
            <span class="category-title">${category}</span>
            <span class="category-count">${tasks.length} 个任务 · ${doneSubtasks}/${totalSubtasks} 完成</span>
          </div>
          <div class="category-actions">
            <span class="category-toggle">${collapsed ? '▸' : '▾'}</span>
          </div>
        </div>
        <div class="category-body" style="${collapsed ? 'display: none;' : ''}">
          ${tasks.map(task => this.renderTaskCard(task)).join('')}
        </div>
      </div>
    `;
  }

  categoryIcon(category) {
    const map = {
      '行政出行': '🛂',
      '学习成长': '📚',
      '购物消费': '🛍️',
      '生活护理': '🧖‍♀️'
    };
    return map[category] || '📋';
  }

  toggleCategory(category) {
    if (this.collapsedCategories.has(category)) {
      this.collapsedCategories.delete(category);
    } else {
      this.collapsedCategories.add(category);
    }
    this.renderTasks();
  }

  renderTaskCard(task) {
    const total = task.subtasks.length;
    const done = task.subtasks.filter(s => s.status === 'done').length;
    const progress = total === 0 ? (task.status === 'done' ? 100 : 0) : Math.round(done / total * 100);
    const isExpanded = this.expandedTasks.has(task.id);
    const datedCount = task.subtasks.filter(s => s.date).length;

    return `
      <div class="task-card">
        <div class="task-header" onclick="app.toggleExpand('${task.id}')">
          <div class="task-main">
            <div class="task-title-row">
              <span class="task-title ${task.status === 'done' ? 'done' : ''}">${this.escapeHtml(task.title)}</span>
              <span class="task-progress-inline">${done}/${total} 完成</span>
            </div>
            <div class="task-meta">
              <span class="tag tag-priority-${task.priority}">${task.priority}</span>
              <span class="tag tag-status-${task.status}">${this.statusText(task.status)}</span>
              ${datedCount > 0 ? `<span class="tag tag-status-todo">📅 ${datedCount}项</span>` : ''}
            </div>
          </div>
          <div class="task-actions" onclick="event.stopPropagation()">
            <button class="icon-btn" title="编辑" onclick="app.openTaskModal('${task.id}')">✏️</button>
            <button class="icon-btn" title="删除" onclick="app.deleteTask('${task.id}')">🗑️</button>
          </div>
        </div>
        ${isExpanded ? this.renderTaskBody(task, progress) : ''}
      </div>
    `;
  }

  renderTaskBody(task, progress) {
    const subtasksHtml = task.subtasks.map(sub => `
      <div class="subtask-item"
           draggable="true"
           ondragstart="app.handleDragStart(event, '${task.id}', '${sub.id}')"
           ondragend="app.handleDragEnd(event)">
        <span class="drag-handle">⋮⋮</span>
        <div class="subtask-checkbox ${sub.status === 'done' ? 'checked' : ''}" onclick="app.toggleSubtask('${task.id}', '${sub.id}')">
          ${sub.status === 'done' ? '✓' : ''}
        </div>
        <span class="subtask-title ${sub.status === 'done' ? 'done' : ''}">${this.escapeHtml(sub.title)}</span>
        ${sub.date ? `<span class="subtask-date">📅 ${sub.date}</span>` : ''}
        <div class="subtask-actions" onclick="event.stopPropagation()">
          <button class="icon-btn" title="编辑" onclick="app.openSubtaskModal('${task.id}', '${sub.id}')">✏️</button>
          <button class="icon-btn" title="删除" onclick="app.deleteSubtask('${task.id}', '${sub.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    return `
      <div class="task-body">
        ${task.notes ? `<div class="task-notes">${this.escapeHtml(task.notes)}</div>` : ''}
        <div class="subtask-list">
          ${subtasksHtml || '<div style="color: var(--text-secondary); font-size: 13px;">暂无子任务，点击下方添加</div>'}
        </div>
        <button class="add-subtask" onclick="app.openSubtaskModal('${task.id}')">+ 添加子任务</button>
        <div class="task-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="progress-text">${task.subtasks.filter(s => s.status === 'done').length}/${task.subtasks.length} 完成</div>
        </div>
      </div>
    `;
  }

  toggleExpand(taskId) {
    if (this.expandedTasks.has(taskId)) {
      this.expandedTasks.delete(taskId);
    } else {
      this.expandedTasks.add(taskId);
    }
    this.renderTasks();
  }

  statusText(status) {
    const map = { todo: '待办', doing: '进行中', done: '已完成' };
    return map[status] || status;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  updateStats() {
    const total = this.tasks.length;
    const done = this.tasks.filter(t => t.status === 'done').length;
    const allSubtasks = this.tasks.flatMap(t => t.subtasks);
    const subDone = allSubtasks.filter(s => s.status === 'done').length;
    const progress = allSubtasks.length === 0 ? 0 : Math.round(subDone / allSubtasks.length * 100);

    const today = this.todayStr();
    const todayTodos = this.getTodayTodos(today);
    const todaySubtasks = this.getSubtasksByDate(today);
    const routineItems = this.buildRoutineItems(today);
    const limitedItems = this.buildLimitedItems(todayTodos);
    const undoneRoutines = routineItems.filter(item => !item.done);
    const undoneLimited = limitedItems.filter(item => !item.done);
    const undoneSubtasks = todaySubtasks.filter(s => s.status !== 'done');
    const todayTasks = undoneRoutines.length + undoneLimited.length + undoneSubtasks.length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-progress').textContent = progress + '%';
    document.getElementById('stat-today').textContent = todayTasks;
  }

  // Day Modal
  openDayModal(dateStr) {
    this.selectedDate = dateStr;
    const modal = document.getElementById('day-modal');
    const dateObj = new Date(dateStr);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    document.getElementById('day-modal-title').textContent = `${dateStr} 周${weekday}`;

    const subs = this.getSubtasksByDate(dateStr);
    const container = document.getElementById('day-subtasks');

    if (subs.length === 0) {
      container.innerHTML = '<div class="day-empty">这一天还没有安排事项<br>点击下方添加</div>';
    } else {
      const grouped = {};
      subs.forEach(sub => {
        if (!grouped[sub.taskId]) grouped[sub.taskId] = { title: sub.taskTitle, items: [] };
        grouped[sub.taskId].items.push(sub);
      });

      container.innerHTML = Object.entries(grouped).map(([taskId, group]) => `
        <div class="day-subtask-group">
          <h4 class="cat-${group.items[0]?.category || ''}">${this.escapeHtml(group.title)}</h4>
          ${group.items.map(sub => `
            <div class="subtask-item cat-${sub.category}"
                 draggable="true"
                 ondragstart="app.handleDragStart(event, '${taskId}', '${sub.id}')"
                 ondragend="app.handleDragEnd(event)">
              <div class="subtask-checkbox ${sub.status === 'done' ? 'checked' : ''}" onclick="app.toggleSubtask('${taskId}', '${sub.id}')">
                ${sub.status === 'done' ? '✓' : ''}
              </div>
              <span class="subtask-title ${sub.status === 'done' ? 'done' : ''}">${this.escapeHtml(sub.title)}</span>
              <div class="subtask-actions">
                <button class="icon-btn" title="编辑" onclick="app.openSubtaskModal('${taskId}', '${sub.id}')">✏️</button>
                <button class="icon-btn" title="删除" onclick="app.deleteSubtask('${taskId}', '${sub.id}')">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('');
    }

    document.getElementById('day-add-btn').onclick = () => this.openSubtaskModal(null, null, dateStr);
    modal.style.display = 'flex';
  }

  closeDayModal() {
    document.getElementById('day-modal').style.display = 'none';
    this.selectedDate = null;
  }

  // Routines / Habits
  changeHabitMonth(delta) {
    this.habitMonth.setMonth(this.habitMonth.getMonth() + delta);
    this.habitMonth = new Date(this.habitMonth);
    this.renderHabitCalendar();
  }

  renderRoutines() {
    const container = document.getElementById('routines-list');
    if (this.routines.length === 0) {
      container.innerHTML = '<div style="color: var(--text-secondary); font-size: 13px;">还没有固定日程，点击右上角添加</div>';
      return;
    }
    container.innerHTML = this.routines.map(r => `
      <div class="routine-item routine-color-${r.color}" onclick="app.openRoutineModal('${r.id}')">
        <span class="routine-icon">${r.icon}</span>
        <span>${this.escapeHtml(r.title)}</span>
        <span class="routine-actions" onclick="event.stopPropagation()">
          <button class="icon-btn" title="删除" onclick="app.deleteRoutine('${r.id}')">🗑️</button>
        </span>
      </div>
    `).join('');
  }

  renderHabitCalendar() {
    const year = this.habitMonth.getFullYear();
    const month = this.habitMonth.getMonth();
    document.getElementById('habit-calendar-month-title').textContent = `${year}年${month + 1}月`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

    let html = WEEKDAY_NAMES.map(d => `<div class="calendar-weekday">周${d}</div>`).join('');

    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - startOffset + 1;
      let dateStr, displayDay, otherMonth = false, isToday = false;

      if (dayIndex <= 0) {
        displayDay = prevLastDay + dayIndex;
        const prevMonth = new Date(year, month, 0);
        dateStr = this.formatDate(prevMonth.getFullYear(), prevMonth.getMonth(), displayDay);
        otherMonth = true;
      } else if (dayIndex > daysInMonth) {
        displayDay = dayIndex - daysInMonth;
        const nextMonth = new Date(year, month + 1, 1);
        dateStr = this.formatDate(nextMonth.getFullYear(), nextMonth.getMonth(), displayDay);
        otherMonth = true;
      } else {
        displayDay = dayIndex;
        dateStr = this.formatDate(year, month, dayIndex);
        isToday = dateStr === this.todayStr();
      }

      const checkedCount = this.routines.filter(r => r.dates && r.dates.includes(dateStr)).length;

      html += `
        <div class="calendar-day ${otherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}" onclick="app.openHabitDayModal('${dateStr}')">
          <div class="calendar-day-number">${displayDay}</div>
          <div class="habit-day-routines">
            ${this.routines.map(r => {
              const checked = r.dates && r.dates.includes(dateStr);
              return `<div class="habit-day-dot habit-dot-${r.color} ${checked ? 'checked' : ''}">${r.icon}</div>`;
            }).join('')}
          </div>
          ${this.routines.length > 0 ? `<div class="habit-day-count">${checkedCount}/${this.routines.length}</div>` : ''}
        </div>
      `;
    }

    document.getElementById('habit-calendar-grid').innerHTML = html;
  }

  openRoutineModal(routineId = null) {
    const modal = document.getElementById('routine-modal');
    const titleEl = document.getElementById('routine-modal-title');
    const idEl = document.getElementById('routine-id');

    if (routineId) {
      const r = this.routines.find(x => x.id === routineId);
      titleEl.textContent = '编辑固定日程';
      idEl.value = r.id;
      document.getElementById('routine-title').value = r.title;
      document.getElementById('routine-icon').value = r.icon;
      document.getElementById('routine-color').value = r.color;
    } else {
      titleEl.textContent = '新增固定日程';
      idEl.value = '';
      document.getElementById('routine-title').value = '';
      document.getElementById('routine-icon').value = '✨';
      document.getElementById('routine-color').value = 'blue';
    }

    modal.style.display = 'flex';
    document.getElementById('routine-title').focus();
  }

  closeRoutineModal() {
    document.getElementById('routine-modal').style.display = 'none';
  }

  saveRoutine(event) {
    event.preventDefault();
    const id = document.getElementById('routine-id').value;
    const title = document.getElementById('routine-title').value.trim();
    const icon = document.getElementById('routine-icon').value;
    const color = document.getElementById('routine-color').value;

    if (!title) return;

    if (id) {
      const r = this.routines.find(x => x.id === id);
      r.title = title;
      r.icon = icon;
      r.color = color;
    } else {
      this.routines.push({ id: 'r' + Date.now(), title, icon, color, dates: [] });
    }

    this.closeRoutineModal();
    this.saveData();
  }

  deleteRoutine(routineId) {
    if (!confirm('确定要删除这个固定日程吗？打卡记录也会一起删除。')) return;
    this.routines = this.routines.filter(r => r.id !== routineId);
    this.saveData();
  }

  openHabitDayModal(dateStr) {
    this.habitSelectedDate = dateStr;
    const modal = document.getElementById('habit-day-modal');
    const dateObj = new Date(dateStr);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    document.getElementById('habit-day-modal-title').textContent = `${dateStr} 周${weekday} 打卡`;

    const container = document.getElementById('habit-day-list');
    if (this.routines.length === 0) {
      container.innerHTML = '<div class="day-empty">还没有固定日程<br>先去添加一个吧</div>';
    } else {
      container.innerHTML = this.routines.map(r => {
        const checked = r.dates && r.dates.includes(dateStr);
        return `
          <div class="habit-day-item ${checked ? 'checked' : ''}" onclick="app.toggleHabitCheck('${r.id}', '${dateStr}')">
            <div class="habit-day-item-icon">${r.icon}</div>
            <div class="habit-day-item-info">
              <div class="habit-day-item-title">${this.escapeHtml(r.title)}</div>
              <div class="habit-day-item-status">${checked ? '已完成' : '未完成'}</div>
            </div>
            <div class="habit-day-check">${checked ? '✓' : ''}</div>
          </div>
        `;
      }).join('');
    }

    modal.style.display = 'flex';
  }

  closeHabitDayModal() {
    document.getElementById('habit-day-modal').style.display = 'none';
    this.habitSelectedDate = null;
  }

  toggleHabitCheck(routineId, dateStr) {
    const r = this.routines.find(x => x.id === routineId);
    if (!r.dates) r.dates = [];
    const idx = r.dates.indexOf(dateStr);
    if (idx >= 0) {
      r.dates.splice(idx, 1);
    } else {
      r.dates.push(dateStr);
    }
    this.saveData();
    if (document.getElementById('habit-day-modal').style.display === 'flex') {
      this.openHabitDayModal(dateStr);
    }
  }

  // ===== 拉粑粑日历 =====
  renderPoopView() {
    this.renderPoopStats();
    this.renderPoopCalendar();
  }

  changePoopMonth(delta) {
    this.poopMonth.setMonth(this.poopMonth.getMonth() + delta);
    this.poopMonth = new Date(this.poopMonth);
    this.renderPoopCalendar();
  }

  renderPoopCalendar() {
    const container = document.getElementById('poop-calendar-grid');
    if (!container) return;
    const year = this.poopMonth.getFullYear();
    const month = this.poopMonth.getMonth();
    document.getElementById('poop-month-title').textContent = `${year}年${month + 1}月`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const today = this.todayStr();

    let html = WEEKDAY_NAMES.map(d => `<div class="calendar-weekday">周${d}</div>`).join('');

    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - startOffset + 1;
      let dateStr, displayDay, otherMonth = false;

      if (dayIndex <= 0) {
        displayDay = prevLastDay + dayIndex;
        const prevMonth = new Date(year, month, 0);
        dateStr = this.formatDate(prevMonth.getFullYear(), prevMonth.getMonth(), displayDay);
        otherMonth = true;
      } else if (dayIndex > daysInMonth) {
        displayDay = dayIndex - daysInMonth;
        const nextMonth = new Date(year, month + 1, 1);
        dateStr = this.formatDate(nextMonth.getFullYear(), nextMonth.getMonth(), displayDay);
        otherMonth = true;
      } else {
        displayDay = dayIndex;
        dateStr = this.formatDate(year, month, dayIndex);
      }

      const isToday = dateStr === today;
      const isPoop = this.poopDates.includes(dateStr);
      const isFuture = dateStr > today;

      const classes = ['calendar-day'];
      if (otherMonth) classes.push('other-month');
      if (isToday) classes.push('today');
      if (isPoop) classes.push('poop-day');

      html += `
        <div class="${classes.join(' ')} ${isFuture ? 'poop-future' : ''}" onclick="app.togglePoop('${dateStr}')">
          <div class="calendar-day-number">${displayDay}</div>
          ${isPoop ? '<div class="poop-emoji">💩</div>' : ''}
        </div>
      `;
    }
    container.innerHTML = html;
  }

  togglePoop(dateStr) {
    const today = this.todayStr();
    if (dateStr > today) return; // 不允许记录未来
    const idx = this.poopDates.indexOf(dateStr);
    if (idx >= 0) {
      this.poopDates.splice(idx, 1);
    } else {
      this.poopDates.push(dateStr);
    }
    this.saveData();
    this.renderPoopCalendar();
    this.renderPoopStats();
  }

  renderPoopStats() {
    const dates = [...this.poopDates].sort();
    const total = dates.length;
    const today = this.todayStr();

    let current = 0;
    let cursor = dates.includes(today) ? today : this.shiftDate(today, -1);
    while (dates.includes(cursor)) {
      current++;
      cursor = this.shiftDate(cursor, -1);
    }

    let best = 0, run = 0, prev = null;
    for (const d of dates) {
      if (prev && this.shiftDate(prev, 1) === d) run++;
      else run = 1;
      if (run > best) best = run;
      prev = d;
    }

    const y = this.poopMonth.getFullYear();
    const m = this.poopMonth.getMonth();
    const monthCount = dates.filter(d => {
      const parts = d.split('-').map(Number);
      return parts[0] === y && parts[1] - 1 === m;
    }).length;

    const tEl = document.getElementById('poop-total');
    const cEl = document.getElementById('poop-current');
    const bEl = document.getElementById('poop-best');
    const mEl = document.getElementById('poop-month');
    if (tEl) tEl.textContent = total;
    if (cEl) cEl.textContent = current;
    if (bEl) bEl.textContent = best;
    if (mEl) mEl.textContent = monthCount;
  }

  shiftDate(dateStr, delta) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + delta);
    return this.dateToStr(d);
  }

  // ===== 护肤日历 =====
  renderSkincareView() {
    this.renderSkincareStats();
    this.renderSkincareCalendar();
  }

  changeSkincareMonth(delta) {
    this.skincareMonth.setMonth(this.skincareMonth.getMonth() + delta);
    this.skincareMonth = new Date(this.skincareMonth);
    this.renderSkincareCalendar();
  }

  renderSkincareCalendar() {
    const container = document.getElementById('skincare-calendar-grid');
    if (!container) return;
    const year = this.skincareMonth.getFullYear();
    const month = this.skincareMonth.getMonth();
    document.getElementById('skincare-month-title').textContent = `${year}年${month + 1}月`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const today = this.todayStr();

    let html = WEEKDAY_NAMES.map(d => `<div class="calendar-weekday">周${d}</div>`).join('');

    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - startOffset + 1;
      let dateStr, displayDay, otherMonth = false;

      if (dayIndex <= 0) {
        displayDay = prevLastDay + dayIndex;
        const prevMonth = new Date(year, month, 0);
        dateStr = this.formatDate(prevMonth.getFullYear(), prevMonth.getMonth(), displayDay);
        otherMonth = true;
      } else if (dayIndex > daysInMonth) {
        displayDay = dayIndex - daysInMonth;
        const nextMonth = new Date(year, month + 1, 1);
        dateStr = this.formatDate(nextMonth.getFullYear(), nextMonth.getMonth(), displayDay);
        otherMonth = true;
      } else {
        displayDay = dayIndex;
        dateStr = this.formatDate(year, month, dayIndex);
      }

      const isToday = dateStr === today;
      const isFuture = dateStr > today;
      const rec = this.skincareDates[dateStr] || {};
      const activeCats = SKINCARE_CATEGORIES.filter(c => rec[c.key]);

      const classes = ['calendar-day'];
      if (otherMonth) classes.push('other-month');
      if (isToday) classes.push('today');
      if (activeCats.length) classes.push('skincare-day');

      const badges = activeCats.map(c => `<div class="skincare-emoji">${c.emoji}</div>`).join('');

      html += `
        <div class="${classes.join(' ')} ${isFuture ? 'skincare-future' : ''}" onclick="app.openSkincareDay('${dateStr}')">
          <div class="calendar-day-number">${displayDay}</div>
          ${badges ? `<div class="skincare-badges">${badges}</div>` : ''}
        </div>
      `;
    }
    container.innerHTML = html;
  }

  openSkincareDay(dateStr) {
    const today = this.todayStr();
    if (dateStr > today) return; // 不允许记录未来
    this.skincareSelectedDate = dateStr;
    const rec = this.skincareDates[dateStr] || {};
    document.getElementById('skincare-day-title').textContent = `${dateStr} 的护肤记录`;
    const body = document.getElementById('skincare-day-body');
    body.innerHTML = SKINCARE_CATEGORIES.map(c => {
      const on = !!rec[c.key];
      return `
        <button class="skincare-toggle ${on ? 'on' : ''} cat-${c.key}" onclick="app.toggleSkincareCategory('${dateStr}', '${c.key}')">
          <span class="skincare-toggle-emoji">${c.emoji}</span>
          <span>${c.label}</span>
          <span class="skincare-toggle-check">${on ? '✓' : ''}</span>
        </button>
      `;
    }).join('');
    document.getElementById('skincare-day-modal').style.display = 'flex';
  }

  closeSkincareDayModal() {
    document.getElementById('skincare-day-modal').style.display = 'none';
    this.skincareSelectedDate = null;
  }

  toggleSkincareCategory(dateStr, cat) {
    if (!this.skincareDates[dateStr]) this.skincareDates[dateStr] = {};
    this.skincareDates[dateStr][cat] = !this.skincareDates[dateStr][cat];
    if (!this.skincareDates[dateStr][cat] &&
        !this.skincareDates[dateStr].mask &&
        !this.skincareDates[dateStr].apply &&
        !this.skincareDates[dateStr].salon) {
      delete this.skincareDates[dateStr];
    }
    this.saveData();
    this.renderSkincareCalendar();
    this.renderSkincareStats();
    if (this.skincareSelectedDate === dateStr) {
      this.openSkincareDay(dateStr);
    }
  }

  renderSkincareStats() {
    const y = this.skincareMonth.getFullYear();
    const m = this.skincareMonth.getMonth();
    const dates = Object.keys(this.skincareDates);
    const total = dates.length;
    const monthMask = dates.filter(d => {
      const p = d.split('-').map(Number);
      return p[0] === y && p[1] - 1 === m && this.skincareDates[d].mask;
    }).length;
    const monthApply = dates.filter(d => {
      const p = d.split('-').map(Number);
      return p[0] === y && p[1] - 1 === m && this.skincareDates[d].apply;
    }).length;
    const monthSalon = dates.filter(d => {
      const p = d.split('-').map(Number);
      return p[0] === y && p[1] - 1 === m && this.skincareDates[d].salon;
    }).length;

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setText('skincare-total', total);
    setText('skincare-month-mask', monthMask);
    setText('skincare-month-apply', monthApply);
    setText('skincare-month-salon', monthSalon);
  }

  recordSkincareToday(cat) {
    const today = this.todayStr();
    this.toggleSkincareCategory(today, cat);
  }

  // Task Modal
  openTaskModal(taskId = null) {
    const modal = document.getElementById('task-modal');
    const titleEl = document.getElementById('task-modal-title');
    const idEl = document.getElementById('task-id');

    if (taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      titleEl.textContent = '编辑任务';
      idEl.value = task.id;
      document.getElementById('task-title').value = task.title;
      document.getElementById('task-category').value = task.category;
      document.getElementById('task-priority').value = task.priority;
      document.getElementById('task-status').value = task.status;
      document.getElementById('task-week').value = task.week || '';
      document.getElementById('task-notes').value = task.notes || '';
    } else {
      titleEl.textContent = '新增任务';
      idEl.value = '';
      document.getElementById('task-title').value = '';
      document.getElementById('task-category').value = '行政出行';
      document.getElementById('task-priority').value = 'P1';
      document.getElementById('task-status').value = 'todo';
      document.getElementById('task-week').value = '';
      document.getElementById('task-notes').value = '';
    }

    modal.style.display = 'flex';
    document.getElementById('task-title').focus();
  }

  closeTaskModal() {
    document.getElementById('task-modal').style.display = 'none';
  }

  saveTask(event) {
    event.preventDefault();
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value.trim();
    const category = document.getElementById('task-category').value;
    const priority = document.getElementById('task-priority').value;
    const status = document.getElementById('task-status').value;
    const week = document.getElementById('task-week').value;
    const notes = document.getElementById('task-notes').value.trim();

    if (!title) return;

    if (id) {
      const task = this.tasks.find(t => t.id === id);
      task.title = title;
      task.category = category;
      task.priority = priority;
      task.status = status;
      task.week = week;
      task.notes = notes;
    } else {
      this.tasks.push({ id: 't' + Date.now(), title, category, priority, status, week, notes, subtasks: [] });
    }

    this.closeTaskModal();
    this.saveData();
  }

  deleteTask(taskId) {
    if (!confirm('确定要删除这个任务吗？子任务也会一起删除。')) return;
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.expandedTasks.delete(taskId);
    this.saveData();
  }

  // Subtask Modal
  populateParentTaskSelect(selectedTaskId) {
    const select = document.getElementById('subtask-parent-task');
    select.innerHTML = this.tasks.map(task => `
      <option value="${task.id}" ${task.id === selectedTaskId ? 'selected' : ''}>${this.escapeHtml(task.title)}</option>
    `).join('');
  }

  onParentTaskChange() {
    const taskId = document.getElementById('subtask-parent-task').value;
    document.getElementById('subtask-task-id').value = taskId;
  }

  openSubtaskModal(taskId, subtaskId = null, defaultDate = null) {
    const modal = document.getElementById('subtask-modal');
    const titleEl = document.getElementById('subtask-modal-title');
    const taskIdEl = document.getElementById('subtask-task-id');
    const idEl = document.getElementById('subtask-id');

    const effectiveTaskId = taskId || (this.tasks[0]?.id) || '';
    taskIdEl.value = effectiveTaskId;
    this.populateParentTaskSelect(effectiveTaskId);

    if (subtaskId) {
      const task = this.tasks.find(t => t.id === taskId);
      const sub = task.subtasks.find(s => s.id === subtaskId);
      titleEl.textContent = '编辑子任务';
      idEl.value = sub.id;
      document.getElementById('subtask-title').value = sub.title;
      document.getElementById('subtask-status').value = sub.status;
      document.getElementById('subtask-date').value = sub.date || defaultDate || '';
    } else {
      titleEl.textContent = '新增子任务';
      idEl.value = '';
      document.getElementById('subtask-title').value = '';
      document.getElementById('subtask-status').value = 'todo';
      document.getElementById('subtask-date').value = defaultDate || '';
    }

    modal.style.display = 'flex';
    document.getElementById('subtask-title').focus();
  }

  closeSubtaskModal() {
    document.getElementById('subtask-modal').style.display = 'none';
  }

  saveSubtask(event) {
    event.preventDefault();
    const originalTaskId = document.getElementById('subtask-task-id').value;
    const newTaskId = document.getElementById('subtask-parent-task').value;
    const subtaskId = document.getElementById('subtask-id').value;
    const title = document.getElementById('subtask-title').value.trim();
    const status = document.getElementById('subtask-status').value;
    const date = document.getElementById('subtask-date').value;

    if (!title || !newTaskId) return;

    if (subtaskId) {
      const originalTask = this.tasks.find(t => t.id === originalTaskId);
      const subIndex = originalTask.subtasks.findIndex(s => s.id === subtaskId);
      const sub = originalTask.subtasks[subIndex];

      sub.title = title;
      sub.status = status;
      sub.date = date;

      if (originalTaskId !== newTaskId) {
        originalTask.subtasks.splice(subIndex, 1);
        const newTask = this.tasks.find(t => t.id === newTaskId);
        newTask.subtasks.push(sub);
        this.updateTaskStatusFromSubtasks(originalTask);
        this.updateTaskStatusFromSubtasks(newTask);
      } else {
        this.updateTaskStatusFromSubtasks(originalTask);
      }
    } else {
      const task = this.tasks.find(t => t.id === newTaskId);
      task.subtasks.push({ id: 's' + Date.now(), title, status, date });
      this.updateTaskStatusFromSubtasks(task);
    }

    this.closeSubtaskModal();
    this.saveData();

    if (this.selectedDate) {
      this.openDayModal(this.selectedDate);
    }
  }

  toggleSubtask(taskId, subtaskId) {
    const task = this.tasks.find(t => t.id === taskId);
    const sub = task.subtasks.find(s => s.id === subtaskId);
    sub.status = sub.status === 'done' ? 'todo' : 'done';
    this.updateTaskStatusFromSubtasks(task);
    this.saveData();
    if (this.selectedDate) {
      this.openDayModal(this.selectedDate);
    }
  }

  updateTaskStatusFromSubtasks(task) {
    const total = task.subtasks.length;
    const done = task.subtasks.filter(s => s.status === 'done').length;
    if (total === 0) return;
    if (done === total) task.status = 'done';
    else if (done > 0) task.status = 'doing';
    else task.status = 'todo';
  }

  deleteSubtask(taskId, subtaskId) {
    if (!confirm('确定要删除这个子任务吗？')) return;
    const task = this.tasks.find(t => t.id === taskId);
    task.subtasks = task.subtasks.filter(s => s.id !== subtaskId);
    this.updateTaskStatusFromSubtasks(task);
    this.saveData();
    if (this.selectedDate) {
      this.openDayModal(this.selectedDate);
    }
  }

  // Import / Export
  exportData() {
    const dataStr = JSON.stringify({ tasks: this.tasks, routines: this.routines, todayTodos: this.todayTodos, poopDates: this.poopDates, skincareDates: this.skincareDates, receipts: this.receipts }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `悦悦任务备份-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) {
          this.tasks = data;
          this.routines = [];
          this.todayTodos = [];
          this.poopDates = [];
          this.receipts = [];
        } else {
          this.tasks = data.tasks || [];
          this.routines = data.routines || [];
          this.todayTodos = data.todayTodos || [];
          this.poopDates = data.poopDates || [];
          this.skincareDates = data.skincareDates || {};
          this.receipts = data.receipts || [];
        }
        this.saveData();
        alert('备份导入成功！');
      } catch (err) {
        alert('导入失败：' + err.message);
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  // ===== 云端同步（Supabase）=====
  get supabase() {
    if (this._supabase === null && typeof supabase !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.startsWith('YOUR_')) {
      try {
        this._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      } catch (e) {
        console.error('Supabase init failed', e);
        this._supabase = null;
      }
    }
    return this._supabase;
  }

  openSyncModal() {
    document.getElementById('sync-code').value = this.syncCode;
    document.getElementById('sync-disconnect').style.display = this.syncCode ? 'inline-flex' : 'none';
    const nowBtn = document.getElementById('sync-now');
    if (nowBtn) nowBtn.style.display = this.syncCode ? 'inline-flex' : 'none';
    ['habit-day-modal', 'day-modal', 'task-modal', 'subtask-modal', 'routine-modal', 'today-todo-modal'].forEach(id => {
      const m = document.getElementById(id);
      if (m) m.style.display = 'none';
    });
    document.getElementById('sync-modal').style.display = 'flex';
  }

  closeSyncModal() {
    document.getElementById('sync-modal').style.display = 'none';
  }

  setSyncStatus(text, ok) {
    const el = document.getElementById('sync-status');
    if (el) {
      el.textContent = text;
      el.className = 'sync-status' + (ok === true ? ' ok' : ok === false ? ' err' : '');
    }
  }

  updateSyncStatus() {
    const icon = document.getElementById('sync-icon');
    const label = document.getElementById('sync-label');
    if (!this.supabase) {
      if (icon) icon.textContent = '⚠️';
      if (label) label.textContent = '未配置';
      return;
    }
    if (this.syncCode) {
      if (icon) icon.textContent = '✅';
      if (label) label.textContent = '已同步';
    } else {
      if (icon) icon.textContent = '☁️';
      if (label) label.textContent = '未同步';
    }
  }

  async connectSync() {
    const code = document.getElementById('sync-code').value.trim();
    if (!code) { this.setSyncStatus('请输入同步码', false); return; }
    if (!this.supabase) {
      this.setSyncStatus('云端未配置：请按 SUPABASE_SETUP.md 填入 URL 和 key', false);
      alert('云端未配置。请打开 SUPABASE_SETUP.md 按步骤配置 Project URL 和 anon key 后重新部署。');
      return;
    }
    this.syncCode = code;
    localStorage.setItem(SYNC_CODE_KEY, code);
    this.setSyncStatus('正在连接...', null);
    await this.pull();
    this.startAutoSync();
    this.updateSyncStatus();
    document.getElementById('sync-disconnect').style.display = 'inline-flex';
    const nowBtn = document.getElementById('sync-now');
    if (nowBtn) nowBtn.style.display = 'inline-flex';
    this.setSyncStatus('已连接，正在实时同步 ✓', true);
    setTimeout(() => this.closeSyncModal(), 800);
  }

  async syncNow() {
    if (!this.supabase || !this.syncCode) {
      this.setSyncStatus('请先连接同步码', false);
      return;
    }
    this.setSyncStatus('正在同步...', null);
    try {
      await this.push();
      await this.pull();
      this.updateSyncStatus();
      const t = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.setSyncStatus('已同步 ✓ ' + t, true);
    } catch (e) {
      this.setSyncStatus('同步失败：' + (e && e.message ? e.message : e), false);
    }
  }

  disconnectSync() {
    this.stopAutoSync();
    this.syncCode = '';
    localStorage.removeItem(SYNC_CODE_KEY);
    this.updateSyncStatus();
    document.getElementById('sync-disconnect').style.display = 'none';
    const nowBtn = document.getElementById('sync-now');
    if (nowBtn) nowBtn.style.display = 'none';
    this.setSyncStatus('已断开同步', null);
  }

  async autoConnect() {
    if (!this.supabase || !this.syncCode) { this.updateSyncStatus(); return; }
    await this.pull();
    this.startAutoSync();
    this.updateSyncStatus();
  }

  startAutoSync() {
    this.stopAutoSync();
    this._syncTimer = setInterval(() => this.pull(), 15000);
  }

  stopAutoSync() {
    if (this._syncTimer) { clearInterval(this._syncTimer); this._syncTimer = null; }
  }

  schedulePush() {
    if (!this.supabase || !this.syncCode) return;
    clearTimeout(this._pushTimer);
    this._pushTimer = setTimeout(() => this.push(), 1500);
  }

  async push() {
    const client = this.supabase;
    if (!client || !this.syncCode) return;
    const updatedAt = new Date().toISOString();
    const payload = {
      code: this.syncCode,
      data: { tasks: this.tasks, routines: this.routines, todayTodos: this.todayTodos, poopDates: this.poopDates, skincareDates: this.skincareDates, receipts: this.receipts },
      updated_at: updatedAt
    };
    const { error } = await client.from('sync').upsert(payload);
    if (error) { console.warn('push failed', error); return; }
    this._dirty = false;
    this.lastRemoteUpdatedAt = updatedAt;
    localStorage.setItem(SYNC_REMOTE_KEY, updatedAt);
  }

  async pull() {
    const client = this.supabase;
    if (!client || !this.syncCode) return;
    const { data, error } = await client.from('sync').select('*').eq('code', this.syncCode).maybeSingle();
    if (error) { console.warn('pull failed', error); return; }
    if (!data) return;
    // 本地有未同步的修改时，先把它推上去（本地优先），避免被旧云端数据覆盖导致丢失
    if (this._dirty) {
      await this.push();
      return;
    }
    if (!this.lastRemoteUpdatedAt || data.updated_at > this.lastRemoteUpdatedAt) {
      this.applyRemoteData(data.data);
      this.lastRemoteUpdatedAt = data.updated_at;
      localStorage.setItem(SYNC_REMOTE_KEY, data.updated_at);
    }
  }

  applyRemoteData(d) {
    if (!d) return;
    this.tasks = d.tasks || [];
    this.routines = d.routines || [];
    this.todayTodos = d.todayTodos || [];
    this.poopDates = d.poopDates || [];
    this.skincareDates = d.skincareDates || {};
    this.receipts = d.receipts || [];
    this.persistLocal();
    this.renderView();
    this.updateStats();
  }
}

const app = new TaskApp();
