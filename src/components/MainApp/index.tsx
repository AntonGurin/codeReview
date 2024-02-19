import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';
// Need import actions from slices
// Must have import useDispatch and actions from redux because Redux Toolkit is not used here
// Remove second empty line
// Todo type can be move out in types directory for reuse
// The user must have an interface because it is an object not number, or user.id with number
// We have a global interface allTodosIsDone so 'isDone' or global interface is unnecessarily
// We have import type UserSelectProps from UserSelect
type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};
// Class have name Index instead MainApp
// Using class instead functional components with hooks useSelector and useDispatch
// Class Index (MainApp) takes todos from props but MainApp attached to the global store
//
class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }
    // Todo has type any instead string 
    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        // Logic error
        const { todoTitle } = this.state;
        window.allTodosIsDone = true;
        // Empty extra line
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            // Better remove huge inline callbacks from render logic
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                {/* TodoTittle has type value not todoTittle */}
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {/* Name the variables correctly for understanding with correct types(idx:number for example) */}
                {this.props.todos.map((t, idx) => (
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                        // Remove inline styles
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            // Index have type any instead correct type - number
                            // ChangedTodos can be name like toggledTodos
                            const changedTodos = this.props.todos.map((t, index) => {
                                // Name 'res' is not good option for calling constant 
                                const res = { ...t }
                                // Should be === not ==
                                // Not correct logic
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            // ChangeTodo could be named like completTodo and changedTodos 
                            // on completedTodos
                            this.props.changeTodo(changedTodos)
// Extra empty line
                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
// Connect is legacy and worse metod than hooks 
export default connect(
    //Connect has no todos state and state type
    (state) => ({}),
    /// Dispatch has type any instead action type in Redux
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        // Action creator removeTodo not used, also "REMOVE_TODOS" has syntax error as "s" on the end REMOVE_TODO
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
