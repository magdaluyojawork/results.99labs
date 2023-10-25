import { ChatResponse } from "./components/ChatResponse";
import validator from 'validator'
import requestOptions from "./RequestOptions";

class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase().trim();
        if (lowerCaseMessage.trim() === "") return; 

        if (ChatResponse.Step === 3) {
            ChatResponse.BatchNo = message.trim();
            this.actionProvider.handleSearchBatchNo();
        }
        if (ChatResponse.Step === 2) {
            if (validator.isEmail(message)) {
                ChatResponse.Email = message;
                ChatResponse.Step = 3;
                this.actionProvider.askOrderNo();
            } else {
                this.actionProvider.handleInvalidEmail();
            }
        }
        if (ChatResponse.Step === 1) {
            ChatResponse.Name = message;
            ChatResponse.Step = 2;
            this.actionProvider.askEmailAdd();
        }
    }
}

export default MessageParser;