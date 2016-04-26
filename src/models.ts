'use strict';


interface Message {
    name: string,
    message: string
}

export class UserMessage implements Message {
    private data: { name: string, message: string };

    constructor(payload: string) {
        var data = JSON.parse(payload);

        if (!data.name || !data.message) {
            throw new Error("some error")
        }

        this.data = data;
    }


    public get name(): string {
        return this.data.name;
    }

    public get message(): string {
        return this.data.message;
    }

}