export default class CommentData {
    identifier: string;
    username: string;
    commentPanelData: any;
    commentDrawerData: any;
    constructor(identifier: string, username: string);
    init(cb?: any): void;
}
