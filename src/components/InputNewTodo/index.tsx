import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    // Do correct type for todo, not any
    // onSubmit must have tittle: string and isDone: boolean
    onSubmit: (todo: any) => void,
// Empty extra line
}
// Value is not correct for this type
type InputNewTodoState = {
    value: string
}
// Named export, in the same time often using default exports in the application
// Class components are worse than functional, because functional components 
// do not have their own mutable state so it makes them easier to test and reuse
// Also we have the hooks, so classes is a worst solution
export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        // Do constructor with inputNewTodoProps, super with props
        // Do announce your state with this.state value
        if (this.props.todoTitle !== prevProps.todoTitle) {
            /// Value should be state not props
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Do CurrentTarget instead target
        this.props.onChange(e.target.value);
    }
    // Using event instead 'e' like before
    // React.KeyboardEvent have <HTMLDivElement> type
    handleKeyDown = (event: React.KeyboardEvent) => {
        // Key code has a number type not any
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();
        // Replace legacy var on topical variables (const) 
        // Name "val" is bad for understanding, also don't have a reason for val function execution
        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
            // Wrong new-todo styles using into the input  
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
