export interface DonationData {
    id: number;
    info: string;
    iban: string;
    coffee: string;
    patreon: string;
    qr: string;
}
export interface Donation {
    id: number;
    info: PaymentInfo;
    iban: string;
    coffee: string;
    patreon: string;
    qr: string;
}
export interface PaymentInfo {
    organization: string;
    edrpou: string;
    iban: string;
    bank: string;
    purpose: string;
}
