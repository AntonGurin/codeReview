import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Need import actions from slices
// Need import hooks useState and useEffect from 'react';
import styles from './UserSelect.module.css';
// Idx is could be named userId, type UserSelectProps should be import into the MainApp
// User has number type instead object, we can use userId with number type
type UserSelectProps = {
    user?: number,
    idx: number,
}
// Function UserSelect must have got type : React.FunctionComponent = () => {}
// For side effects should use forEach instead map
function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    // Todos type has any []
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    // Remove 'React' from React.useEffect also useState declared after useEffect
    // For best interaction between async logic and component's lifesycle
    // we can use dispatch(fetchData()) inside useEffect with empty array dependencies
    // that allow us to load data during initialization 
    React.useEffect(
        () => {
            // Remove the console.log 
            // Fetch can be moved out from useEffect to Thunk middleware or 
            // we need catch errors here
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                // Extra comma after users.json(),
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    // Remove 'React' from React.useState
    // Hook useState should be on the top of functional component level 
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // ChangedTodos was better named like ToggledTodosComplete
        // ChangedTodos = state.todos.find ... 
        const changedTodos = todos.map((t, index) => {
            // Not valid const name
            const res = { ...t }
            // Should be === instead ==
            // Missing dispatch with action.payload.id
            if (index == idx) {
                // Remove the console.log
                console.log('props.user', props.user);
                // CurrentTarger instead target
                res.user = e.target.value;
            }
            return res;
        })
        // Action CHANGE_TODO and changedTodos could be named like 
        // COMPLETE_TODO and completedTodos
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {/* User has wrong type any
                Options.map should be replaced on forEach */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
