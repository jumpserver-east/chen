const STORAGE_KEY = 'chen_sql_history'
const MAX_ITEMS = 50

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const items = raw ? JSON.parse(raw) : []
    return Array.isArray(items) ? items : []
  } catch (e) {
    return []
  }
}

function writeAll(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    // Private mode or a full quota should not block running SQL.
  }
}

export function rememberSql(sql, meta = {}) {
  const text = (sql || '').trim()
  if (!text) {
    return
  }
  const dbType = meta.dbType || ''
  const items = readAll().filter(item => !(item.sql === text && item.dbType === dbType))
  items.unshift({
    id: `${Date.now()}`,
    sql: text,
    dbType,
    time: Date.now()
  })
  writeAll(items.slice(0, MAX_ITEMS))
}

export function listSqlHistory(dbType) {
  return readAll().filter(item => !dbType || item.dbType === dbType)
}
