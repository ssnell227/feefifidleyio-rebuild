import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import { Context } from '../context/Context'


import ChatInput from '../components/lobby/ChatInput'
import ChatMessage from '../components/lobby/ChatMessage'

//Material UI

import { makeStyles } from '@material-ui/core/styles';

import {
    List,
    Box,
    Divider
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    chatRight: {
        position: 'absolute',
        right: '0px'
    },
    chatLeft: {
        position: 'absolute',
        left: '100px'
    },
    chatBox: {
        overflowY: 'scroll'
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
                scrollToBottom()
                console.log('rerender')
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
        <ChatMessage  messageClass={item.username === username ? classes.chatRight : classes.chatLeft} key={`message-${item.date}`}  message={item} />
    )

    return (
        <Box border={1} borderRadius='borderRadius' p={2} position='relative' height='100%'>
            <Box ref={chatRef} height='85%' className={classes.chatBox}>
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