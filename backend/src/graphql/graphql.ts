
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum BoardType {
    KANBAN = "KANBAN",
    WHITEBOARD = "WHITEBOARD"
}

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
    type: BoardType;
    whiteboard_data?: Nullable<string>;
}

export class UpdateBoardInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    color?: Nullable<string>;
    whiteboard_data?: Nullable<string>;
}

export class CreateListInput {
    title: string;
    board_id: string;
    color?: Nullable<string>;
}

export class CreateLabelInput {
    name: string;
    color: string;
    board_id: string;
}

export class UpdateListInput {
    title?: Nullable<string>;
    color?: Nullable<string>;
}

export class CreateCardInput {
    title: string;
    list_id: string;
    description?: Nullable<string>;
    due_date?: Nullable<DateTime>;
    color?: Nullable<string>;
}

export class UpdateCardInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    due_date?: Nullable<DateTime>;
}

export class CreateChecklistInput {
    content: string;
    card_id: string;
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

export abstract class ISubscription {
    abstract boardEvent(board_id: string): BoardEventPayload | Promise<BoardEventPayload>;
}

export class ListCreatedEvent {
    board_id: string;
    actor_user_id: string;
    list: List;
}

export class ListDeletedEvent {
    board_id: string;
    actor_user_id: string;
    list_id: string;
}

export class ListMovedEvent {
    board_id: string;
    actor_user_id: string;
    list_id: string;
    position: number;
}

export class CardCreatedEvent {
    board_id: string;
    actor_user_id: string;
    card: Card;
}

export class CardDeletedEvent {
    board_id: string;
    actor_user_id: string;
    card_id: string;
    list_id: string;
}

export class CardMovedEvent {
    board_id: string;
    actor_user_id: string;
    card_id: string;
    from_list_id: string;
    to_list_id: string;
    position: number;
}

export class LabelCreatedEvent {
    board_id: string;
    actor_user_id: string;
    label: Label;
}

export class LabelDeletedEvent {
    board_id: string;
    actor_user_id: string;
    label_id: string;
}

export class LabelAddedToCardEvent {
    board_id: string;
    actor_user_id: string;
    card_id: string;
    label_id: string;
}

export class LabelRemovedFromCardEvent {
    board_id: string;
    actor_user_id: string;
    card_id: string;
    label_id: string;
}

export class AssigneeAddedToCardEvent {
    board_id: string;
    actor_user_id: string;
    card_id: string;
    user_id: string;
}

export class AssigneeRemovedFromCardEvent {
    board_id: string;
    actor_user_id: string;
    card_id: string;
    user_id: string;
}

export class WhiteboardUpdatedEvent {
    board_id: string;
    actor_user_id: string;
    whiteboard_data: string;
}

export class Board {
    board_id: string;
    title: string;
    description?: Nullable<string>;
    color: string;
    workspace_id: string;
    type: BoardType;
    whiteboard_data?: Nullable<string>;
    created_by: User;
    lists: List[];
    members: WorkspaceMembers[];
    labels: Label[];
}

export class List {
    list_id: string;
    title: string;
    position: number;
    color?: Nullable<string>;
    board_id: string;
    cards: Card[];
}

export class Card {
    card_id: string;
    title: string;
    description?: Nullable<string>;
    position: number;
    list_id: string;
    due_date?: Nullable<DateTime>;
    labels: Label[];
    comments: Comment[];
    attachments: Attachment[];
    card_members: User[];
    checklists: Checklist[];
}

export class Checklist {
    checklist_id: string;
    content: string;
    is_completed: boolean;
    card_id: string;
}

export class Comment {
    comment_id: string;
    content: string;
    created_at: DateTime;
    updated_at: DateTime;
    card_id: string;
    author: User;
}

export class Label {
    label_id: string;
    name: string;
    color: string;
    board_id: string;
}

export class Attachment {
    attachment_id: string;
    url: string;
    filename: string;
    mime_type?: Nullable<string>;
}

export abstract class IQuery {
    abstract board(board_id: string): Nullable<Board> | Promise<Nullable<Board>>;

    abstract boards(workspace_id: string): Board[] | Promise<Board[]>;

    abstract card(card_id: string, workspace_id: string): Nullable<Card> | Promise<Nullable<Card>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(user_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract workspaces(): Nullable<Nullable<Workspace>[]> | Promise<Nullable<Nullable<Workspace>[]>>;

    abstract workspace(workspace_id: string): Nullable<Workspace> | Promise<Nullable<Workspace>>;

    abstract workspaceMembers(workspace_id: string): WorkspaceMembers[] | Promise<WorkspaceMembers[]>;
}

export abstract class IMutation {
    abstract createBoard(input: CreateBoardInput): Board | Promise<Board>;

    abstract updateBoard(board_id: string, input: UpdateBoardInput): Board | Promise<Board>;

    abstract deleteBoard(board_id: string): Status | Promise<Status>;

    abstract createList(input: CreateListInput): List | Promise<List>;

    abstract updateList(list_id: string, input: UpdateListInput): List | Promise<List>;

    abstract deleteList(list_id: string): Status | Promise<Status>;

    abstract moveList(list_id: string, new_position: number): List | Promise<List>;

    abstract createCard(input: CreateCardInput): Card | Promise<Card>;

    abstract deleteCard(card_id: string): Status | Promise<Status>;

    abstract updateCardContent(card_id: string, input: UpdateCardInput): Card | Promise<Card>;

    abstract moveCard(card_id: string, list_id: string, new_position: number): Card | Promise<Card>;

    abstract createChecklist(input: CreateChecklistInput): Checklist | Promise<Checklist>;

    abstract deleteChecklist(checklist_id: string): Status | Promise<Status>;

    abstract addLabelToCard(card_id: string, label_id: string): Card | Promise<Card>;

    abstract removeLabelFromCard(card_id: string, label_id: string): Card | Promise<Card>;

    abstract addAssigneeToCard(card_id: string, user_id: string): Card | Promise<Card>;

    abstract removeAssigneeFromCard(card_id: string, user_id: string): Card | Promise<Card>;

    abstract createLabel(input: CreateLabelInput): Label | Promise<Label>;

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

    abstract pinWorkspace(workspace_id: string): Workspace | Promise<Workspace>;

    abstract unpinWorkspace(workspace_id: string): Workspace | Promise<Workspace>;

    abstract inviteMemberToWorkspace(workspace_id: string, email: string, role: Role): WorkspaceMembers | Promise<WorkspaceMembers>;

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
    boards: Board[];
    labels: Label[];
    is_pinned: boolean;
    role?: Nullable<Role>;
}

export class WorkspaceMembers {
    workspace_id: string;
    user_id: string;
    role: Role;
    user: User;
    workspace: Workspace;
}

export class PinWorkspacePayload {
    workspace: Workspace;
}

export type DateTime = any;
export type Upload = any;
export type BoardEventPayload = ListCreatedEvent | ListDeletedEvent | ListMovedEvent | CardCreatedEvent | CardDeletedEvent | CardMovedEvent | LabelCreatedEvent | LabelDeletedEvent | LabelAddedToCardEvent | LabelRemovedFromCardEvent | AssigneeAddedToCardEvent | AssigneeRemovedFromCardEvent | WhiteboardUpdatedEvent;
export type Status = Success | Error;
export type AuthResult = AuthSuccess | AuthError;
type Nullable<T> = T | null;
