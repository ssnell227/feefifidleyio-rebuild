import React from 'react'

//material UI
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
} from "@material-ui/core"

const ChatMessage = ({ message: { username, messageText, date } }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>{username.charAt(0).toUpperCase()+username.charAt(1)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={messageText} secondary={new Date(date).toLocaleTimeString('en-US')}/>
    </ListItem>
)

export default ChatMessage