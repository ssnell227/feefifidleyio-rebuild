import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context/Context'


import ChatInput from '../components/lobby/ChatInput'
import ChatMessage from '../components/lobby/ChatMessage'

//Material UI

import {
    Container,
    List
} from '@material-ui/core'

const Chat = ({ socket, loading }) => {
    //state
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    //context
    const { usernameValue } = useContext(Context)
    const { username } = usernameValue

    useEffect(() => {
        if (!loading) {
            socket.on('newMessage', (newMessage) => {
                const newMessages = [...messages, newMessage]
                setMessages(newMessages)
            })
        }
    }, [messages, loading, socket])

    const sendMessage = (e) => {
        e.preventDefault()

        const newMessage = {
            username,
            messageText: input,
            date: Date.now()
        }
        socket.emit('sendMessage', newMessage)

        setInput('')
    }

    



    const messagesMap = messages.sort((a,b) => a.date-b.date).map((item, index) => <ChatMessage key={`message-${index}`} message={item} />)

    return (
        <Container>
            <List>
                {messagesMap}
            </List>
            <ChatInput sendMessage={sendMessage} setInput={setInput} input={input} />
        </Container>
    )
}

export default Chat