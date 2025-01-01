const errorMessage: { [key: number]: string } = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    490: 'Requested column does not exist',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
};

export default errorMessage;