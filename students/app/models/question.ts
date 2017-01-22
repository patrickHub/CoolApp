export class Choice{
    constructor(public title: string, public isAnswer: boolean = false){}
}

export class Question {

    public description: string;
    public choices: any = [];
    public poll: string;
    
}