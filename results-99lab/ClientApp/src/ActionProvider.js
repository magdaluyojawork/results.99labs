import { createClientMessage } from 'react-chatbot-kit';
import { ChatResponse } from "./components/ChatResponse";
// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage,  setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;

    }
    //function to render message and widgets when gaming sherbot option is clicked
    handleYes = () => {

        ChatResponse.ModalShow = true;

        const message1 = this.createChatBotMessage("Great, what is your name so we can properly address you?", {
            loading: true,
        });

        const message2 = createClientMessage(ChatResponse.Yes);
        this.updateChatbotState(message2);
        this.updateChatbotState(message1);
        ChatResponse.Step = 1;
    };
    askEmailAdd = () => {
        const message1 = this.createChatBotMessage(`Hello, ${ChatResponse.Name}. Thank you, can we please have a good email address to reach you?`, {
                loading:true,
        });
        this.updateChatbotState(message1);
    }
    handleInvalidEmail = () => {
        const message1 = this.createChatBotMessage(
            'Info! Please enter a valid Email Address.'
        );
        this.updateChatbotState(message1);
    }
    askOrderNo = () => {
        const message1 = this.createChatBotMessage('Thank you.');
        const message2 = this.createChatBotMessage('What is the batch number on your product? (It should be located on a white sticker on the packaging)', { withAvatar: true});
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
    }
    handleSearchBatchNo = () => {
        fetch('api/LabResult', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: ChatResponse.Email,
                BatchNo: ChatResponse.BatchNo,
                Name: ChatResponse.Name,
                LabResultFilename: "",
                IsSuccess: true,
            })
        })
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                if (!result.isSuccess && result.labResultFilename === "") {
                    this.handleLabBatchNoNotFound();
                }
                else if (!result.isSuccess && result.labResultFilename !== "") {
                    this.handleExceptionError();
                } else {
                    this.handleLabBatchNoFound(result);
                }
            })
            .catch(error => console.log('error', error));
    }
    handleLabBatchNoFound = (result) => {
        var labResultURL = process.env.REACT_APP_URL + "Lab Results/" + result.labResultFilename;
        //var labResultURL = "/Lab Result/" + result.labResultFilename;
        ChatResponse.FileURL = labResultURL;
        const message1 = this.createChatBotMessage("Click the link below to view results.",
            {
                //widget: "downloadLabResult",
                withAvatar: true,
            });

        this.updateChatbotState(message1);
        ChatResponse.Step = 0;
        ChatResponse.Name = "";
        ChatResponse.Email = "";
        ChatResponse.BatchNo = "";
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i))
            window.open("https://docs.google.com/viewerng/viewer?url="+labResultURL, '_blank', 'noreferrer');
        else
            window.open(labResultURL, '_blank', 'noreferrer');

        setTimeout(() => {
            //const list = document.getElementsByTagName("a");
            //list[list.length - 2].href = labResultURL;
            //list[list.length - 2].innerHTML = result.labResultFilename;

            const message = this.createChatBotMessage("Are you here to view your batch record ? ", {
                widget: "sherbotOptions",
                withAvatar: true,
            });
            this.updateChatbotState(message);

            const list2 = document.getElementsByClassName("react-chatbot-kit-chat-bot-message"); 
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)) {
                list2[list2.length - 1].innerHTML = "<a href='https://docs.google.com/viewerng/viewer?url=" + labResultURL + "' target='_blank'>" + result.labResultFilename + "</a>";
            } else {
                list2[list2.length - 1].innerHTML = "<a href='" + labResultURL + "' target='_blank'>" + result.labResultFilename + "</a>";
            }
            
        }, 2000);
    }
    handleLabBatchNoNotFound = () => {
        const message1 = this.createChatBotMessage('Batch No. was not found. Please try again.',
            {
                //widget: "invalidOrderNo",
                withAvatar: true,
            }
        );
        this.updateChatbotState(message1);
    }
    handleExceptionError = () => {
        const message1 = this.createChatBotMessage('There was an error while processing your request. Please contact Administrator.',
            {
                //widget: "invalidOrderNo",
                withAvatar: true,
            }
        );
        this.updateChatbotState(message1);
    }
    updateChatbotState(message) {
        // NOTE: This function is set in the constructor, and is passed in 
        //from the top level Chatbot component. The setState function here     
        // actually manipulates the top level state of the Chatbot, so it's 
        //important that we make sure that we preserve the previous state.
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
    
}

export default ActionProvider;