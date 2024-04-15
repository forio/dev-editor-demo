import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectInputState } from 'selectors';
import { updateInput } from 'actions';

const cannotTTS = (string) =>
    string === '-' || string === '--' || string === '';

const Dropdown = forwardRef(
    (
        {
            name,
            options,
            value,
            className,
            label,
            disabled,
            tabDisabled,
            defaultOption,
            defaultValue,
            onChange,
            ...otherProps
        },
        ref
    ) => {
        const dispatch = useDispatch();

        const state = useSelector(selectInputState(name));
        value = value ?? state ?? defaultValue;

        const handleChange = (e) => {
            onChange(e);
            dispatch(updateInput(name, e.target.value));
        };

        return (
            <div className="dropdown">
                {label ? (
                    <label
                        htmlFor={`${name}__dropdown`}
                        className="dropdown-label"
                    >
                        {label}
                    </label>
                ) : null}
                <span className="select-wrapper">
                    <select
                        id={`${name}__dropdown`}
                        ref={ref}
                        className={className}
                        tabIndex={tabDisabled || disabled ? '-1' : '0'}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        {...otherProps}
                    >
                        {!defaultOption ? null : (
                            <option
                                value=""
                                disabled
                                aria-label={
                                    cannotTTS(defaultOption)
                                        ? 'No selection'
                                        : defaultOption
                                }
                            >
                                {defaultOption}
                            </option>
                        )}
                        {options.map(({ id, disabled, text, ariaLabel }) => (
                            <option
                                value={id}
                                key={id}
                                disabled={disabled}
                                aria-label={ariaLabel}
                            >
                                {text}
                            </option>
                        ))}
                    </select>
                    <span className="arrow" />
                </span>
            </div>
        );
    }
);

Dropdown.defaultProps = {
    className: '',
    options: [],
    label: '',
    tabDisabled: false,
    defaultValue: '',
    onChange: () => {},
};

Dropdown.propTypes = {
    name: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            text: PropTypes.string,
        })
    ),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    tabDisabled: PropTypes.bool,
    defaultOption: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

export default Dropdown;
