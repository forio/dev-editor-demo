import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorlds } from 'selectors';
import { getPersonas, getAllUsers, getAllWorlds, resetWorld } from 'actions';

const Settings = () => {
    const worlds = useSelector(selectWorlds);
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
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>World Name</th>
                        <th>Reset</th>
                    </tr>
                </thead>
                <tbody>
                    {worlds.map((world) => (
                        <tr key={world?.worldKey}>
                            <td>{world?.name}</td>
                            <td>
                                <button
                                    onClick={() => dispatch(resetWorld(world))}
                                >
                                    Reset
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Settings;
