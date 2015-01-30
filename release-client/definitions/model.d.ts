declare module Model {
    class User {
        name: string;
        ip: string;
        id: string;
    }
    class Message {
        user: User;
        message: string;
    }
}
