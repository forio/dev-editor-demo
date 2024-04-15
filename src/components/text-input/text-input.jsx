import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectInputState } from 'selectors';
import { updateInput } from 'actions';

/* eslint-disable react/no-multi-comp */
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
const TextArea = forwardRef((props, ref) => <textarea ref={ref} {...props} />);

const TextInput = forwardRef(
    (
        {
            name,
            value,
            className,
            label,
            type,
            disabled,
            isTextArea,
            defaultValue,
            onChange,
            ...otherProps
        },
        ref
    ) => {
        const Component = isTextArea ? TextArea : Input;
        const dispatch = useDispatch();
        const state = useSelector(selectInputState(name));
        value = value ?? state ?? defaultValue;

        const handleChange = (e) => {
            onChange(e);
            dispatch(updateInput(name, e.target.value));
        };

        return (
            <>
                {label ? (
                    <label
                        htmlFor={`${name}__text-input`}
                        className="text-input-label"
                    >
                        {label}
                    </label>
                ) : null}
                <Component
                    id={`${name}__text-input`}
                    ref={ref}
                    className={`text-input ${className}`}
                    name={name}
                    type={type}
                    onChange={handleChange}
                    disabled={disabled}
                    value={value}
                    {...otherProps}
                />
            </>
        );
    }
);

TextInput.defaultProps = {
    className: '',
    label: '',
    type: 'text',
    disabled: false,
    isTextArea: false,
    defaultValue: '',
    onChange: () => {},
};

TextInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isTextArea: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    onChange: PropTypes.func,
};

export default TextInput;
