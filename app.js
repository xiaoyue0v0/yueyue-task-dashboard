const STORAGE_KEY = 'yueyue-tasks-v2';
const SYNC_CODE_KEY = 'yueyue-sync-code';
const SYNC_REMOTE_KEY = 'yueyue-last-remote';
const NCM_UID_KEY = 'yueyue-ncm-uid';
const NCM_CACHE_KEY = 'yueyue-ncm-cache';
const PIXEL_MODE_KEY = 'yueyue-pixel-mode';

// Netlify functions 地址：在 Netlify 域名下用相对路径；在 GitHub Pages 等其他托管下用绝对路径（指向已部署的 Netlify 站点）
const NCM_FUNC_BASE = (location.hostname.endsWith('netlify.app') || location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? '/.netlify/functions'
  : 'https://stupendous-speculoos-f67e0f.netlify.app/.netlify/functions';

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

// ===== 像素风图片生成器（手工 24x24 位图，干净 1-bit）=====
const PIXEL_PATTERNS = ['plant', 'hourglass', 'star', 'moon', 'cat', 'coffee', 'cloud', 'flower'];

// 每个图案是 24x24 的位图：' ' = 透明/白，'#' = 黑
const PIXEL_BITMAPS = {
  // 盆栽
  plant: [
    '                        ',
    '           ##           ',
    '          ####          ',
    '          ####          ',
    '         ######         ',
    '         ######         ',
    '        ###  ###        ',
    '        ###  ###        ',
    '        ###  ###        ',
    '        ###  ###        ',
    '       ####  ####       ',
    '       ####  ####       ',
    '       ####  ####       ',
    '        ###  ###        ',
    '        ###  ###        ',
    '        ###  ###        ',
    '        ###  ###        ',
    '       ##########       ',
    '      ############      ',
    '     ##############     ',
    '     ##############     ',
    '     ##############     ',
    '     ##############     ',
    '                        '
  ],
  // 沙漏
  hourglass: [
    '                        ',
    '    ##############      ',
    '    ##############      ',
    '     ############       ',
    '      ##########        ',
    '       ########         ',
    '        ######          ',
    '         ####           ',
    '          ##            ',
    '          ##            ',
    '          ##            ',
    '          ##            ',
    '         ####           ',
    '        ######          ',
    '       ########         ',
    '      ##########        ',
    '     ############       ',
    '    ##############      ',
    '    ##############      ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        '
  ],
  // 五角星（像素版）
  star: [
    '                        ',
    '           ##           ',
    '          ####          ',
    '          ####          ',
    '         ######         ',
    '    ################    ',
    '   ##################   ',
    '   ##################   ',
    '    ################    ',
    '      ####    ####      ',
    '     ######  ######     ',
    '    ################    ',
    '   ##################   ',
    '   ##################   ',
    '    ################    ',
    '     ##############     ',
    '      ############      ',
    '       ##########       ',
    '        ########        ',
    '         ######         ',
    '          ####          ',
    '           ##           ',
    '                        ',
    '                        '
  ],
  // 月亮
  moon: [
    '                        ',
    '       #######          ',
    '     ###########        ',
    '    #############       ',
    '   ###############      ',
    '  #################     ',
    '  #################     ',
    ' ###################    ',
    ' ###################    ',
    ' ###################    ',
    ' ###################    ',
    ' ###################    ',
    ' ###################    ',
    ' ###################    ',
    '  #################     ',
    '  #################     ',
    '   ###############      ',
    '    #############       ',
    '     ###########        ',
    '       #######          ',
    '                        ',
    '                        ',
    '                        ',
    '                        '
  ],
  // 小猫
  cat: [
    '                        ',
    '      ###      ###      ',
    '     #####    #####     ',
    '    #######  #######    ',
    '    ################    ',
    '   ##################   ',
    '   ##################   ',
    '  ####################  ',
    '  ####  ####  ####  ### ',
    '  ####  ####  ####  ### ',
    '  ####################  ',
    '  ####################  ',
    '  ####################  ',
    '   ##################   ',
    '   ##################   ',
    '    ################    ',
    '     ##############     ',
    '      ############      ',
    '       ##########       ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        '
  ],
  // 咖啡杯
  coffee: [
    '                        ',
    '                        ',
    '      ############      ',
    '     ##############     ',
    '     ##############     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ###        ###     ',
    '     ##############     ',
    '      ############      ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        '
  ],
  // 云
  cloud: [
    '                        ',
    '                        ',
    '         ######         ',
    '       ##########       ',
    '      ############      ',
    '     ##############     ',
    '    ################    ',
    '   ##################   ',
    '  ####################  ',
    ' ###################### ',
    '########################',
    '########################',
    ' ###################### ',
    '  ####################  ',
    '   ##################   ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        ',
    '                        '
  ],
  // 花
  flower: [
    '                        ',
    '                        ',
    '       ##      ##       ',
    '      ####    ####      ',
    '     ######  ######     ',
    '     ######  ######     ',
    '      ####    ####      ',
    '       ##      ##       ',
    '     ######  ######     ',
    '    ################    ',
    '   ##################   ',
    '   ##################   ',
    '    ################    ',
    '     ######  ######     ',
    '       ##      ##       ',
    '       ##      ##       ',
    '       ##      ##       ',
    '       ##########       ',
    '        ########        ',
    '         ######         ',
    '          ####          ',
    '                        ',
    '                        ',
    '                        '
  ]
};

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
  const SRC = 24, DST = 96;
  const canvas = document.createElement('canvas');
  canvas.width = DST; canvas.height = DST;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // 1. 在 24x24 离屏 canvas 上画手工位图
  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = SRC; srcCanvas.height = SRC;
  const sx = srcCanvas.getContext('2d');
  sx.fillStyle = '#ffffff'; sx.fillRect(0, 0, SRC, SRC);
  sx.fillStyle = '#1a1a1a';
  const bitmap = PIXEL_BITMAPS[pattern];
  for (let y = 0; y < SRC; y++) {
    const row = bitmap[y] || '';
    for (let x = 0; x < SRC; x++) {
      if (row[x] === '#') sx.fillRect(x, y, 1, 1);
    }
  }

  // 2. 放大到 96x96，保持像素锐利
  ctx.drawImage(srcCanvas, 0, 0, SRC, SRC, 0, 0, DST, DST);

  // 3. 加少量装饰性小点（不碰主体位图，控制数量避免碎）
  ctx.fillStyle = '#1a1a1a';
  const dots = [
    [4, 4], [90, 4], [4, 90], [90, 90],
    [10, 88], [86, 88], [8, 12], [88, 12]
  ];
  dots.forEach(([x, y]) => {
    if (rng() > 0.35) ctx.fillRect(x, y, 2, 2);
  });

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
    this.ncmUid = localStorage.getItem(NCM_UID_KEY) || '';
    this._supabase = null;
    this._pushTimer = null;
    this._syncTimer = null;
    this._dirty = false;
    this.filterCategory = '全部';
    this.filterPriority = '全部';
    this.searchQuery = '';
    this.expandedTasks = new Set();
    this.collapsedCategories = new Set();
    this.currentView = 'today';
    this.recordSub = 'hub';
    // 计划工作台状态
    const savedCat = localStorage.getItem('yueyue-ws-category');
    this.selectedCategoryId = (savedCat && CATEGORIES.includes(savedCat)) ? savedCat : CATEGORIES[1];
    this.workspaceSearchQuery = '';
    this.workspaceFilters = JSON.parse(localStorage.getItem('yueyue-ws-filters') || '{}');
    this.sidebarCollapsed = localStorage.getItem('yueyue-ws-sidebar') === '1';
    this.detailCollapsed = localStorage.getItem('yueyue-ws-detail-collapsed') === '1';
    this.expandedWorkspaceTaskId = null;
    this.filterPopoverOpen = false;
    this.todayFilter = 'all';
    this.todayViewDate = this.todayStr();
    this.todayCalendarMonth = new Date();
    this.todayCalendarCollapsed = localStorage.getItem('yueyue-today-cal-collapsed') === '1';
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
    this.returnDateStr = localStorage.getItem('yueyue-return-date') || '2026-08-24';
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
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeTopModal();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const search = document.getElementById('workspace-search');
        if (search && this.currentView === 'plan') search.focus();
      }
    });
    this.initStickyNote();
    this.initCountdown();
    this.autoConnect();
  }

  // ===== 回城倒数日 =====
  initCountdown() {
    this.renderCountdown();
    // 每分钟刷新一次（跨天自动更新）
    if (this._countdownTimer) clearInterval(this._countdownTimer);
    this._countdownTimer = setInterval(() => this.renderCountdown(), 60 * 1000);
  }

  renderCountdown() {
    const el = document.getElementById('countdown-banner');
    if (!el) return;
    const target = new Date(this.returnDateStr + 'T00:00:00');
    const now = new Date();
    const ms = target.getTime() - now.getTime();
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));

    const dateEl = document.getElementById('countdown-date');
    const numEl = document.getElementById('countdown-days');
    const unitEl = document.getElementById('countdown-unit');
    const textEl = document.getElementById('countdown-text');
    if (!numEl) return;

    if (dateEl) {
      const m = target.getMonth() + 1;
      const d = target.getDate();
      dateEl.textContent = `${m}.${d}`;
    }

    if (days > 0) {
      numEl.textContent = days;
      unitEl.textContent = '天';
      textEl.textContent = '距回城';
      el.classList.remove('past');
    } else if (days === 0) {
      numEl.textContent = '今天';
      unitEl.textContent = '';
      textEl.textContent = '回城日';
      el.classList.remove('past');
    } else {
      numEl.textContent = Math.abs(days);
      unitEl.textContent = '天前';
      textEl.textContent = '已回城';
      el.classList.add('past');
    }
  }

  changeReturnDate() {
    const input = prompt('设置回城日期（格式 YYYY-MM-DD）：', this.returnDateStr);
    if (!input) return;
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(input.trim());
    if (!m) { alert('格式不对，请用 YYYY-MM-DD'); return; }
    const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`);
    if (isNaN(d.getTime())) { alert('日期无效'); return; }
    this.returnDateStr = `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
    localStorage.setItem('yueyue-return-date', this.returnDateStr);
    this.renderCountdown();
  }

  // ===== 悬浮便签纸 =====
  initStickyNote() {
    const root = document.getElementById('sticky-note');
    const toggle = document.getElementById('sticky-toggle');
    const closeBtn = document.getElementById('sticky-close');
    const textarea = document.getElementById('sticky-text');
    if (!root || !toggle || !textarea) return;

    const KEY_TEXT = 'yueyue-sticky-note';
    const KEY_OPEN = 'yueyue-sticky-open';

    // 恢复上次内容
    const saved = localStorage.getItem(KEY_TEXT);
    if (saved != null) textarea.value = saved;
    // 恢复展开/收起状态（默认收起）
    if (localStorage.getItem(KEY_OPEN) === '1') root.classList.remove('collapsed');

    const save = () => { localStorage.setItem(KEY_TEXT, textarea.value); };
    textarea.addEventListener('input', save);

    const open = () => { root.classList.remove('collapsed'); localStorage.setItem(KEY_OPEN, '1'); textarea.focus(); };
    const collapse = () => { root.classList.add('collapsed'); localStorage.setItem(KEY_OPEN, '0'); };
    toggle.addEventListener('click', () => {
      if (root.classList.contains('collapsed')) open(); else collapse();
    });
    if (closeBtn) closeBtn.addEventListener('click', collapse);

    // 拖拽：按住标题栏可移动便签（移动端用 pointer 事件）
    const header = root.querySelector('.sticky-header');
    if (header) {
      let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
      const onDown = (e) => {
        // 点关闭按钮不触发拖拽，也不拦截 click
        if (e.target.closest('.sticky-close')) return;
        dragging = true;
        const rect = root.getBoundingClientRect();
        // 切换为 left/top 定位，避免 right/bottom 冲突
        root.style.left = rect.left + 'px';
        root.style.top = rect.top + 'px';
        root.style.right = 'auto';
        root.style.bottom = 'auto';
        sx = e.clientX; sy = e.clientY; ox = rect.left; oy = rect.top;
        header.setPointerCapture && header.setPointerCapture(e.pointerId);
        e.preventDefault();
      };
      const onMove = (e) => {
        if (!dragging) return;
        let nx = ox + (e.clientX - sx);
        let ny = oy + (e.clientY - sy);
        nx = Math.max(0, Math.min(nx, window.innerWidth - root.offsetWidth));
        ny = Math.max(0, Math.min(ny, window.innerHeight - 40));
        root.style.left = nx + 'px';
        root.style.top = ny + 'px';
      };
      const onUp = () => { dragging = false; };
      header.addEventListener('pointerdown', onDown);
      header.addEventListener('pointermove', onMove);
      header.addEventListener('pointerup', onUp);
      header.addEventListener('pointercancel', onUp);
    }
  }

  getLayoutMode() {
    return window.innerWidth > 1100 ? 'wide' : 'narrow';
  }

  handleResize() {
    const newMode = this.getLayoutMode();
    if (newMode !== this.layoutMode) {
      this.layoutMode = newMode;
      if (this.currentView === 'plan') {
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
    document.body.classList.toggle('plan-active', view === 'plan');
    // 同时高亮顶部标签栏与底部导航栏（共用 data-view 属性）
    document.querySelectorAll('[data-view]').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-view') === view);
    });
    if (view === 'record') this.recordSub = 'hub';
    this.renderView();
  }

  renderView() {
    const viewMap = {
      today: 'today-view',
      plan: 'plan-view',
      record: 'record-view',
      receipt: 'receipt-view',
    };
    Object.keys(viewMap).forEach(v => {
      const el = document.getElementById(viewMap[v]);
      if (el) el.style.display = this.currentView === v ? 'block' : 'none';
    });
    const empty = document.getElementById('empty-state');
    if (empty) empty.style.display = 'none';

    if (this.currentView === 'plan') {
      this.renderWorkspace();
    } else if (this.currentView === 'today') {
      this.renderTodayView();
    } else if (this.currentView === 'record') {
      this.renderRecordView();
    } else if (this.currentView === 'receipt') {
      this.renderReceiptView();
    }
  }

  // ===== 计划工作台（新版三栏布局）=====
  renderWorkspace() {
    this.renderWorkspaceToolbar();
    this.renderWorkspaceCategories();
    this.renderScheduleCalendar(); // 复用现有月/周历渲染
    this.renderWorkspaceDetail();
    this.updateFilterBadge();
  }

  renderWorkspaceToolbar() {
    const titleEl = document.getElementById('workspace-calendar-title');
    if (titleEl) {
      if (this.calendarMode === 'month') {
        const y = this.currentMonth.getFullYear();
        const m = this.currentMonth.getMonth() + 1;
        titleEl.textContent = `${y}年${m}月`;
      } else {
        const start = new Date(this.currentWeekStart);
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        titleEl.textContent = `${this.formatDateSimple(start)} - ${this.formatDateSimple(end)}`;
      }
    }
    const searchInput = document.getElementById('workspace-search');
    if (searchInput && document.activeElement !== searchInput) {
      searchInput.value = this.workspaceSearchQuery;
    }
    document.getElementById('ws-view-month')?.classList.toggle('active', this.calendarMode === 'month');
    document.getElementById('ws-view-week')?.classList.toggle('active', this.calendarMode === 'week');
  }

  renderWorkspaceCategories() {
    const container = document.getElementById('workspace-category-list');
    const sidebar = document.getElementById('workspace-sidebar');
    if (!container || !sidebar) return;

    sidebar.classList.toggle('collapsed', this.sidebarCollapsed);

    const cats = CATEGORIES.slice(1);
    container.innerHTML = cats.map(cat => {
      const tasks = this.tasks.filter(t => t.category === cat);
      const totalSub = tasks.reduce((sum, t) => sum + t.subtasks.length, 0);
      const doneSub = tasks.reduce((sum, t) => sum + t.subtasks.filter(s => s.status === 'done').length, 0);
      const progress = totalSub === 0 ? (tasks.every(t => t.status === 'done') ? 100 : 0) : Math.round(doneSub / totalSub * 100);
      const active = this.selectedCategoryId === cat;

      if (this.sidebarCollapsed) {
        return `
          <button class="workspace-category-card ${active ? 'active' : ''}" onclick="app.selectCategory('${cat}')" title="${cat} · ${tasks.length} 个任务">
            <span class="category-card-icon">${this.categoryIcon(cat)}</span>
          </button>
        `;
      }

      return `
        <button class="workspace-category-card ${active ? 'active' : ''}" onclick="app.selectCategory('${cat}')">
          <span class="category-card-icon">${this.categoryIcon(cat)}</span>
          <span class="category-card-info">
            <div class="category-card-name">${cat}</div>
            <div class="category-card-count">${tasks.length} 个任务 · ${doneSub}/${totalSub || tasks.length} 完成</div>
            <div class="category-card-progress"><div class="category-card-progress-fill" style="width:${progress}%"></div></div>
          </span>
          <span class="category-card-arrow">›</span>
        </button>
      `;
    }).join('');
  }

  renderWorkspaceDetail() {
    const detail = document.getElementById('workspace-detail');
    const header = document.getElementById('workspace-detail-header');
    const focus = document.getElementById('workspace-detail-focus');
    const tasks = document.getElementById('workspace-detail-tasks');
    if (!detail || !header || !focus || !tasks) return;

    // 同步收起状态（避免 localStorage 与 DOM 不一致）
    detail.classList.toggle('collapsed', this.detailCollapsed);

    const cat = this.selectedCategoryId;
    const allCatTasks = this.tasks.filter(t => t.category === cat);
    const filtered = this.getWorkspaceFilteredTasks(allCatTasks);
    const totalSub = allCatTasks.reduce((sum, t) => sum + t.subtasks.length, 0);
    const doneSub = allCatTasks.reduce((sum, t) => sum + t.subtasks.filter(s => s.status === 'done').length, 0);
    const progress = totalSub === 0 ? (allCatTasks.every(t => t.status === 'done') ? 100 : 0) : Math.round(doneSub / totalSub * 100);

    header.innerHTML = `
      <div class="detail-header-top">
        <div class="detail-title-row">
          <span class="detail-icon">${this.categoryIcon(cat)}</span>
          <div class="detail-title-text">
            <h3>${cat}</h3>
            <p>${allCatTasks.length} 个任务 · ${doneSub}/${totalSub || allCatTasks.length} 完成 · 进度 ${progress}%</p>
          </div>
        </div>
        <div class="detail-actions">
          <button title="${detail.classList.contains('collapsed') ? '展开面板' : '折叠面板'}" onclick="app.toggleDetailPanel()">${detail.classList.contains('collapsed') ? '▸' : '▾'}</button>
          <button title="编辑分类" onclick="app.editCategory()">✎</button>
          <button title="更多" onclick="app.openCategoryMenu()">⋮</button>
        </div>
      </div>
    `;

    // 今日重点：选中分类里今天的子任务 / 今日待办相关
    const today = this.todayStr();
    const focusTasks = filtered.filter(t =>
      t.subtasks.some(s => s.date === today && s.status !== 'done') ||
      (t.status !== 'done' && t.subtasks.some(s => s.date === today))
    ).slice(0, 3);

    if (focusTasks.length === 0) {
      focus.innerHTML = `
        <div class="detail-section-title"><span>今日重点</span></div>
        <div class="detail-empty">
          今天还没有重点任务<br>
          <button onclick="app.openTaskModalForSelectedCategory()">+ 添加今日重点</button>
        </div>
      `;
    } else {
      focus.innerHTML = `
        <div class="detail-section-title"><span>今日重点</span><span>${focusTasks.length}</span></div>
        ${focusTasks.map(t => this.renderCompactTaskRow(t)).join('')}
      `;
    }

    // 全部任务
    const sorted = [...filtered].sort((a, b) => {
      const order = { 'P0': 0, 'P1': 1, 'P2': 2 };
      const pa = order[a.priority] ?? 3;
      const pb = order[b.priority] ?? 3;
      if (pa !== pb) return pa - pb;
      return (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0);
    });

    tasks.innerHTML = `
      <div class="detail-section-title"><span>全部任务</span><span>${sorted.length}</span></div>
      ${sorted.length === 0 ? '<div class="detail-empty">没有匹配的任务</div>' : sorted.map(t => this.renderCompactTaskRow(t)).join('')}
    `;
  }

  renderCompactTaskRow(task) {
    const total = task.subtasks.length;
    const done = task.subtasks.filter(s => s.status === 'done').length;
    const progress = total === 0 ? (task.status === 'done' ? 100 : 0) : Math.round(done / total * 100);
    const isExpanded = this.expandedWorkspaceTaskId === task.id;
    const today = this.todayStr();
    const hasToday = task.subtasks.some(s => s.date === today);
    const dateText = hasToday ? '今天' : (task.subtasks.find(s => s.date)?.date || '未排期');

    return `
      <div class="compact-task-row ${isExpanded ? 'expanded' : ''}" onclick="app.toggleWorkspaceTaskExpand('${task.id}')">
        <div class="compact-task-checkbox ${task.status === 'done' ? 'checked' : ''}" onclick="event.stopPropagation(); app.toggleTaskStatus('${task.id}')">
          ${task.status === 'done' ? '✓' : ''}
        </div>
        <div class="compact-task-main">
          <div class="compact-task-title ${task.status === 'done' ? 'done' : ''}">${this.escapeHtml(task.title)}</div>
          <div class="compact-task-meta">
            <span class="ws-tag ws-tag-${task.priority.toLowerCase()}">${task.priority}</span>
            <span class="ws-tag ws-tag-${task.status}">${this.statusText(task.status)}</span>
            <span>${progress}% · ${done}/${total || 1} 完成</span>
          </div>
        </div>
        <div class="compact-task-date">${dateText}</div>
        <div class="compact-task-actions" onclick="event.stopPropagation()">
          <button title="编辑" onclick="app.openTaskModal('${task.id}')">✎</button>
          <button title="删除" onclick="app.deleteTask('${task.id}')">🗑</button>
        </div>
        ${isExpanded ? this.renderCompactTaskExpand(task) : ''}
      </div>
    `;
  }

  renderCompactTaskExpand(task) {
    const subHtml = task.subtasks.map(sub => `
      <div class="subtask-item" draggable="true" ondragstart="app.handleDragStart(event, '${task.id}', '${sub.id}')" ondragend="app.handleDragEnd(event)">
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
      <div class="compact-task-expand" onclick="event.stopPropagation()">
        ${task.notes ? `<div class="task-notes" style="margin-bottom:10px;">${this.escapeHtml(task.notes)}</div>` : ''}
        <div class="subtask-list">
          ${subHtml || '<div style="color:var(--text-secondary);font-size:13px;">暂无子任务</div>'}
        </div>
        <button class="add-subtask" onclick="app.openSubtaskModal('${task.id}')">+ 添加子任务</button>
      </div>
    `;
  }

  selectCategory(cat) {
    this.selectedCategoryId = cat;
    localStorage.setItem('yueyue-ws-category', cat);
    this.expandedWorkspaceTaskId = null;
    this.renderWorkspaceCategories();
    this.renderWorkspaceDetail();
    // 在移动端打开右侧抽屉
    const detail = document.getElementById('workspace-detail');
    if (detail && window.innerWidth <= 1024) detail.classList.add('open');
  }

  toggleSidebarCollapsed() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem('yueyue-ws-sidebar', this.sidebarCollapsed ? '1' : '0');
    this.renderWorkspaceCategories();
  }

  toggleWorkspaceTaskExpand(taskId) {
    this.expandedWorkspaceTaskId = this.expandedWorkspaceTaskId === taskId ? null : taskId;
    this.renderWorkspaceDetail();
  }

  handleWorkspaceSearch(query) {
    this.workspaceSearchQuery = query.trim().toLowerCase();
    this.renderWorkspaceDetail();
  }

  toggleFilterPopover(event) {
    event && event.stopPropagation();
    const popover = document.getElementById('filter-popover');
    const btn = document.getElementById('workspace-filter-btn');
    if (!popover || !btn) return;

    this.filterPopoverOpen = !this.filterPopoverOpen;
    popover.style.display = this.filterPopoverOpen ? 'block' : 'none';
    btn.setAttribute('aria-expanded', this.filterPopoverOpen ? 'true' : 'false');

    if (this.filterPopoverOpen) {
      this.renderFilterPopover();
      const rect = btn.getBoundingClientRect();
      popover.style.top = (rect.bottom + 8) + 'px';
      popover.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
      const close = (e) => { if (!popover.contains(e.target) && e.target !== btn) { this.closeFilterPopover(); document.removeEventListener('click', close); } };
      setTimeout(() => document.addEventListener('click', close), 0);
    }
  }

  closeFilterPopover() {
    this.filterPopoverOpen = false;
    const popover = document.getElementById('filter-popover');
    const btn = document.getElementById('workspace-filter-btn');
    if (popover) popover.style.display = 'none';
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  renderFilterPopover() {
    const filters = this.workspaceFilters;
    const catContainer = document.getElementById('ws-filter-categories');
    const priContainer = document.getElementById('ws-filter-priorities');
    const statusContainer = document.getElementById('ws-filter-status');
    const dateContainer = document.getElementById('ws-filter-dates');

    if (catContainer) {
      catContainer.innerHTML = CATEGORIES.map(cat => `
        <button class="${filters.category === cat ? 'active' : ''}" onclick="app.setWorkspaceFilter('category', '${cat}')">${cat}</button>
      `).join('');
    }
    if (priContainer) {
      priContainer.innerHTML = PRIORITIES.map(pri => `
        <button class="${filters.priority === pri ? 'active' : ''}" onclick="app.setWorkspaceFilter('priority', '${pri}')">${pri}</button>
      `).join('');
    }
    if (statusContainer) {
      const statuses = [{k:'全部',v:'all'}, {k:'待办',v:'todo'}, {k:'进行中',v:'doing'}, {k:'已完成',v:'done'}];
      statusContainer.innerHTML = statuses.map(s => `
        <button class="${filters.status === s.v ? 'active' : ''}" onclick="app.setWorkspaceFilter('status', '${s.v}')">${s.k}</button>
      `).join('');
    }
    if (dateContainer) {
      const dates = [{k:'全部',v:'all'}, {k:'有截止日期',v:'dated'}, {k:'今日重点',v:'today'}];
      dateContainer.innerHTML = dates.map(d => `
        <button class="${filters.dateRange === d.v ? 'active' : ''}" onclick="app.setWorkspaceFilter('dateRange', '${d.v}')">${d.k}</button>
      `).join('');
    }
  }

  setWorkspaceFilter(key, value) {
    const filters = this.workspaceFilters;
    if ((key === 'category' && value === '全部') ||
        (key === 'priority' && value === '全部') ||
        ((key === 'status' || key === 'dateRange') && value === 'all')) {
      delete filters[key];
    } else {
      filters[key] = value;
    }
    localStorage.setItem('yueyue-ws-filters', JSON.stringify(filters));
    this.renderFilterPopover();
    this.renderWorkspaceDetail();
    this.updateFilterBadge();
  }

  clearWorkspaceFilters() {
    this.workspaceFilters = {};
    localStorage.setItem('yueyue-ws-filters', '{}');
    this.renderFilterPopover();
    this.renderWorkspaceDetail();
    this.updateFilterBadge();
  }

  updateFilterBadge() {
    const badge = document.getElementById('workspace-filter-badge');
    if (!badge) return;
    const count = Object.keys(this.workspaceFilters).length;
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }

  getWorkspaceFilteredTasks(tasks) {
    const q = this.workspaceSearchQuery;
    const f = this.workspaceFilters;
    const today = this.todayStr();
    return tasks.filter(t => {
      if (f.category && f.category !== '全部' && t.category !== f.category) return false;
      if (f.priority && f.priority !== '全部' && t.priority !== f.priority) return false;
      if (f.status && f.status !== 'all' && t.status !== f.status) return false;
      if (f.dateRange === 'dated' && !t.subtasks.some(s => s.date)) return false;
      if (f.dateRange === 'today' && !t.subtasks.some(s => s.date === today)) return false;
      if (!q) return true;
      return t.title.toLowerCase().includes(q) ||
             t.notes.toLowerCase().includes(q) ||
             t.subtasks.some(s => s.title.toLowerCase().includes(q));
    });
  }

  openTaskModalForSelectedCategory() {
    this.openTaskModal(null, this.selectedCategoryId);
  }

  addCategory() {
    const name = prompt('请输入新分类名称：');
    if (!name || !name.trim()) return;
    const cat = name.trim();
    if (CATEGORIES.includes(cat)) {
      alert('该分类已存在');
      return;
    }
    CATEGORIES.push(cat);
    this.selectCategory(cat);
    this.saveData();
    this.renderWorkspace();
  }

  editCategory() {
    const oldName = this.selectedCategoryId;
    const newName = prompt('修改分类名称：', oldName);
    if (!newName || newName.trim() === '' || newName.trim() === oldName) return;
    const name = newName.trim();
    if (CATEGORIES.includes(name)) { alert('分类已存在'); return; }
    const idx = CATEGORIES.indexOf(oldName);
    if (idx > -1) CATEGORIES[idx] = name;
    this.tasks.forEach(t => { if (t.category === oldName) t.category = name; });
    this.selectedCategoryId = name;
    localStorage.setItem('yueyue-ws-category', name);
    this.saveData();
    this.renderWorkspace();
  }

  openCategoryMenu() {
    if (confirm(`确定删除分类「${this.selectedCategoryId}」吗？该分类下的任务不会被删除，但会变为未分类。`)) {
      const idx = CATEGORIES.indexOf(this.selectedCategoryId);
      if (idx > -1) CATEGORIES.splice(idx, 1);
      this.selectedCategoryId = CATEGORIES[1] || CATEGORIES[0] || '全部';
      localStorage.setItem('yueyue-ws-category', this.selectedCategoryId);
      this.saveData();
      this.renderWorkspace();
    }
  }

  toggleDetailPanel() {
    const detail = document.getElementById('workspace-detail');
    if (!detail) return;
    if (window.innerWidth <= 1024) {
      detail.classList.remove('open');
    } else {
      const willCollapse = !detail.classList.contains('collapsed');
      detail.classList.toggle('collapsed');
      this.detailCollapsed = willCollapse;
      localStorage.setItem('yueyue-ws-detail-collapsed', willCollapse ? '1' : '0');
      this.renderWorkspaceDetail();
    }
  }

  expandDetailPanel() {
    const detail = document.getElementById('workspace-detail');
    if (!detail) return;
    detail.classList.remove('collapsed');
    this.detailCollapsed = false;
    localStorage.setItem('yueyue-ws-detail-collapsed', '0');
    this.renderWorkspaceDetail();
  }

  goToTodayCalendar() {
    this.currentMonth = new Date();
    this.currentWeekStart = this.getWeekStart(new Date());
    this.renderWorkspace();
  }

  openSettingsMenu() {
    alert('设置菜单：可在此管理导出备份、导入备份、云端同步、网易云音乐等。\n当前版本：v40');
  }

  toggleTaskStatus(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;
    task.status = task.status === 'done' ? 'todo' : 'done';
    if (task.status === 'done') task.subtasks.forEach(s => s.status = 'done');
    this.saveData();
    this.renderWorkspace();
    this.updateStats();
    this.syncIfNeeded();
  }

  // ===== 记录页（hub / 护肤 / 拉粑粑）=====
  renderRecordView() {
    const hub = document.getElementById('record-hub');
    const sk = document.getElementById('record-skincare');
    const po = document.getElementById('record-poop');
    if (hub) hub.style.display = this.recordSub === 'hub' ? 'block' : 'none';
    if (sk) sk.style.display = this.recordSub === 'skincare' ? 'block' : 'none';
    if (po) po.style.display = this.recordSub === 'poop' ? 'block' : 'none';
    this.updateRecordCardStats();
    if (this.recordSub === 'hub') {
      this.renderRoutines();
      this.renderHabitCalendar();
    } else if (this.recordSub === 'skincare') {
      this.renderSkincareView();
    } else if (this.recordSub === 'poop') {
      this.renderPoopView();
    }
  }

  openRecordModule(module) {
    this.recordSub = module;
    this.renderRecordView();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  openRecordHub() {
    this.recordSub = 'hub';
    this.renderRecordView();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  updateRecordCardStats() {
    const skSub = document.getElementById('record-card-skincare-sub');
    const poSub = document.getElementById('record-card-poop-sub');
    // 护肤：本月护肤天数
    if (skSub) {
      const y = this.skincareMonth ? this.skincareMonth.getFullYear() : new Date().getFullYear();
      const m = this.skincareMonth ? this.skincareMonth.getMonth() : new Date().getMonth();
      const dates = Object.keys(this.skincareDates || {});
      const monthApply = dates.filter(d => {
        const p = d.split('-').map(Number);
        return p[0] === y && p[1] - 1 === m && this.skincareDates[d].apply;
      }).length;
      skSub.textContent = monthApply > 0 ? `本月已护肤 ${monthApply} 天` : '记录每日护肤';
    }
    // 拉粑粑：当前连续天数
    if (poSub) {
      const today = this.todayStr();
      let streak = 0;
      let cursor = today;
      while (this.poopDates.includes(cursor)) {
        streak++;
        cursor = this.shiftDate(cursor, -1);
      }
      poSub.textContent = streak > 0 ? `已连续 ${streak} 天` : '记录每日打卡';
    }
  }

  // Calendar mode
  setCalendarView(mode) {
    this.calendarMode = mode;
    document.getElementById('view-month')?.classList.toggle('active', mode === 'month');
    document.getElementById('view-week')?.classList.toggle('active', mode === 'week');
    document.getElementById('ws-view-month')?.classList.toggle('active', mode === 'month');
    document.getElementById('ws-view-week')?.classList.toggle('active', mode === 'week');
    if (this.currentView === 'plan') {
      this.renderWorkspace();
    } else {
      this.renderScheduleCalendar();
    }
  }

  navigateCalendar(delta) {
    if (this.calendarMode === 'month') {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
      this.currentMonth = new Date(this.currentMonth);
    } else {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() + delta * 7);
      this.currentWeekStart = new Date(this.currentWeekStart);
    }
    if (this.currentView === 'plan') {
      this.renderWorkspace();
    } else {
      this.renderScheduleCalendar();
    }
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
    const titleText = `${year}年${month + 1}月`;
    const titleEl = document.getElementById('calendar-title');
    if (titleEl) titleEl.textContent = titleText;
    const wsTitle = document.getElementById('workspace-calendar-title');
    if (wsTitle) wsTitle.textContent = titleText;

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
      // 未完成的排前面，这样格子顶部直接看到待办
      daySubtasks.sort((a, b) => (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0));
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
    const titleText = `${this.formatDateSimple(start)} - ${this.formatDateSimple(end)}`;
    const titleEl = document.getElementById('calendar-title');
    if (titleEl) titleEl.textContent = titleText;
    const wsTitle = document.getElementById('workspace-calendar-title');
    if (wsTitle) wsTitle.textContent = titleText;

    let html = '<div class="week-view">';
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = this.dateToStr(date);
      const isToday = dateStr === this.todayStr();
      const daySubtasks = this.getSubtasksByDate(dateStr);
      // 未完成的排前面
      daySubtasks.sort((a, b) => (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0));

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
    const body = document.getElementById('today-cal-body');
    const title = document.getElementById('today-cal-title');
    const toggle = document.getElementById('today-cal-toggle');
    if (!container || !body) return;

    const year = this.todayCalendarMonth.getFullYear();
    const month = this.todayCalendarMonth.getMonth();
    if (title) title.textContent = `${year}年${month + 1}月`;
    if (toggle) toggle.textContent = this.todayCalendarCollapsed ? '▸' : '▾';
    container.classList.toggle('collapsed', this.todayCalendarCollapsed);

    if (this.todayCalendarCollapsed) {
      body.innerHTML = '';
      return;
    }

    const firstDay = new Date(year, month, 1);
    const start = new Date(firstDay);
    start.setDate(start.getDate() - firstDay.getDay());
    const today = this.todayStr();
    const selected = this.todayViewDate;

    let html = `<div class="today-cal-nav-row">
      <button class="today-cal-nav" onclick="event.stopPropagation(); app.changeTodayCalendarMonth(-1)">‹</button>
      <button class="today-cal-nav" onclick="event.stopPropagation(); app.changeTodayCalendarMonth(1)">›</button>
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
    body.innerHTML = html;
  }

  toggleTodayCalendar() {
    this.todayCalendarCollapsed = !this.todayCalendarCollapsed;
    localStorage.setItem('yueyue-today-cal-collapsed', this.todayCalendarCollapsed ? '1' : '0');
    this.renderTodayCalendar();
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

    container.innerHTML = subtasks.map(s => {
      const parentTask = this.tasks.find(t => t.id === s.taskId);
      const catClass = parentTask ? `cat-${parentTask.category}` : '';
      return `
      <div class="today-item ${s.status === 'done' ? 'done' : ''}" onclick="app.openSubtaskModal('${s.taskId}', '${s.id}')">
        <div class="today-item-checkbox ${s.status === 'done' ? 'checked' : ''}" onclick="event.stopPropagation(); app.toggleSubtask('${s.taskId}', '${s.id}')">
          ${s.status === 'done' ? '✓' : ''}
        </div>
        <div class="today-item-content">
          <div class="today-item-title">${this.escapeHtml(s.title)}</div>
          <div class="today-item-meta">
            <span class="today-item-tag today-tag-parent ${catClass}">${this.escapeHtml(s.taskTitle)}</span>
          </div>
        </div>
        <div class="today-item-actions" onclick="event.stopPropagation()">
          <button class="icon-btn" title="编辑" onclick="app.openSubtaskModal('${s.taskId}', '${s.id}')">✏️</button>
          <button class="icon-btn" title="删除" onclick="app.deleteSubtask('${s.taskId}', '${s.id}')">🗑️</button>
        </div>
      </div>
      `;
    }).join('');
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
    this.renderTodayView();
    this.updateStats();
  }

  // ===== 顺延：未完成项转到明天 =====
  deferToTomorrow() {
    const today = this.todayViewDate;
    // 计算明天的日期字符串
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    const tomorrow = this.dateToStr(d);

    // 1. 今日限定（todayTodos）：未完成的改日期到明天
    const deferredTodos = this.todayTodos.filter(t => t.date === today && t.status !== 'done');
    deferredTodos.forEach(t => { t.date = tomorrow; });

    // 2. 今日子任务：未完成的改日期到明天
    const todaySubtasks = this.getSubtasksByDate(today);
    const deferredSubs = todaySubtasks.filter(s => s.status !== 'done');
    deferredSubs.forEach(s => {
      const task = this.tasks.find(t => t.id === s.taskId);
      if (task) {
        const sub = task.subtasks.find(sub => sub.id === s.id);
        if (sub) sub.date = tomorrow;
      }
    });

    const total = deferredTodos.length + deferredSubs.length;
    if (total === 0) {
      alert('今天没有未完成的事项可以顺延');
      return;
    }

    this.saveData();

    // 刷新所有相关视图
    this.renderTodayView();
    this.updateStats();
    this.renderScheduleCalendar();
    this.renderWorkspaceDetail();

    // 自动跳到明天查看
    this.setTodayViewDate(tomorrow);

    const parts = [];
    if (deferredTodos.length > 0) parts.push(`${deferredTodos.length} 个今日限定`);
    if (deferredSubs.length > 0) parts.push(`${deferredSubs.length} 个子任务`);
    // 轻量提示，不用 alert 阻塞
    const toast = document.createElement('div');
    toast.textContent = `✅ 已顺延 ${parts.join('、')} 到 ${tomorrow}`;
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:10px;font-size:14px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.25);animation:fadeInUp .3s ease';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity .3s'; setTimeout(() => toast.remove(), 300); }, 2000);
  }

  // ===== 每日小票 =====

  // 根据当天实际完成内容生成一句综合点评（非固定预设，随任务构成变化）
  generateDailyReview(date, { routineDone, limitedDone, subDone, poopDone, skincareItems, rate, totalItems }) {
    const seed = hashString(date + '|' + (totalItems || 0) + '|' + (rate || 0));
    const pick = (arr, salt = 0) => arr[(seed + salt) % arr.length];

    const cats = [];
    if (routineDone.length) cats.push('每日必做');
    if (limitedDone.length) cats.push('今日限定');
    if (subDone.length) cats.push('子任务');
    if (poopDone) cats.push('拉粑粑');
    if (skincareItems.length) cats.push('护肤');

    if (cats.length === 0) {
      return pick([
        '今天还没有留下任何完成记录。哪怕只做一件小事，这张小票也会更有分量。',
        '今日暂无完成项，但空白也是记录的一部分。明天从一个微小动作开始吧。',
        '今天的小票暂时是空白的——给自己一个起点，明天就会顺利很多。'
      ]);
    }

    // 第一句：基于完成率/数量的开场
    let first = '';
    if (rate >= 100) {
      first = pick([
        '今日完成率 100%，所有事项都顺利打勾，状态拉满。',
        '全部任务清空！今天的执行力值得这张完整的小票。',
        '100% 完成——今天的节奏很舒服，继续保持。'
      ]);
    } else if (rate >= 70) {
      first = pick([
        `今天完成了 ${rate}% 的任务，节奏不错，大部分目标都已落地。`,
        `完成率 ${rate}%，主要事项都推进了，剩下的交给明天。`,
        `今日进度 ${rate}%，稳扎稳打，已经赢下大部分。`
      ]);
    } else if (rate >= 40) {
      first = pick([
        `今天完成了 ${rate}% 的任务，有推进也有留白，明天补上。`,
        `完成率 ${rate}%，做了该做的，也还有空间可以继续。`,
        `今日进度 ${rate}%——不必着急，每一步都算数。`
      ]);
    } else if (totalItems > 0) {
      first = pick([
        `今天完成了 ${totalItems} 件事，虽然不多，但已经开始。`,
        `今日先拿下 ${totalItems} 项，小有进展就是好信号。`,
        `完成了 ${totalItems} 件事，先动起来，后面会越来越顺。`
      ]);
    } else {
      first = pick([
        '今天还没留下完成记录，哪怕一件小事也值得被记录。',
        '今日暂无完成项，给自己一个最小行动，明天再来开票。',
        '今天的小票还是空白的，但从现在开始也不晚。'
      ]);
    }

    // 第二句：从「分类概览 / 具体任务 / 特殊组合」中选一个
    const notableTasks = [
      ...routineDone.map(i => i.title),
      ...limitedDone.map(i => i.title),
      ...subDone.map(s => s.title)
    ];

    const secondOptions = [];

    // 分类概览
    if (cats.length === 1) {
      secondOptions.push(
        `其中「${cats[0]}」有记录，是今天的主力。`,
        `今天的亮点在${cats[0]}这一项。`,
        `${cats[0]}是今日唯一留下痕迹的板块。`
      );
    } else if (cats.length === 2) {
      secondOptions.push(
        `${cats.join('和')}都留下了记录，分布很均衡。`,
        `今天在${cats[0]}、${cats[1]}上都有动作。`,
        `${cats.join('、')}两个板块都打卡了。`
      );
    } else if (cats.length >= 3) {
      secondOptions.push(
        `${cats.slice(0, -1).join('、')}和${cats[cats.length - 1]}都有涉及，今天很丰富。`,
        `多个板块都有进展：${cats.join('、')}。`,
        `今天横跨${cats.join('、')}，是一张内容很满的小票。`
      );
    }

    // 具体任务点名
    if (notableTasks.length) {
      const task = notableTasks[seed % notableTasks.length];
      secondOptions.push(
        `尤其「${task}」这项值得标记一下。`,
        `其中「${task}」的完成让今天更扎实。`,
        `「${task}」这项落袋，是今天的一个小胜利。`
      );
    }

    // 特殊组合
    if (skincareItems.length >= 2) {
      secondOptions.push(
        `护肤连续记录了 ${skincareItems.length} 项，状态在线。`,
        `今天护肤很认真，${skincareItems.length} 项都照顾到了。`
      );
    }
    if (poopDone && skincareItems.length) {
      secondOptions.push(
        '身体管理和护肤都照顾到，是认真生活的一天。',
        '护肤和拉粑粑都记录了，基础护理到位。'
      );
    }
    if (routineDone.length && limitedDone.length && !subDone.length && !skincareItems.length && !poopDone) {
      secondOptions.push(
        '日常和限时任务都推进了，结构很清晰。',
        '基础任务和限定任务都没落下，节奏稳。'
      );
    }

    const second = secondOptions.length ? pick(secondOptions, 7) : '';
    return second ? `${first} ${second}` : first;
  }

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

    this._viewingReceiptDate = date;

    // 数据行：按大标题分组（每日必做 / 今日限定 / 今日子任务 / 拉粑粑记录 / 护肤记录）
    const poopDone = this.poopDates.includes(date) ? 1 : 0;
    const skincareDay = this.skincareDates[date] || {};
    const skincareItems = [];
    SKINCARE_CATEGORIES.forEach(c => {
      if (skincareDay[c.key]) skincareItems.push({ label: c.label, value: '✓' });
    });

    const groups = [];
    if (routineDone.length) {
      groups.push({ title: '每日必做', items: routineDone.map(i => ({ label: i.title, qty: 1 })) });
    }
    if (limitedDone.length) {
      groups.push({ title: '今日限定', items: limitedDone.map(i => ({ label: i.title, qty: 1 })) });
    }
    if (subDone.length) {
      groups.push({ title: '今日子任务', items: subDone.map(s => ({ label: s.title, qty: 1 })) });
    }
    groups.push({
      title: '拉粑粑记录',
      items: [{ label: poopDone ? '已记录' : '未记录', qty: poopDone ? 1 : 0 }]
    });
    if (skincareItems.length) {
      groups.push({ title: '护肤记录', items: skincareItems.map(i => ({ label: i.label, qty: 1 })) });
    }

    // 今日未完成：任务类（每日必做 / 今日限定 / 子任务）里未完成的项
    const undoneRoutine = this.buildRoutineItems(date).filter(i => !i.done);
    const undoneLimited = this.buildLimitedItems(this.getTodayTodos(date)).filter(i => !i.done);
    const undoneSub = this.getSubtasksByDate(date).filter(s => s.status !== 'done');
    const hasUndone = undoneRoutine.length || undoneLimited.length || undoneSub.length;
    if (hasUndone) {
      const undoneItems = [
        ...undoneRoutine.map(i => ({ label: i.title, qty: 0, undone: true })),
        ...undoneLimited.map(i => ({ label: i.title, qty: 0, undone: true })),
        ...undoneSub.map(s => ({ label: s.title, qty: 0, undone: true }))
      ];
      groups.push({ title: '今日未完成', type: 'undone', items: undoneItems });
    }

    const hasAnyActivity = routineDone.length || limitedDone.length || subDone.length || poopDone || skincareItems.length || hasUndone;
    let d = 0;
    const nextDelay = () => `${360 + d++ * 60}ms`;
    let lineNo = 0;
    const countedGroups = groups.filter(g => g.type !== 'undone');
    const totalQty = countedGroups.reduce((sum, g) => sum + g.items.reduce((s, i) => s + (i.qty || 0), 0), 0);
    const totalLines = countedGroups.reduce((sum, g) => sum + g.items.length, 0);

    const itemsHtml = !hasAnyActivity
      ? '<div class="receipt-empty">今日暂无完成记录 🥲<br>做一件小事，再回来开票吧～</div>'
      : groups.map(g => `
        <div class="receipt-group">
          <div class="receipt-group-title" style="animation-delay:${nextDelay()}">${g.title}</div>
          <div class="receipt-group-items">
            ${g.items.map(item => {
              if (g.type === 'undone') {
                return `
                <div class="receipt-row-data receipt-row-sub receipt-undone" style="animation-delay:${nextDelay()}">
                  <span class="receipt-row-box">□</span>
                  <span class="receipt-row-label">${this.escapeHtml(item.label)}</span>
                  <span class="receipt-row-dots"></span>
                  <span class="receipt-row-value"></span>
                </div>`;
              }
              const num = String(++lineNo).padStart(2, '0');
              const val = item.qty > 0 ? `x${item.qty}` : '-';
              return `
              <div class="receipt-row-data receipt-row-sub" style="animation-delay:${nextDelay()}">
                <span class="receipt-row-num">${num}</span>
                <span class="receipt-row-label">${this.escapeHtml(item.label)}</span>
                <span class="receipt-row-dots"></span>
                <span class="receipt-row-value">${val}</span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      `).join('') + `
        <div class="receipt-totals" style="animation-delay:${nextDelay()}">
          <div class="receipt-row-data receipt-row-sub receipt-total-row">
            <span class="receipt-row-label">${totalLines} items recorded</span>
            <span class="receipt-row-dots"></span>
            <span class="receipt-row-value"></span>
          </div>
          <div class="receipt-row-data receipt-row-sub receipt-total-row">
            <span class="receipt-row-label">tasks ${totalItems}/${allTotal} · ${rate}% completion</span>
            <span class="receipt-row-dots"></span>
            <span class="receipt-row-value"></span>
          </div>
        </div>
      `;

    document.getElementById('receipt-date-display').textContent = mmdd;
    document.getElementById('receipt-date-label').textContent = `Daily Receipt ${mmddDash}`;
    document.getElementById('receipt-meta-weekday').textContent = `${enWeekdays[dateObj.getDay()]}, ${enMonth[dateObj.getMonth()]} ${dateObj.getDate()}, ${yyyy}`;
    document.getElementById('receipt-meta-order').textContent = 'ORDER ' + orderId;
    document.getElementById('receipt-date').textContent = dateLabel + (isToday ? ' · 今日' : '');
    document.getElementById('receipt-body').innerHTML = itemsHtml;

    const review = this.generateDailyReview(date, { routineDone, limitedDone, subDone, poopDone: !!poopDone, skincareItems, rate, totalItems });
    const reviewEl = document.getElementById('receipt-review');
    if (reviewEl) reviewEl.textContent = review;

    document.getElementById('receipt-barcode').innerHTML = this.barcodeSvg(date);
    document.getElementById('receipt-modal').style.display = 'flex';
    // 播放打印音效
    this.playPrinterSound();
    // 初始化当前小票音乐状态，并渲染收藏按钮（等待异步封面）
    this._currentReceiptMusic = { date, song: null, pixelUrl: null };
    this._updateReceiptFavoriteButtons(date);
    // 异步加载「今日歌曲」封面 + 歌词（不阻塞小票弹出）
    this.renderReceiptMusic(date);
  }

  closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
  }

  isReceiptCollected(date) {
    const targetDate = date || (this._currentReceiptMusic && this._currentReceiptMusic.date) || this.todayStr();
    return this.receipts.some(r => r.date === targetDate);
  }

  _updateReceiptFavoriteButtons(date) {
    const actions = document.getElementById('receipt-actions');
    const btn = document.getElementById('receipt-favorite-btn');
    if (!actions || !btn) return;
    actions.style.display = 'flex';
    const targetDate = date || (this._currentReceiptMusic && this._currentReceiptMusic.date) || this.todayStr();
    const collected = this.isReceiptCollected(targetDate);
    if (collected) {
      btn.textContent = '已加入收藏夹';
      btn.classList.add('collected');
      btn.disabled = true;
    } else {
      btn.textContent = '加入收藏夹';
      btn.classList.remove('collected');
      btn.disabled = false;
    }
  }

  async addReceiptToCollection() {
    const music = this._currentReceiptMusic;
    if (!music || !music.date) return;
    if (!this.ncmUid) {
      alert('还没有设置网易云 UID，先去右上角 🎵 设置吧～');
      return;
    }
    // 如果当前没有歌曲信息或像素封面，重新获取
    let song = music.song;
    let pixelUrl = music.pixelUrl;
    if (!song) {
      song = await this.getSongOfDay(music.date);
      if (!song) { alert('读取歌曲失败，请检查网易云 UID 或网络'); return; }
    }
    if (!pixelUrl) {
      const proxied = this.buildProxiedCoverUrl(song.coverUrl);
      pixelUrl = await this.pixelateCover(proxied, 80, this._getPixelMode());
    }
    // 去重：同一日期只保留一条
    this.receipts = this.receipts.filter(r => r.date !== music.date);
    this.receipts.push({
      date: music.date,
      pixelUrl: pixelUrl || '',
      pixelMode: this._getPixelMode(),
      coverUrl: (song && song.coverUrl) || '',
      songName: song.name,
      artist: song.artist,
      songId: song.id,
      order: this.receipts.length
    });
    this.saveData();
    this._updateReceiptFavoriteButtons(music.date);
    if (this.currentView === 'receipt') this.renderReceiptView();
  }

  removeReceiptFromCollection(date) {
    if (!date) return;
    this.receipts = this.receipts.filter(r => r.date !== date);
    this.saveData();
    if (this.currentView === 'receipt') this.renderReceiptView();
    if (this._currentReceiptMusic && this._currentReceiptMusic.date === date) {
      this._updateReceiptFavoriteButtons(date);
    }
  }

  // 将小票导出为 PNG
  // 关键：直接捕获屏幕上正在显示的小票（导出时它一定可见），
  // 不用离屏克隆——dom-to-image 用 SVG <foreignObject> 渲染，离屏定位
  // 在移动端浏览器会把内容画到可视区外导致空白 PNG（老方案的坑）。
  async exportReceiptPng() {
    if (typeof domtoimage === 'undefined') {
      alert('导出组件还没准备好，请刷新页面后再试～');
      return;
    }
    const paper = document.querySelector('.receipt-paper');
    if (!paper) return;

    // 等字体加载完成再导出，避免文字渲染不完整
    if (document.fonts) {
      try { await document.fonts.ready; } catch (e) {}
    }

    // 临时隐藏导出不需要的 UI（直接隐藏，而非克隆移除）
    const hideSelectors = ['.receipt-close', '.receipt-actions', '.receipt-music-mode', '.receipt-music-refresh'];
    const hiddenEls = [];
    hideSelectors.forEach(sel => {
      paper.querySelectorAll(sel).forEach(el => {
        const prev = el.style.display;
        el.style.display = 'none';
        hiddenEls.push({ el, prev });
      });
    });

    // 记下面板与祖先的原始样式（导出后还原）
    const prevStyle = {
      animation: paper.style.animation,
      width: paper.style.width,
      maxWidth: paper.style.maxWidth,
      boxShadow: paper.style.boxShadow,
      transform: paper.style.transform,
      fontFamily: paper.style.fontFamily,
    };
    const sheet = paper.closest('.receipt-sheet');
    const prevSheet = sheet ? { perspective: sheet.style.perspective, transform: sheet.style.transform } : null;

    // 取消开场动画（避免 clip-path 残留），固定宽度保证完整不截断
    paper.style.animation = 'none';
    paper.style.width = '400px';
    paper.style.maxWidth = 'none';
    paper.style.boxShadow = 'none';
    paper.style.transform = 'none';
    // 去掉祖先的 3D 变换，避免移动端 foreignObject 渲染错位/空白
    if (sheet) { sheet.style.perspective = 'none'; sheet.style.transform = 'none'; }

    // 强制取消所有文字截断/省略，防止老版本 CSS 缓存导致导出不全
    const inlineOverrides = [];
    const resetTextTruncation = (el) => {
      inlineOverrides.push({
        el,
        maxWidth: el.style.maxWidth,
        overflow: el.style.overflow,
        textOverflow: el.style.textOverflow,
        whiteSpace: el.style.whiteSpace,
        flexShrink: el.style.flexShrink,
      });
      el.style.maxWidth = 'none';
      el.style.overflow = 'visible';
      el.style.textOverflow = 'clip';
      el.style.whiteSpace = 'nowrap';
      el.style.flexShrink = '0';
    };
    paper.querySelectorAll('.receipt-row-label, .receipt-row-value, .receipt-row-dots, .receipt-music-name, .receipt-music-artist, .receipt-music-lyric, .receipt-review, .receipt-thanks, .receipt-foot').forEach(resetTextTruncation);
    paper.querySelectorAll('.receipt-row-data').forEach(el => {
      inlineOverrides.push({ el, flexWrap: el.style.flexWrap });
      el.style.flexWrap = 'nowrap';
    });

    const doCapture = () => domtoimage.toPng(paper, {
      bgcolor: '#ffffff',
      scale: 2,
      cacheBust: true,
    });

    let dataUrl;
    try {
      dataUrl = await doCapture();
      // 空白自检：若结果几乎全白，可能是远程像素字体在弱网/墙内
      // 没加载成功导致 foreignObject 渲染失败 —— 退回系统等宽字体重试一次
      if (await this._isBlankPng(dataUrl)) {
        paper.style.fontFamily = 'Courier New, monospace';
        dataUrl = await doCapture();
      }
    } catch (err) {
      console.error('导出小票失败', err);
      alert('导出图片失败：' + (err && err.message ? err.message : '未知错误'));
    } finally {
      // 还原隐藏的 UI 与样式
      hiddenEls.forEach(({ el, prev }) => { el.style.display = prev; });
      inlineOverrides.forEach(item => {
        const { el, ...rest } = item;
        Object.keys(rest).forEach(prop => { el.style[prop] = rest[prop]; });
      });
      paper.style.animation = prevStyle.animation;
      paper.style.width = prevStyle.width;
      paper.style.maxWidth = prevStyle.maxWidth;
      paper.style.boxShadow = prevStyle.boxShadow;
      paper.style.transform = prevStyle.transform;
      paper.style.fontFamily = prevStyle.fontFamily;
      if (sheet && prevSheet) { sheet.style.perspective = prevSheet.perspective; sheet.style.transform = prevSheet.transform; }
    }

    if (dataUrl) {
      const date = (this._currentReceiptMusic && this._currentReceiptMusic.date) || this.todayStr();
      const link = document.createElement('a');
      link.download = `receipt-${date}.png`;
      link.href = dataUrl;
      link.click();
    }
  }

  // 判断导出的 PNG 是否几乎全白（空白）。在浏览器内把 dataURL 画到
  // canvas 上统计非白像素占比，比例过低即视为空白。
  _isBlankPng(dataUrl) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = img.width; c.height = img.height;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, c.width, c.height).data;
          let nonWhite = 0;
          for (let i = 0; i < data.length; i += 4) {
            if (!(data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255)) nonWhite++;
          }
          const ratio = nonWhite / (data.length / 4);
          resolve(ratio < 0.02); // 非白像素 < 2% 视为空白
        } catch (e) { resolve(false); }
      };
      img.onerror = () => resolve(false);
      img.src = dataUrl;
    });
  }

  // 播放「小票打印」音效（Web Audio API 生成点阵打印机的咔嗒声）
  playPrinterSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const len = Math.floor(ctx.sampleRate * 1.2);
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

      const bursts = 36;
      for (let i = 0; i < bursts; i++) {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const gain = ctx.createGain();
        const t = now + i * 0.032 + Math.random() * 0.008;
        const dur = 0.012 + Math.random() * 0.018;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.13, t + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        src.connect(gain);
        gain.connect(ctx.destination);
        src.start(t, Math.random() * 0.8, dur);
      }
      setTimeout(() => ctx.close(), 1600);
    } catch (e) {}
  }

  // ===== 网易云「今日歌曲」 =====
  openNcmModal() {
    const input = document.getElementById('ncm-uid');
    if (input) input.value = this.ncmUid || '';
    const clearBtn = document.getElementById('ncm-clear');
    if (clearBtn) clearBtn.style.display = this.ncmUid ? 'inline-block' : 'none';
    const status = document.getElementById('ncm-status');
    if (status) status.textContent = '';
    const modal = document.getElementById('ncm-modal');
    if (modal) modal.style.display = 'flex';
  }

  closeNcmModal() {
    const el = document.getElementById('ncm-modal');
    if (el) el.style.display = 'none';
  }

  saveNcmUid() {
    const input = document.getElementById('ncm-uid');
    const v = (input && input.value || '').trim().replace(/[^0-9]/g, '');
    this.ncmUid = v;
    if (v) localStorage.setItem(NCM_UID_KEY, v);
    else localStorage.removeItem(NCM_UID_KEY);
    this._clearAllNcmCache(); // 换 UID 清空按日期缓存
    const clearBtn = document.getElementById('ncm-clear');
    if (clearBtn) clearBtn.style.display = v ? 'inline-block' : 'none';
    const status = document.getElementById('ncm-status');
    if (status) status.textContent = v ? '已保存 🎵 去「今日小票」看看效果～' : '已清空';
  }

  clearNcm() {
    this.ncmUid = '';
    localStorage.removeItem(NCM_UID_KEY);
    this._clearAllNcmCache();
    const input = document.getElementById('ncm-uid');
    if (input) input.value = '';
    this.closeNcmModal();
  }

  buildProxiedCoverUrl(coverUrl) {
    return `${NCM_FUNC_BASE}/ncm-cover?url=${encodeURIComponent(coverUrl)}`;
  }

  // 按日期缓存 key
  _ncmCacheKey(date) {
    return `${NCM_CACHE_KEY}:${date || this.todayStr()}`;
  }

  // 清空所有日期的歌曲缓存（换 UID 时调用）
  _clearAllNcmCache() {
    try {
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`${NCM_CACHE_KEY}:`)) toRemove.push(key);
      }
      toRemove.forEach(key => localStorage.removeItem(key));
    } catch (e) {}
  }

  async getSongOfDay(date) {
    if (!this.ncmUid) return null;
    const targetDate = date || this.todayStr();
    const cacheKey = this._ncmCacheKey(targetDate);
    let cache = null;
    try { cache = JSON.parse(localStorage.getItem(cacheKey) || 'null'); } catch (e) { cache = null; }
    let song = null;
    if (cache && cache.date === targetDate && cache.uid === this.ncmUid && cache.song) {
      song = cache.song;
    } else {
      try {
        const resp = await fetch(`${NCM_FUNC_BASE}/ncm?uid=${encodeURIComponent(this.ncmUid)}`);
        const data = await resp.json();
        if (!data.ok || !data.list || !data.list.length) {
          const status = document.getElementById('ncm-status');
          if (status && document.getElementById('ncm-modal').style.display === 'flex') {
            status.textContent = '读取失败：' + (data.error || '未知错误');
          }
          return null;
        }
        // 默认每日歌曲：用 日期+UID 做种子，保证当天固定、跨天不同
        const seed = hashString(this.ncmUid + '|' + targetDate);
        const picked = data.list[seed % data.list.length];
        song = { id: picked.id, name: picked.name, artist: picked.artist, coverUrl: picked.coverUrl, lyric: '' };
        try { localStorage.setItem(cacheKey, JSON.stringify({ date: targetDate, uid: this.ncmUid, song })); } catch (e) {}
      } catch (e) {
        console.warn('ncm fetch failed', e);
        return null;
      }
    }
    // 歌词缺失则补取（兼容旧缓存 / 首次拉取失败 / 后端列表缓存拦截）
    if (song && !song.lyric) {
      try {
        const lr = await fetch(`${NCM_FUNC_BASE}/ncm?uid=${encodeURIComponent(this.ncmUid)}&songId=${encodeURIComponent(song.id)}`);
        const ld = await lr.json();
        if (ld.ok && ld.lyric) {
          song = Object.assign({}, song, { lyric: ld.lyric });
          try { localStorage.setItem(cacheKey, JSON.stringify({ date: targetDate, uid: this.ncmUid, song })); } catch (e) {}
        }
      } catch (e) { /* 歌词获取失败不影响封面展示 */ }
    }
    return song;
  }

  // 手动换一首：完全随机从红心歌单挑一首（排除当前歌曲），写入当天缓存后重新渲染
  async refreshSongOfDay(date) {
    const targetDate = date || this.todayStr();
    if (!this.ncmUid) return;
    // 当前歌曲 id，用于排除，确保换一首一定不同
    let currentId = null;
    const cur = this._currentReceiptMusic;
    if (cur && cur.date === targetDate && cur.song) {
      currentId = cur.song.id;
    } else {
      try {
        const c = JSON.parse(localStorage.getItem(this._ncmCacheKey(targetDate)) || 'null');
        if (c && c.song) currentId = c.song.id;
      } catch (e) {}
    }
    try {
      const resp = await fetch(`${NCM_FUNC_BASE}/ncm?uid=${encodeURIComponent(this.ncmUid)}`);
      const data = await resp.json();
      if (!data.ok || !data.list || !data.list.length) {
        alert('读取歌单失败，请稍后再试');
        return;
      }
      const list = data.list;
      let idx;
      if (list.length === 1) {
        idx = 0;
      } else {
        do { idx = Math.floor(Math.random() * list.length); } while (list[idx].id === currentId);
      }
      const picked = list[idx];
      const song = { id: picked.id, name: picked.name, artist: picked.artist, coverUrl: picked.coverUrl, lyric: '' };
      try { localStorage.setItem(this._ncmCacheKey(targetDate), JSON.stringify({ date: targetDate, uid: this.ncmUid, song })); } catch (e) {}
    } catch (e) {
      console.warn('换歌失败', e);
      return;
    }
    await this.renderReceiptMusic(targetDate);
  }

  pixelateCover(proxiedUrl, size = 80, mode = 'bw') {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          // 1) 缩到更密的像素网格
          const small = document.createElement('canvas');
          small.width = size; small.height = size;
          const sctx = small.getContext('2d');
          sctx.imageSmoothingEnabled = false;
          sctx.drawImage(img, 0, 0, size, size);
          const px = sctx.getImageData(0, 0, size, size);
          const d = px.data;

          // 4x4 Bayer 有序抖动
          const bayer = [
            [0, 8, 2, 10],
            [12, 4, 14, 6],
            [3, 11, 1, 9],
            [15, 7, 13, 5]
          ];

          if (mode === 'color') {
            // 彩色像素：保留原图颜色，逐通道有序抖动 + 量化（复古调色板）
            const levels = 6;                    // 每通道 6 级
            const step = 255 / (levels - 1);
            for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                const i = (y * size + x) * 4;
                for (let c = 0; c < 3; c++) {
                  let v = d[i + c];
                  v = (v - 128) * 1.12 + 128;    // 轻微对比增强
                  const threshold = ((bayer[y % 4][x % 4] + 0.5) / 16) * step - step / 2;
                  let q = Math.round((v + threshold) / step) * step;
                  d[i + c] = q < 0 ? 0 : (q > 255 ? 255 : q);
                }
              }
            }
          } else {
            // 黑白像素（原逻辑）：灰度 + Bayer 抖动 → 双色调
            for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                const i = (y * size + x) * 4;
                const r = d[i], g = d[i + 1], b = d[i + 2];
                let gray = 0.299 * r + 0.587 * g + 0.114 * b;
                gray = (gray - 128) * 1.2 + 128;
                const threshold = ((bayer[y % 4][x % 4] + 0.5) / 16) * 255;
                const v = gray > threshold ? 245 : 18;
                d[i] = d[i + 1] = d[i + 2] = v;
              }
            }
          }
          sctx.putImageData(px, 0, 0);

          // 2) 近邻放大到目标尺寸
          const out = document.createElement('canvas');
          const scale = 6;
          out.width = size * scale; out.height = size * scale;
          const octx = out.getContext('2d');
          octx.imageSmoothingEnabled = false;
          octx.drawImage(small, 0, 0, out.width, out.height);
          resolve(out.toDataURL('image/png'));
        } catch (e) { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = proxiedUrl;
    });
  }

  _getPixelMode() {
    try { return localStorage.getItem(PIXEL_MODE_KEY) === 'color' ? 'color' : 'bw'; } catch (e) { return 'bw'; }
  }
  _setPixelMode(v) {
    try { localStorage.setItem(PIXEL_MODE_KEY, v === 'color' ? 'color' : 'bw'); } catch (e) {}
  }

  // 按当前配色偏好异步重生某条收藏的像素封面
  _regenCover(receipt, cb) {
    if (!receipt || !receipt.coverUrl) return;
    const proxied = this.buildProxiedCoverUrl(receipt.coverUrl);
    this.pixelateCover(proxied, 80, this._getPixelMode()).then(url => {
      if (url && cb) cb(url);
    });
  }

  async renderReceiptMusic(date) {
    const el = document.getElementById('receipt-music');
    if (!el) return;
    // 重置当前小票音乐状态
    this._currentReceiptMusic = { date: date || this.todayStr(), song: null, pixelUrl: null };
    if (!this.ncmUid) { el.style.display = 'none'; return; }
    const song = await this.getSongOfDay(date);
    if (!song) { el.style.display = 'none'; return; }
    const proxied = this.buildProxiedCoverUrl(song.coverUrl);
    const pixel = await this.pixelateCover(proxied, 80, this._getPixelMode());
    this._currentReceiptMusic = { date: date || this.todayStr(), song, pixelUrl: pixel };
    el.style.display = 'block';
    const lyricHtml = song.lyric
      ? `<div class="receipt-music-lyric">“${this.escapeHtml(song.lyric)}”</div>`
      : '';
    const curMode = this._getPixelMode();
    el.innerHTML = `
      <div class="receipt-music-label">♫ 今日歌曲 / TODAY'S TRACK</div>
      <div class="receipt-music-hero">
        <div class="receipt-music-cover">${pixel ? `<img src="${pixel}" alt="cover" />` : ''}</div>
      </div>
      <div class="receipt-music-meta">
        <div class="receipt-music-name">${this.escapeHtml(song.name)}</div>
        <div class="receipt-music-artist">${this.escapeHtml(song.artist)}</div>
      </div>
      <div class="receipt-music-actions">
        <button type="button" class="receipt-music-refresh" onclick="app.refreshSongOfDay('${date || this.todayStr()}')" title="换一首">↻ 换一首</button>
        <button type="button" class="receipt-music-refresh receipt-music-mode" onclick="app.togglePixelMode('${date || this.todayStr()}')" title="切换像素封面配色">${curMode === 'color' ? '◑ 彩色' : '◐ 黑白'}</button>
      </div>
      ${lyricHtml}`;
    // 音乐加载完后刷新收藏按钮状态（因为可能已经生成像素封面）
    this._updateReceiptFavoriteButtons(date || this.todayStr());
  }

  // 切换像素封面配色（黑白 / 彩色），立即更新当前小票与已收藏的该日封面
  async togglePixelMode(date) {
    const next = this._getPixelMode() === 'color' ? 'bw' : 'color';
    this._setPixelMode(next);
    const targetDate = date || this.todayStr();
    const music = this._currentReceiptMusic;
    // 1) 立即更新「今日歌曲」封面
    if (music && music.song && music.song.coverUrl) {
      const proxied = this.buildProxiedCoverUrl(music.song.coverUrl);
      const pixel = await this.pixelateCover(proxied, 80, next);
      this._currentReceiptMusic = Object.assign({}, music, { pixelUrl: pixel });
      const coverImg = document.querySelector('#receipt-music .receipt-music-cover img');
      if (coverImg && pixel) coverImg.src = pixel;
    }
    const modeBtn = document.querySelector('#receipt-music .receipt-music-mode');
    if (modeBtn) modeBtn.textContent = next === 'color' ? '◑ 彩色' : '◐ 黑白';
    // 2) 同步更新已收藏的该日小票封面（需有原图地址）
    if (this.isReceiptCollected(targetDate)) {
      const r = this.receipts.find(x => x.date === targetDate);
      if (r && r.coverUrl) {
        this._regenCover(r, (url) => {
          r.pixelUrl = url; r.pixelMode = next; this.saveData();
          const cardImg = document.querySelector(`.receipt-card[data-date="${targetDate}"] .receipt-card-img`);
          if (cardImg) cardImg.src = url;
          const calImg = document.querySelector(`.receipt-cal-filled[data-date="${targetDate}"] .receipt-cal-cover`);
          if (calImg) calImg.src = url;
        });
      }
    }
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
      'sync-modal': () => this.closeSyncModal(),
      'ncm-modal': () => this.closeNcmModal()
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

  // ===== 小票收藏夹：本周托盘 + 所有日历 =====
  renderReceiptView() {
    if (!this._receiptTab) this._receiptTab = 'week';
    // —— 本周托盘 ——
    const tray = document.getElementById('receipt-tray');
    const empty = document.getElementById('receipt-tray-empty');
    if (tray) {
      const weekList = [...this.receipts]
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .filter(r => this._isInThisWeek(r.date));
      if (weekList.length === 0) {
        tray.innerHTML = '';
        if (empty) empty.style.display = 'block';
      } else {
        if (empty) empty.style.display = 'none';
        tray.innerHTML = '';
        weekList.forEach((r, idx) => tray.appendChild(this._createReceiptCard(r, idx)));
      }
      if (this._receiptTab === 'week') this._layoutReceiptCards();
    }
    // —— 所有日历 ——
    if (this._receiptTab === 'all') this.renderReceiptCalendar();
  }

  switchReceiptTab(tab) {
    this._receiptTab = tab;
    const weekTab = document.getElementById('receipt-tab-week');
    const allTab = document.getElementById('receipt-tab-all');
    if (weekTab) weekTab.classList.toggle('active', tab === 'week');
    if (allTab) allTab.classList.toggle('active', tab === 'all');
    const weekPanel = document.getElementById('receipt-panel-week');
    const allPanel = document.getElementById('receipt-panel-all');
    if (weekPanel) weekPanel.style.display = tab === 'week' ? 'block' : 'none';
    if (allPanel) allPanel.style.display = tab === 'all' ? 'block' : 'none';
    if (tab === 'all') this.renderReceiptCalendar();
    else this._layoutReceiptCards();
  }

  _isInThisWeek(dateStr) {
    const today = new Date(this.todayStr());
    const dow = (today.getDay() + 6) % 7; // 周一=0 ... 周日=6
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dow);
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7);
    const d = new Date(dateStr);
    return d >= monday && d < sunday;
  }

  _createReceiptCard(r, idx) {
    const d = new Date(r.date);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const title = r.songName || r.pattern || 'RECEIPT';
    const artist = r.artist || '';
    // 兼容旧数据：没有 pixelUrl 时回退到旧的 generatePixelArt
    let imgUrl = r.pixelUrl;
    if (!imgUrl && r.pattern) {
      try { imgUrl = generatePixelArt(r.date).dataUrl; } catch (e) { imgUrl = ''; }
    }
    // 当前配色偏好与已存封面不一致时，异步重新生成为当前配色
    if (r.pixelMode && r.pixelMode !== this._getPixelMode() && r.coverUrl) {
      this._regenCover(r, (url) => {
        r.pixelUrl = url; r.pixelMode = this._getPixelMode(); this.saveData();
        const imgEl = div.querySelector('.receipt-card-img');
        if (imgEl) imgEl.src = url;
      });
    }
    const items = this._receiptCompletedItemTitles(r.date).slice(0, 5);
    const itemLines = items.length
      ? items.map(t => `<div class="rs-line"><span class="rs-check">✓</span><span class="rs-text">${this.escapeHtml(t)}</span></div>`).join('')
      : '<div class="rs-line rs-empty">今日暂无完成记录</div>';
    const div = document.createElement('div');
    div.className = 'receipt-card';
    div.dataset.date = r.date;
    div.dataset.idx = idx;
    div.innerHTML = `
      <div class="receipt-card-remove" title="取消收藏"
           onpointerdown="event.stopPropagation()"
           onclick="app.removeReceiptFromCollection('${r.date}')">✕</div>
      <div class="receipt-card-date">${mm}.${dd} 周${WEEKDAY_NAMES[d.getDay()]}</div>
      <div class="receipt-card-cover"><img class="receipt-card-img" src="${imgUrl || ''}" alt="${this.escapeHtml(title)}" draggable="false" /></div>
      <div class="receipt-card-title">${this.escapeHtml(title)}</div>
      ${artist ? `<div class="receipt-card-artist">${this.escapeHtml(artist)}</div>` : ''}
      <div class="receipt-card-rule"></div>
      <div class="receipt-card-items">${itemLines}</div>
      <div class="receipt-card-rule"></div>
      <div class="receipt-card-foot">DAILY RECEIPT</div>
    `;
    this._bindReceiptPointerEvents(div);
    return div;
  }

  _receiptCompletedItemTitles(date) {
    const routineDone = this.buildRoutineItems(date).filter(i => i.done);
    const limitedDone = this.buildLimitedItems(this.getTodayTodos(date)).filter(i => i.done);
    const subDone = this.getSubtasksByDate(date).filter(s => s.status === 'done');
    const titles = [];
    routineDone.forEach(i => titles.push(i.title));
    limitedDone.forEach(i => titles.push(i.title));
    subDone.forEach(s => titles.push(s.title));
    return titles;
  }

  // ===== 所有小票：日历视图 =====
  renderReceiptCalendar() {
    const grid = document.getElementById('receipt-cal-grid');
    const label = document.getElementById('receipt-cal-label');
    const weekdaysEl = document.getElementById('receipt-cal-weekdays');
    const empty = document.getElementById('receipt-cal-empty');
    if (!grid) return;
    if (this._receiptCalYear == null) {
      const now = new Date(this.todayStr());
      this._receiptCalYear = now.getFullYear();
      this._receiptCalMonth = now.getMonth();
    }
    const year = this._receiptCalYear;
    const month = this._receiptCalMonth;
    if (label) label.textContent = `${year} 年 ${month + 1} 月`;
    if (weekdaysEl && !weekdaysEl.children.length) {
      weekdaysEl.innerHTML = WEEKDAY_NAMES.map(d => `<div class="receipt-cal-wd">周${d}</div>`).join('');
    }
    const map = new Map(this.receipts.map(r => [r.date, r]));
    const first = new Date(year, month, 1);
    const startDow = (first.getDay() + 6) % 7; // 周一=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(map.get(this.formatDate(year, month, day)) || { date: this.formatDate(year, month, day), empty: true });
    }
    grid.innerHTML = cells.map(c => {
      if (!c) return '<div class="receipt-cal-cell receipt-cal-blank"></div>';
      const day = parseInt(c.date.slice(8, 10), 10);
      if (c.empty) {
        return `<div class="receipt-cal-cell receipt-cal-day"><span class="receipt-cal-num">${day}</span></div>`;
      }
      let img = c.pixelUrl;
      if (!img && c.pattern) { try { img = generatePixelArt(c.date).dataUrl; } catch (e) { img = ''; } }
      // 当前配色偏好与已存封面不一致时，异步重新生成为当前配色
      if (c.pixelMode && c.pixelMode !== this._getPixelMode() && c.coverUrl) {
        this._regenCover(c, (url) => {
          c.pixelUrl = url; c.pixelMode = this._getPixelMode(); this.saveData();
          const cellImg = grid.querySelector(`.receipt-cal-filled[data-date="${c.date}"] .receipt-cal-cover`);
          if (cellImg) cellImg.src = url;
        });
      }
      const title = this.escapeHtml(c.songName || c.pattern || 'RECEIPT');
      return `<div class="receipt-cal-cell receipt-cal-filled" data-date="${c.date}" onclick="app.openReceipt('${c.date}')" title="${title}">
          <img class="receipt-cal-cover" src="${img || ''}" alt="" draggable="false" />
          <span class="receipt-cal-num">${day}</span>
          <button class="receipt-cal-remove" title="取消收藏"
            onpointerdown="event.stopPropagation()"
            onclick="event.stopPropagation(); app.removeReceiptFromCollection('${c.date}')">✕</button>
        </div>`;
    }).join('');
    if (empty) empty.style.display = map.size === 0 ? 'block' : 'none';
  }

  shiftReceiptCal(dir) {
    if (this._receiptCalYear == null) {
      const now = new Date(this.todayStr());
      this._receiptCalYear = now.getFullYear();
      this._receiptCalMonth = now.getMonth();
    }
    let m = this._receiptCalMonth + dir;
    let y = this._receiptCalYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    this._receiptCalYear = y;
    this._receiptCalMonth = m;
    this.renderReceiptCalendar();
  }

  _layoutReceiptCards() {
    const tray = document.getElementById('receipt-tray');
    const cards = [...tray.querySelectorAll('.receipt-card')];
    const count = cards.length;
    const trayHeight = tray.clientHeight;
    const baseBottom = 22;
    // 动态步长：票越多，每张露出的边缘越少
    const stepY = Math.min(30, Math.max(16, (trayHeight - 240) / Math.max(count, 1)));
    cards.forEach((card, idx) => {
      const seed = this._hashString(card.dataset.date || String(idx));
      const rot = ((seed % 900) / 100) - 4.5; // -4.5 ~ 4.5 deg
      const tx = ((seed % 700) / 100) - 3.5;  // -3.5 ~ 3.5 px
      const bottom = baseBottom + idx * stepY;
      card.style.left = '50%';
      card.style.marginLeft = '-79px';
      card.style.bottom = `${bottom}px`;
      card.style.top = 'auto';
      card.style.transform = `translateX(${tx}px) rotate(${rot}deg)`;
      card.style.zIndex = idx + 1;
    });
  }

  _hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
  }

  _bindReceiptPointerEvents(card) {
    card.addEventListener('pointerdown', (e) => this._onReceiptPointerDown(e, card));
  }

  _onReceiptPointerDown(e, card) {
    // 只响应主指针/触摸，避免右键菜单
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    card.setPointerCapture(e.pointerId);
    const tray = document.getElementById('receipt-tray');
    const rect = card.getBoundingClientRect();
    const trayRect = tray.getBoundingClientRect();
    this._receiptDrag = {
      card,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      trayRect,
      dragging: false,
      moved: false
    };
    // 180ms 后如果还没松开也没有大幅移动，就进入拖拽状态（给一点触觉反馈）
    this._receiptDrag.longPressTimer = setTimeout(() => {
      if (this._receiptDrag && this._receiptDrag.card === card && !this._receiptDrag.dragging) {
        this._startReceiptDrag(card);
      }
    }, 180);

    const moveHandler = (ev) => this._onReceiptPointerMove(ev, card);
    const upHandler = (ev) => this._onReceiptPointerUp(ev, card, moveHandler, upHandler);
    card.addEventListener('pointermove', moveHandler);
    card.addEventListener('pointerup', upHandler);
    card.addEventListener('pointercancel', upHandler);
  }

  _onReceiptPointerMove(e, card) {
    const drag = this._receiptDrag;
    if (!drag || drag.card !== card || e.pointerId !== drag.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const dist = Math.hypot(dx, dy);
    if (!drag.dragging && dist > 10) {
      clearTimeout(drag.longPressTimer);
      this._startReceiptDrag(card);
    }
    if (drag.dragging) {
      drag.moved = true;
      const x = e.clientX - drag.trayRect.left - drag.offsetX;
      const y = e.clientY - drag.trayRect.top - drag.offsetY;
      card.style.left = `${x}px`;
      card.style.marginLeft = '0';
      card.style.bottom = 'auto';
      card.style.top = `${y}px`;
      // 拖拽时立体浮起：放大、抬升、稍微跟随水平偏移旋转
      const rot = (dx * 0.03);
      card.style.transform = `scale(1.10) translateZ(70px) rotateX(5deg) rotate(${rot}deg)`;
      card.style.zIndex = '10000';
    }
  }

  _startReceiptDrag(card) {
    const drag = this._receiptDrag;
    if (!drag) return;
    drag.dragging = true;
    card.classList.add('lifted');
    if (navigator.vibrate) navigator.vibrate(12);
  }

  _onReceiptPointerUp(e, card, moveHandler, upHandler) {
    const drag = this._receiptDrag;
    if (!drag || drag.card !== card || e.pointerId !== drag.pointerId) return;
    clearTimeout(drag.longPressTimer);
    card.removeEventListener('pointermove', moveHandler);
    card.removeEventListener('pointerup', upHandler);
    card.removeEventListener('pointercancel', upHandler);
    try { card.releasePointerCapture(e.pointerId); } catch (err) {}

    const duration = Date.now() - drag.startTime;
    const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);

    if (!drag.dragging && dist < 10 && duration < 320) {
      // 轻点：打开当天小票
      card.classList.add('tapped');
      setTimeout(() => card.classList.remove('tapped'), 220);
      this.openReceipt(card.dataset.date);
    } else if (drag.dragging) {
      this._finishReceiptDrag(card, e.clientX, e.clientY);
    }
    this._receiptDrag = null;
  }

  _finishReceiptDrag(card, clientX, clientY) {
    const tray = document.getElementById('receipt-tray');
    const trayRect = tray.getBoundingClientRect();
    const draggedDate = card.dataset.date;
    const map = new Map(this.receipts.map(r => [r.date, r]));
    const dragged = map.get(draggedDate);
    if (!dragged) return;

    // 找到落点中心最近的其他卡片
    const others = [...tray.querySelectorAll('.receipt-card')].filter(c => c !== card);
    let target = null;
    let minDist = Number.POSITIVE_INFINITY;
    others.forEach(c => {
      const box = c.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const d = Math.hypot(clientX - cx, clientY - cy);
      if (d < minDist) { minDist = d; target = c; }
    });

    let newList = this.receipts.filter(r => r.date !== draggedDate);
    if (target && target.dataset.date && minDist < 160) {
      // 落到某张票上：叠到它上面
      const targetIdx = newList.findIndex(r => r.date === target.dataset.date);
      if (targetIdx >= 0) newList.splice(targetIdx + 1, 0, dragged);
      else newList.push(dragged);
    } else {
      // 按落点的 Y 坐标插入排序
      const relY = clientY - trayRect.top;
      const stepY = Math.min(30, Math.max(16, (trayRect.height - 240) / Math.max(newList.length, 1)));
      const insertIdx = Math.max(0, Math.min(newList.length, Math.floor((relY - 30) / stepY)));
      newList.splice(insertIdx, 0, dragged);
    }
    this.receipts = newList;
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

  // Filters（旧版 plan 视图用，新版工作台已改用 renderFilterPopover）
  renderFilters() {
    const catContainer = document.getElementById('category-filters');
    if (catContainer) {
      catContainer.innerHTML = CATEGORIES.map(cat => `
        <button class="filter-btn ${this.filterCategory === cat ? 'active' : ''}" onclick="app.setCategoryFilter('${cat}')">${cat}</button>
      `).join('');
    }

    const priContainer = document.getElementById('priority-filters');
    if (priContainer) {
      priContainer.innerHTML = PRIORITIES.map(pri => `
        <button class="filter-btn ${this.filterPriority === pri ? 'active' : ''}" onclick="app.setPriorityFilter('${pri}')">${pri}</button>
      `).join('');
    }
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

  // Task List（旧版 plan 视图用，新版工作台已改用 renderWorkspaceDetail）
  renderTasks() {
    const leftContainer = document.getElementById('task-list-left');
    const rightContainer = document.getElementById('task-list-right');
    const emptyState = document.getElementById('empty-state');
    const mainLayout = document.getElementById('main-layout');
    if (!leftContainer || !rightContainer || !mainLayout) return;

    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      leftContainer.innerHTML = '';
      rightContainer.innerHTML = '';
      mainLayout.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
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
      // 每组内未完成的排前面
      Object.values(grouped).forEach(g => g.items.sort((a, b) => (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0)));

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
  openTaskModal(taskId = null, defaultCategory = null) {
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
      document.getElementById('task-category').value = defaultCategory || '行政出行';
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
      this.closeDayModal();
      this.renderCalendar();
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
