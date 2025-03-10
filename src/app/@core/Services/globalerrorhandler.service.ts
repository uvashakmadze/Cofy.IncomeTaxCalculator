import { Injectable, ErrorHandler } from "@angular/core";

@Injectable()

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.error('Global Handler: ', error);
    }
}

// There are 3 different approach to implement global handler:
// 1. Custom global error handler like in this example
// 2. HttpInterceptor that handles http errors globaly
// 3. Component-level Error Handling when we have handleError(error: Error) method in the particular component