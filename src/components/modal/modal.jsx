import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal as closeModalAction } from 'actions';
import { selectModalOpen } from 'selectors';

// Buttons with form method "dialog" automatically close the modal and therefore
// they do not need to dispatch the closeModal action in their click handlers.
// If all the button does is close the modal, it does not need a click handler at all.
const ModalButtons = ({ buttons }) => (
    <form method="dialog">
        {buttons.map(({ text, ...rest }, index) => (
            <button key={index} type="submit" {...rest}>
                {text}
            </button>
        ))}
    </form>
);

const Modal = ({ className = '', name, unavoidable, children, buttons }) => {
    const shouldOpen = useSelector(selectModalOpen(name));
    const dialogRef = useRef();
    const isOpen = dialogRef.current?.open;
    const dispatch = useDispatch();
    const closeModal = () => dispatch(closeModalAction(name));

    useEffect(() => {
        if (shouldOpen && !isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [shouldOpen]);

    const handleCancel = (e) => {
        if (unavoidable) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleClick = (e) => {
        if (e.target === dialogRef.current && !unavoidable) {
            dialogRef.current.close();
        }
    };

    return (
        <dialog
            id={name}
            className={`modal-wrapper ${className}`}
            ref={dialogRef}
            onClose={closeModal}
            onClick={handleClick}
            onCancel={handleCancel}
        >
            <div className="modal" tabIndex={-1} autoFocus>
                {/* Provide 'closeModal' and the isOpen value for convenience */}
                {typeof children === 'function'
                    ? children(closeModal, isOpen)
                    : children}
                {!!buttons.length && <ModalButtons buttons={buttons} />}
            </div>
        </dialog>
    );
};

ModalButtons.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            onClick: PropTypes.func,
        }),
    ),
};

Modal.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    unavoidable: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.node,
                PropTypes.arrayOf(PropTypes.node),
            ])
        ),
        PropTypes.node,
        PropTypes.func,
    ]).isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            onClick: PropTypes.func,
        })
    ),
};

export default Modal;
