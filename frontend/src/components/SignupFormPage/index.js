import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignUpForm';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);
    // console.log("showModal====>",showModal)
    return (
        <>
            <button className='loginButton' onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
