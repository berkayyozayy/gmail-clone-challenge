import React from 'react'
import './SendMail.css'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { closeSendMessage } from '../features/mailSlice'
import { useDispatch } from 'react-redux'
import { db } from '../db/Firebase'
import firebase from 'firebase'

function SendMail() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()

    const onSubmit = (formData) => {
        console.log(formData)
        db.collection('emails').add({
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        dispatch(closeSendMessage())
    }

    return (
        <div className='sendMail'>
            <div className='sendMail__header'>
                <h3>New Message</h3>
                <CloseIcon
                    className='sendMail__close'
                    onClick={() => dispatch(closeSendMessage())}
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('to', { required: true })}
                    type='email'
                    placeholder='To'
                />
                <input
                    {...register('subject', { required: true })}
                    type='text'
                    placeholder='Subject'
                />
                <input
                    {...register('message', { required: true })}
                    type='text'
                    placeholder='Message...'
                    className='sendMail__message'
                />

                <div className='sendMail__options'>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='sendMail__send'
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail
