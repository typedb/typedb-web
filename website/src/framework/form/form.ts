export interface NameEmailForm {
    firstName: string;
    lastName: string;
    email: string;
}

export interface ResourceAccessForm extends NameEmailForm {
    companyName: string;
    jobFunction: string;
}
