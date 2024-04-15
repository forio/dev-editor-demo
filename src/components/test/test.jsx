import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'components';
import {
    selectStepVariables,
    selectInputState,
    selectEditor,
    selectAmIEditor,
} from 'selectors';
import { setRunVariables, becomeEditor } from 'actions';

const Test = () => {
    const vars = useSelector(selectStepVariables);
    const priceValue = useSelector(selectInputState('price'));
    const editor = useSelector(selectEditor);
    const isEditor = useSelector(selectAmIEditor);
    const dispatch = useDispatch();

    const handleStep = async () => {
        const step = vars?.Step;
        const update = {
            Step: step + 1,
            [`Price[${step}]`]: priceValue || vars?.Price,
        };
        await dispatch(setRunVariables(update));
    };

    return (
        <div id="test-page">
            <div>
                <h2>Results</h2>
                <p>Step: {vars?.Step}</p>
                <p>Profit: {vars?.Profit}</p>
            </div>
            <div>
                <h2>Decision</h2>
                <button
                    onClick={() => dispatch(becomeEditor())}
                    disabled={isEditor}
                >
                    Become Editor
                </button>
                {isEditor ? (
                    <p>You are currently the editor</p>
                ) : (
                    <p>{editor} is currently the editor</p>
                )}
                <TextInput
                    label="Price"
                    type="number"
                    name="price"
                    defaultValue={vars?.Price}
                    disabled={!isEditor}
                />
                <button onClick={handleStep} disabled={!isEditor}>
                    Step
                </button>
            </div>
        </div>
    );
};

export default Test;
