概览：使用pinia和vue3完成indexdb的增查改
```typescript
import { defineStore } from 'pinia'
import { ref, onBeforeMount, computed } from 'vue'

export const useDBStore = defineStore('indexedDB', () => {
  const db = ref<any>(null)
  // 数据库是否可用
  const available = computed((): boolean => db.value !== null)
  // 初始化数据库
  const dbName = 'test-db'
  const initDB = async (): Promise<void> => {
    db.value = await openDB(dbName)
  }
  // 数据库是否初始化
  const inited = ref(false)
  onBeforeMount(async () => {
    !inited.value && (await initDB())
  })

  // 数据库仓库列表
  const storeList = ['test']
  const openDB = async (dbName: string, version = 1): Promise<any> => {
    return await new Promise((resolve, reject): void => {
      //  兼容浏览器
      const indexedDB = window.indexedDB
      if (!indexedDB) {
        reject(new Error('浏览器不支持indexedDB'))
        return
      }
      let db: any
      // 打开数据库，若没有则会创建
      const request = indexedDB.open(dbName, version)
      // 数据库打开成功回调
      request.onsuccess = function (event: any) {
        db = event.target.result // 数据库对象
        console.log('数据库打开成功')
        inited.value = true
        resolve(db)
      }
      // 数据库打开失败的回调
      request.onerror = function () {
        inited.value = true
        console.log('数据库打开失败')
      }
      // 数据库有更新时候的回调
      request.onupgradeneeded = function (event: any) {
        // 数据库创建或升级的时候会触发
        console.log('onupgradeneeded')
        db = event.target?.result // 数据库对象
        // 创建存储库
        storeList.forEach(i => db.createObjectStore(i, {}))
      }
    })
  }

  // 创建或更新数据
  const set = (storeName: string, key: string, data: any): void => {
    if (!db.value) {
      return
    }
    const request = db.value
      .transaction([storeName], 'readwrite') // 事务对象
      .objectStore(storeName) // 仓库对象
      .put(data, key)

    request.onsuccess = function () {
      console.log('数据更新成功')
    }

    request.onerror = function () {
      console.log('数据更新失败')
    }
  }

  // 获取数据
  const get = async (storeName: string, key: string): Promise<any> => {
    return await new Promise((resolve, reject) => {
      if (!db.value) {
        reject(new Error('数据库不存在'))
        return
      }
      const transaction = db.value.transaction([storeName]) // 事务
      const objectStore = transaction.objectStore(storeName) // 仓库对象
      const request = objectStore.get(key) // 通过主键获取数据

      request.onerror = function () {
        console.log('事务失败')
      }

      request.onsuccess = function () {
        console.log('主键查询结果: ', request.result)
        resolve(request.result)
      }
    })
  }
  return { db, set, get, available }
})

```
