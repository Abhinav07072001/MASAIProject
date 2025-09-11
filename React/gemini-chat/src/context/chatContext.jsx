import React, { createContext, useContext, useEffect, useReducer } from 'react'

const ChatStateContext = createContext()
const ChatDispatchContext = createContext()

const LOCAL_KEY = 'gemini_chat_history_v1'

function reducer(state, action){
  switch(action.type){
    case 'INIT':
      return action.payload
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'CLEAR':
      return { messages: [], loading: false }
    default:
      throw new Error('Unknown action')
  }
}

const initial = { messages: [], loading: false }

export function ChatProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(LOCAL_KEY)
      if(raw){
        dispatch({ type: 'INIT', payload: JSON.parse(raw) })
      }
    }catch(e){ console.error('Failed to load chat', e) }
  }, [])

  useEffect(()=>{
    try{ localStorage.setItem(LOCAL_KEY, JSON.stringify(state)) }
    catch(e){ console.error('Failed to save chat', e) }
  }, [state])

  return (
    <ChatStateContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatStateContext.Provider>
  )
}

export function useChatState(){ return useContext(ChatStateContext) }
export function useChatDispatch(){ return useContext(ChatDispatchContext) }
