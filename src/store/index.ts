import { configureStore } from '@reduxjs/toolkit'
// Add import todoReducer from './todoSlice'
// Add import payloadAction<string> from '@reduxjs/toolkit'

// Add const store = configureStore
// Remove reducer logic from store into the slices folder that we create
// leave only ({reducer:{todosSlice:}})
// Switch case do not need because we got Redux toolkit
// Missing initialState = {}
// Create and add userSlice into configureStore reducers
// Remove actions type because of slices from redux toolkit
export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                // Mutable state is okay here because Immer library from toolkit
                // Replace on addTodo (state, action)
                case 'ADD_TODO': {
                    // Removed const newState and left just state as
                    // state.todos.push(action.payload.todoTitle)
                    const newState = state;
                    newState.todos.push(action.payload);
                    // Remove return newState
                    return newState;
                }
                // Replace on removeTodo (state, action)
                case 'REMOVE_TODO': {
                    // For calling this we can use dispatch (removeTodo)
                    // Replace on state.todos = state.todos.filter...
                    return {
                        ...state,
                        // Add type of t from any to array
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                // Replace on toggleTodoComplete (state, action)
                // Calling this into the userSelect
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
// Add export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;
// export default or named todoSlice.reducer; 