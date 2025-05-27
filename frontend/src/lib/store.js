import { writable } from 'svelte/store'

const persist_storage = (key, initValue) => {
    const storedValueStr = localStorage.getItem(key)
    let storedValue = initValue
    
    if (storedValueStr !== null && storedValueStr !== "undefined") {
        try {
            storedValue = JSON.parse(storedValueStr)
        } catch (e) {
            console.error(`Error parsing stored value for ${key}:`, e)
        }
    }
    
    const store = writable(storedValue)
    store.subscribe((val) => {
        if (val !== undefined) {
            localStorage.setItem(key, JSON.stringify(val))
        }
    })
    return store
}

export const page = persist_storage("page", 0)
export const keyword = persist_storage("keyword", "")
export const access_token = persist_storage("access_token", "")
export const username = persist_storage("username", "")
export const is_login = persist_storage("is_login", false)