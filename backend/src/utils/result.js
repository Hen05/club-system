export default function Result (success, status, message, data) {
    if (success) {
        return {
            success: true,
            status,
            message,
            data
        }
    } else {
        return {
            success: false,
            status,
            message
        }
    }
}