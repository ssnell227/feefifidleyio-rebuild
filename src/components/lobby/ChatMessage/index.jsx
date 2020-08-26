import React from 'react'

//material UI
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Box
} from "@material-ui/core"

const ChatMessage = ({ messageClass, message: { username, messageText, date } }) => (
    <ListItem >
        <ListItemAvatar>
            <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${username}.svg`}>{username.charAt(0).toUpperCase() + username.charAt(1)}</Avatar>
        </ListItemAvatar>
        <ListItemText className={messageClass} primary={messageText} secondary={new Date(date).toLocaleTimeString('en-US')} />
    </ListItem>
)

export default ChatMessage