
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    Admin = "Admin",
    Member = "Member",
    Viewer = "Viewer"
}

export class CreateBoardInput {
    title: string;
    description?: Nullable<string>;
    color: string;
    workspace_id: string;
}

export class UpdateBoardInput {
    board_id: string;
    title?: Nullable<string>;
    description?: Nullable<string>;
    color?: Nullable<string>;
}

export class CreateListInput {
    title: string;
    board_id: string;
    position: number;
    color?: Nullable<string>;
}

export class UpdateListInput {
    list_id: string;
    title?: Nullable<string>;
    position?: Nullable<number>;
    color?: Nullable<string>;
}

export class CreateCardInput {
    title: string;
    list_id: string;
    description?: Nullable<string>;
    position: number;
    due_date?: Nullable<DateTime>;
}

export class UpdateCardInput {
    card_id: string;
    title?: Nullable<string>;
    description?: Nullable<string>;
    position?: Nullable<number>;
    due_date?: Nullable<DateTime>;
}

export class CreateLabelInput {
    name: string;
    color: string;
    board_id: string;
}

export class UpdateLabelInput {
    label_id: string;
    name?: Nullable<string>;
    color?: Nullable<string>;
}

export class LoginInput {
    email: string;
    password: string;
}

export class RegisterInput {
    username: string;
    email: string;
    password: string;
}

export class CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    user_id: string;
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class CreateWorkspaceInput {
    name: string;
    description?: Nullable<string>;
    color?: Nullable<string>;
}

export class UpdateWorkspaceInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    color?: Nullable<string>;
}

export class AddWorkspaceMemberInput {
    workspace_id: string;
    user_email: string;
    role?: Nullable<Role>;
}

export class UpdateMemberRoleInput {
    workspace_id: string;
    user_id: string;
    role: Role;
}

export class Board {
    board_id: string;
    title: string;
    description?: Nullable<string>;
    color: string;
    lists: List[];
    workspace_id: string;
}

export class List {
    list_id: string;
    title: string;
    position: number;
    color: string;
    board_id: string;
    cards?: Nullable<Nullable<Card>[]>;
}

export class Card {
    card_id: string;
    title: string;
    description?: Nullable<string>;
    position: number;
    list_id: string;
    labels?: Nullable<Nullable<Label>[]>;
    due_date?: Nullable<DateTime>;
    comments?: Nullable<Nullable<Comment>[]>;
    attachments?: Nullable<Nullable<Attachment>[]>;
    members?: Nullable<Nullable<CardMember>[]>;
}

export class Comment {
    comment_id: string;
    content: string;
    created_at: DateTime;
    card_id: string;
    user_id: string;
}

export class Label {
    label_id: string;
    name: string;
    color: string;
    workspace_id: string;
}

export class Attachment {
    attachment_id: string;
    card_id: string;
    url: string;
    filename: string;
}

export class CardLabel {
    card_id: string;
    label_id: string;
}

export class CardMember {
    card_id: string;
    user_id: string;
}

export abstract class IQuery {
    abstract boards(workspace_id: string): Nullable<Nullable<Board>[]> | Promise<Nullable<Nullable<Board>[]>>;

    abstract board(board_id: string): Nullable<Board> | Promise<Nullable<Board>>;

    abstract lists(board_id: string): Nullable<Nullable<List>[]> | Promise<Nullable<Nullable<List>[]>>;

    abstract list(list_id: string): Nullable<List> | Promise<Nullable<List>>;

    abstract cards(list_id: string): Nullable<Nullable<Card>[]> | Promise<Nullable<Nullable<Card>[]>>;

    abstract card(card_id: string): Nullable<Card> | Promise<Nullable<Card>>;

    abstract labels(workspace_id: string): Nullable<Nullable<Label>[]> | Promise<Nullable<Nullable<Label>[]>>;

    abstract comments(card_id: string): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(user_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract workspaces(): Nullable<Nullable<Workspace>[]> | Promise<Nullable<Nullable<Workspace>[]>>;

    abstract workspace(workspace_id: string): Nullable<Workspace> | Promise<Nullable<Workspace>>;

    abstract workspaceMembers(workspace_id: string): WorkspaceMembers[] | Promise<WorkspaceMembers[]>;
}

export class CreateBoardPayload {
    board?: Nullable<Board>;
}

export abstract class IMutation {
    abstract createBoard(input: CreateBoardInput): CreateBoardPayload | Promise<CreateBoardPayload>;

    abstract updateBoard(input: UpdateBoardInput): Board | Promise<Board>;

    abstract deleteBoard(board_id: string): Status | Promise<Status>;

    abstract createList(input: CreateListInput): List | Promise<List>;

    abstract updateList(input: UpdateListInput): List | Promise<List>;

    abstract deleteList(list_id: string): Status | Promise<Status>;

    abstract reorderLists(board_id: string, list_ids: string[]): List[] | Promise<List[]>;

    abstract createCard(input: CreateCardInput): Card | Promise<Card>;

    abstract updateCard(input: UpdateCardInput): Card | Promise<Card>;

    abstract deleteCard(card_id: string): Status | Promise<Status>;

    abstract moveCard(card_id: string, list_id: string, position: number): Card | Promise<Card>;

    abstract createLabel(input: CreateLabelInput): Label | Promise<Label>;

    abstract updateLabel(input: UpdateLabelInput): Label | Promise<Label>;

    abstract deleteLabel(label_id: string): Status | Promise<Status>;

    abstract uploadFile(file: Upload): FileResponse | Promise<FileResponse>;

    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(input: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(user_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract login(input: LoginInput): Nullable<AuthResult> | Promise<Nullable<AuthResult>>;

    abstract register(input: RegisterInput): Nullable<AuthResult> | Promise<Nullable<AuthResult>>;

    abstract logout(): Status | Promise<Status>;

    abstract createWorkspace(input: CreateWorkspaceInput): Workspace | Promise<Workspace>;

    abstract updateWorkspace(workspace_id: string, input: UpdateWorkspaceInput): Workspace | Promise<Workspace>;

    abstract deleteWorkspace(workspace_id: string): Status | Promise<Status>;

    abstract pinWorkspace(workspace_id: string): PinWorkspacePayload | Promise<PinWorkspacePayload>;

    abstract unpinWorkspace(workspace_id: string): PinWorkspacePayload | Promise<PinWorkspacePayload>;

    abstract addWorkspaceMember(input: AddWorkspaceMemberInput): WorkspaceMembers | Promise<WorkspaceMembers>;

    abstract removeWorkspaceMember(workspace_id: string, user_id: string): Status | Promise<Status>;

    abstract updateMemberRole(input: UpdateMemberRoleInput): WorkspaceMembers | Promise<WorkspaceMembers>;
}

export class Success {
    successMessage?: Nullable<string>;
}

export class Error {
    errorMessage: string;
    code?: Nullable<string>;
}

export class FileResponse {
    success: boolean;
    url?: Nullable<string>;
    message?: Nullable<string>;
}

export class User {
    user_id: string;
    username: string;
    email: string;
    picture?: Nullable<string>;
    created_at: DateTime;
}

export class AuthSuccess {
    token: string;
    user: User;
}

export class AuthError {
    message: string;
    code?: Nullable<string>;
    field?: Nullable<string>;
}

export class Workspace {
    workspace_id: string;
    name: string;
    color: string;
    description?: Nullable<string>;
    owner_id: string;
    owner: User;
    members: WorkspaceMembers[];
    boards?: Nullable<Nullable<Board>[]>;
    labels?: Nullable<Nullable<Label>[]>;
    is_pinned: boolean;
}

export class WorkspaceMembers {
    workspace_id: string;
    user_id: string;
    role: string;
    user: User;
    workspace: Workspace;
}

export class PinWorkspacePayload {
    workspace: Workspace;
}

export type DateTime = any;
export type Upload = any;
export type Status = Success | Error;
export type AuthResult = AuthSuccess | AuthError;
type Nullable<T> = T | null;
