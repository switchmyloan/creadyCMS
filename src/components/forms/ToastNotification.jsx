// components/ToastNotification.js
import { toast } from 'react-hot-toast';

const ToastNotification = {
    success: (message, duration = 5000) => {
        toast.success(message, { duration });
    },
    error: (message) => {
        toast.error(message);
    },
    warning: (message, duration = 5000,) => {
        toast.custom((t) => (
            <div
                style={{
                    background: '#FFA500', // Orange for warning
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '4px',
                }}
            >
                {message}
            </div>
        ), { duration });
    }
};

export default ToastNotification;
