import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'
import authReducer from './slices/authSlice'
import currentChannelReducer from './slices/currentChannelSlice'
import modalReducer from './slices/modalSlice'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    auth: authReducer,
    currentChannel: currentChannelReducer,
    modal: modalReducer,
  },
})

export default store
