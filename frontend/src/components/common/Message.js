import React from 'react'
import { Message as MessageComponent} from 'semantic-ui-react'

const Message = ({title, message, type}) => {
    switch (type) {
        case 'info':
            return (
                <MessageComponent
                    info
                    header={title}
                    content={message}
                />
            );
        case 'warning':
            return (
                <MessageComponent
                    warning
                    header={title}
                    content={message}
                />
            );
        case 'success':
            return (
                <MessageComponent
                    success
                    header={title}
                    content={message}
                />
            );
        case 'negative':
            return (
                <MessageComponent
                    negative
                    header={title}
                    content={message}
                />
            );
        default:
            return (
                <MessageComponent
                    header={title}
                    content={message}
                />
            );
    }
}

export default Message