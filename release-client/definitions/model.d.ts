declare module Model {
    class User {
        constructor(name: string, ip: string, id: string);
        name: string;
        ip: string;
        id: string;
    }
    class Message {
        user: User;
        message: string;
        constructor(user: Model.User, message: string);
    }
}
