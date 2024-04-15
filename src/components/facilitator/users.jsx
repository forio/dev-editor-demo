import { useDispatch, useSelector } from 'react-redux';
import {
    getPersonas,
    setPersonas,
    getAllUsers,
    getAllWorlds,
    autoAssignUsers,
    clearAllWorlds,
} from 'actions';
import { useEffect } from 'react';
import { selectPersonas, selectUsers, selectWorlds } from 'selectors';

const Users = () => {
    const dispatch = useDispatch();
    const fetchData = async () => {
        await Promise.all([
            dispatch(getPersonas()),
            dispatch(getAllUsers()),
            dispatch(getAllWorlds()),
        ]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const personas = useSelector(selectPersonas);
    const users = useSelector(selectUsers);
    const worlds = useSelector(selectWorlds);

    return (
        <div>
            {personas?.length ? null : (
                <button onClick={() => dispatch(setPersonas())}>
                    Set Personas
                </button>
            )}
            <button onClick={() => dispatch(autoAssignUsers())}>
                Auto Assign
            </button>
            <button onClick={() => dispatch(clearAllWorlds())}>
                Unassign all users
            </button>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>World</th>
                        <th>Editor?</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => {
                        const world = worlds?.find((world) => {
                            return world?.assignments?.find(
                                (u) => u?.user?.userKey === user?.user?.userKey
                            );
                        });

                        return (
                            <tr key={user?.user?.userKey}>
                                <td>{user?.user?.displayName}</td>
                                <td>{world?.name}</td>
                                <td>Probably not</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
