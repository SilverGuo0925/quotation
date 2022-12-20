/* session time out countdown */
export const COUNTDOWN_INIT = 5; // 5 mins before session expired,
export const SESSION_EXPIRING: number = 0;
export const SESSION_EXPIRED: number = 1;

export class HttpStatus {
    public static BAD_REQUEST = 400;
    public static UNAUTHORIZED = 401;
    public static FORBIDDEN = 403;
    public static UNAVAILABLE = 503;
    public static CONFLICT = 409;
    public static INTERNAL_SERVER_ERROR = 505;
}

export class Messages {
    public static ERR_MSG_GENERIC = "System error occurred. Please contact administrator.";
    public static MSG_INVALID_ACCESS = "You are not allowed to access this function. Please verify your account status is Active.";
}

export const showDebugError = true;