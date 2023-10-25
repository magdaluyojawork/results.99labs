import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import SherbotOptions from "./components/SherbotOptions/SherbotOptions";
import DownloadLabResult from "./components/DownloadLabResult/DownloadLabResult";
import BotAvatar from "./components/BotAvatar";
import { ChatResponse } from "./components/ChatResponse";
//import TalkLinks from "./components/TalkLinks/TalkLinks";

const config = {
    botName: "Ninety9 Labs",
    initialMessages: [
        createChatBotMessage("Are you here to view your batch record?", {
            widget: "sherbotOptions",
            withAvatar: true,
        }),
    ],
    //initialMessages property from the config is put into 
    //the chatbot's internal state in a property called "messages"

    customComponents: {
        botAvatar: (props) => <BotAvatar {...props} />,
    },

    customStyles: {
        botMessageBox: {
            backgroundColor: '#000000',
        },
        chatButton: {
            backgroundColor: '#000000',
        },
    },

    widgets: [
        {
            widgetName: "sherbotOptions",
            widgetFunc: (props) => <SherbotOptions {...props} />,
        },

        {
            widgetName: "downloadLabResult",
            widgetFunc: (props) => <DownloadLabResult {...props} />,
            props: {
                options: [
                    {
                        text: "Click to download",
                        url: ChatResponse.FileURL,
                        id: 1,
                    },
                ],
            },
        },
    ],
}

export default config;