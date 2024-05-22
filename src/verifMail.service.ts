import { Injectable } from "@nestjs/common";

@Injectable()
export class VerifMailService {
    
    isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
}

