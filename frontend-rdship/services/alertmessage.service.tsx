import { Alert, Stack } from "@mui/material";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

export class AlertMessageService {

    messages: Array<any> = [];

    addError = (message: any) => {
        this.messages.push({ type: 'error', message: message });
        return this
    }

    addWarning = (message: any) => {
        this.messages.push({ type: 'warning', message: message });
        return this
    }

    addInfo = (message: any) => {
        this.messages.push({ type: 'info', message: message });
        return this
    }

    addSuccess = (message: any) => {
        this.messages.push({ type: 'success', message: message });
        return this
    }

    show = () => {
        let alertElement: any = document.getElementById('alert-message');
        const root = createRoot(alertElement);
        this.messages.forEach((element: any, i: number) => {
            root.render(<Alert severity={element?.type}>{element?.message}</Alert>);
        });
        setTimeout(() => {
            root.unmount();
        }, 3000);
    }

}