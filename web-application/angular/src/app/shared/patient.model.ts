/**
 * Data model for the patient cobject
 */
export class Patient {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    address: string;
    phone: string;
    birthday: string;
    sex: string;
    ssn: string;
    allergies: string;
    ec: string;
    ecPhone: string;
    ecRelationship:string;
    password: string;
    confirmPassword:string;
    anemia: boolean;
    asthma:boolean;
    arthritis: boolean;
    cancer: boolean;
    gout: boolean;
    diabetes: boolean;
    emotionalDisorder: boolean;
    epilepsy: boolean;
    fainting: boolean;
    gallstones: boolean;
    heartDisease: boolean;
    heartAttack: boolean;
    rheumaticFever: boolean;
    highBP: boolean;
    digestiveProblems: boolean;
    ulcerative: boolean;
    ulcerDisease: boolean;
    hepatitis: boolean;
    kidneyDiseases: boolean;
    liverDisease: boolean;
    sleepApnea: boolean;
    papMachine: boolean;
    thyroid: boolean;
    tuberculosis: boolean;
    venereal: boolean;
    neurologicalDisorders: boolean;
    bleedingDisorders: boolean;
    lungDisease: boolean;
    emphysema: boolean;
    none: boolean;
    drink: string;
    smoke: string;
}