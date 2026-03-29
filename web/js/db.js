/**
 * AE Database — localStorage + BroadcastChannel mock.
 * Same interface as Firebase so swapping is one file change:
 *   DB.set(path, value)
 *   DB.get(path)
 *   DB.on(path, callback) → returns unsubscribe fn
 *   DB.push(path, value)
 */
const DB = (() => {
  const listeners = {};
  const ch = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ae') : null;

  if (ch) ch.onmessage = ({ data }) => notify(data.path, data.value);

  function store() {
    try { return JSON.parse(localStorage.getItem('ae') || '{}'); } catch { return {}; }
  }

  function save(s) { localStorage.setItem('ae', JSON.stringify(s)); }

  function atPath(obj, path) {
    return path.split('/').filter(Boolean).reduce((o, k) => o?.[k], obj);
  }

  function setPath(obj, path, val) {
    const keys = path.split('/').filter(Boolean);
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (typeof cur[keys[i]] !== 'object' || cur[keys[i]] === null) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = val;
    return obj;
  }

  function notify(path, value) {
    (listeners[path] || []).forEach(cb => cb(value));
    // notify parent paths too
    const parts = path.split('/').filter(Boolean);
    for (let i = parts.length - 1; i > 0; i--) {
      const p = parts.slice(0, i).join('/');
      if (listeners[p]) {
        const v = atPath(store(), p);
        listeners[p].forEach(cb => cb(v));
      }
    }
  }

  return {
    set(path, value) {
      const s = store();
      setPath(s, path, value);
      save(s);
      notify(path, value);
      if (ch) ch.postMessage({ path, value });
    },
    get(path) { return atPath(store(), path); },
    on(path, cb) {
      (listeners[path] = listeners[path] || []).push(cb);
      const cur = this.get(path);
      if (cur !== undefined) cb(cur);
      return () => { listeners[path] = listeners[path].filter(x => x !== cb); };
    },
    push(path, value) {
      const s = store();
      const arr = atPath(s, path) || [];
      arr.push({ ...value, _id: Date.now().toString(36) + Math.random().toString(36).slice(2) });
      setPath(s, path, arr);
      save(s);
      notify(path, arr);
      if (ch) ch.postMessage({ path, value: arr });
    },
    initSession(code) {
      if (!this.get(`sessions/${code}`)) {
        this.set(`sessions/${code}`, {
          scene: { title: '', description: '', image: '' },
          choices: [],
          combat: { active: false, round: 1, initiative: [], currentTurn: 0 },
          rollLog: [],
          players: {},
        });
      }
    },
    clearSession(code) {
      const s = store();
      if (s.sessions) delete s.sessions[code];
      save(s);
    },
  };
})();
