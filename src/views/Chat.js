import React, { useState, useEffect, useContext, useRef } from 'react'
import { Context } from '../context/Context'


import ChatInput from '../components/lobby/ChatInput'
import ChatMessage from '../components/lobby/ChatMessage'

//Material UI

import { makeStyles } from '@material-ui/core/styles';

import {
    List,
    Box,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    chatRight: {
        textAlign: 'right'
    },
    chatLeft: {
        textAlign: 'left'
    },
    chatBox: {
        overflowY: 'scroll'
    },
    chatMessage: {
        width: '280px',
        maxWidth: '280px',
        overflowWrap: 'break-word'
    }
}))

const Chat = ({ socket, loading }) => {
    const classes = useStyles()

    //state
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    //context
    const { usernameValue } = useContext(Context)
    const { username } = usernameValue

    //refs
    const chatRef = useRef(null)

    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }

    useEffect(() => {
        if (!loading) {
            socket.on('newMessage', (newMessage) => {
                setMessages(messages => [...messages, newMessage])
                if (chatRef.current) {
                    scrollToBottom()
                }
            })
        }
    }, [loading, socket])

    useEffect(() => {
        if (!loading) {
            socket.on('userJoined', (username) => {
                const joinMessage = {
                        messageText:`${username} has joined`,
                        date: Date.now()
            }
                setMessages(messages => [...messages, joinMessage])
                if (chatRef.current) {
                    scrollToBottom()
                }
            })
        }
    }, [loading, socket])

    useEffect(() => {
        if (!loading) {
            socket.on('userLeft', (username) => {
                const leaveMessage = {
                        messageText:`${username} has left`,
                        date: Date.now()
            }
                setMessages(messages => [...messages, leaveMessage])
                if (chatRef.current) {
                    scrollToBottom()
                }
            })
        }
    }, [loading, socket])

    const sendMessage = (e) => {
        e.preventDefault()

        const newMessage = {
            username,
            messageText: input,
            date: Date.now()
        }
        if (input) {
            socket.emit('sendMessage', newMessage)
            setInput('')
        }
    }

    const messagesMap = messages.sort((a, b) => a.date - b.date).map((item, index) =>
        <ChatMessage messageClass={classes.chatMessage} messageUserClass={item.username === username ? classes.chatRight : classes.chatLeft} key={`message-${item.date}`} message={item} />
    )

    return (
        <Box border={1} borderRadius='borderRadius' p={2} position='relative' height={400}>
            <Box ref={chatRef} max-height='85%' height='85%' className={classes.chatBox}>
                <List >
                    {messagesMap}
                </List>
            </Box>
            <Box position='absolute' width='100%' bottom={0}>
                <ChatInput sendMessage={sendMessage} setInput={setInput} input={input} />
            </Box>
        </Box>
    )
}

export default Chat