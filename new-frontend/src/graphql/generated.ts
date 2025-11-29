import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddWorkspaceMemberInput = {
  role?: InputMaybe<Role>;
  user_email: Scalars['String']['input'];
  workspace_id: Scalars['ID']['input'];
};

export type Attachment = {
  __typename?: 'Attachment';
  attachment_id: Scalars['ID']['output'];
  filename: Scalars['String']['output'];
  mime_type?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type AuthError = {
  __typename?: 'AuthError';
  code?: Maybe<Scalars['String']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type AuthResult = AuthError | AuthSuccess;

export type AuthSuccess = {
  __typename?: 'AuthSuccess';
  token: Scalars['String']['output'];
  user: User;
};

export type Board = {
  __typename?: 'Board';
  board_id: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  created_by: User;
  description?: Maybe<Scalars['String']['output']>;
  labels: Array<Label>;
  lists: Array<List>;
  members: Array<User>;
  title: Scalars['String']['output'];
  workspace_id: Scalars['ID']['output'];
};

export type Card = {
  __typename?: 'Card';
  assignees: Array<User>;
  attachments: Array<Attachment>;
  card_id: Scalars['ID']['output'];
  comments: Array<Comment>;
  description?: Maybe<Scalars['String']['output']>;
  due_date?: Maybe<Scalars['DateTime']['output']>;
  labels: Array<Label>;
  list_id: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  card_id: Scalars['ID']['output'];
  comment_id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type CreateBoardInput = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  workspace_id: Scalars['ID']['input'];
};

export type CreateCardInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['DateTime']['input']>;
  list_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreateLabelInput = {
  board_id: Scalars['ID']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateListInput = {
  board_id: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWorkspaceInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['String']['output']>;
  errorMessage: Scalars['String']['output'];
};

export type FileResponse = {
  __typename?: 'FileResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Label = {
  __typename?: 'Label';
  board_id: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  label_id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type List = {
  __typename?: 'List';
  board_id: Scalars['ID']['output'];
  cards: Array<Card>;
  color?: Maybe<Scalars['String']['output']>;
  list_id: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAssigneeToCard: Card;
  addLabelToCard: Card;
  createBoard: Board;
  createCard: Card;
  createLabel: Label;
  createList: List;
  createUser?: Maybe<User>;
  createWorkspace: Workspace;
  deleteBoard: Status;
  deleteCard: Status;
  deleteLabel: Status;
  deleteList: Status;
  deleteUser?: Maybe<User>;
  deleteWorkspace: Status;
  inviteMemberToWorkspace: WorkspaceMembers;
  login?: Maybe<AuthResult>;
  logout: Status;
  moveCard: Card;
  moveList: List;
  pinWorkspace: Workspace;
  register?: Maybe<AuthResult>;
  removeAssigneeFromCard: Card;
  removeLabelFromCard: Card;
  removeWorkspaceMember: Status;
  unpinWorkspace: Workspace;
  updateBoard: Board;
  updateCardContent: Card;
  updateList: List;
  updateMemberRole: WorkspaceMembers;
  updateUser?: Maybe<User>;
  updateWorkspace: Workspace;
  uploadFile: FileResponse;
};


export type MutationAddAssigneeToCardArgs = {
  card_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationAddLabelToCardArgs = {
  card_id: Scalars['ID']['input'];
  label_id: Scalars['ID']['input'];
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateCardArgs = {
  input: CreateCardInput;
};


export type MutationCreateLabelArgs = {
  input: CreateLabelInput;
};


export type MutationCreateListArgs = {
  input: CreateListInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationDeleteBoardArgs = {
  board_id: Scalars['ID']['input'];
};


export type MutationDeleteCardArgs = {
  card_id: Scalars['ID']['input'];
};


export type MutationDeleteLabelArgs = {
  label_id: Scalars['ID']['input'];
};


export type MutationDeleteListArgs = {
  list_id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  user_id: Scalars['ID']['input'];
};


export type MutationDeleteWorkspaceArgs = {
  workspace_id: Scalars['ID']['input'];
};


export type MutationInviteMemberToWorkspaceArgs = {
  email: Scalars['String']['input'];
  role: Role;
  workspace_id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMoveCardArgs = {
  card_id: Scalars['ID']['input'];
  list_id: Scalars['ID']['input'];
  new_position: Scalars['Int']['input'];
};


export type MutationMoveListArgs = {
  list_id: Scalars['ID']['input'];
  new_position: Scalars['Int']['input'];
};


export type MutationPinWorkspaceArgs = {
  workspace_id: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveAssigneeFromCardArgs = {
  card_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationRemoveLabelFromCardArgs = {
  card_id: Scalars['ID']['input'];
  label_id: Scalars['ID']['input'];
};


export type MutationRemoveWorkspaceMemberArgs = {
  user_id: Scalars['ID']['input'];
  workspace_id: Scalars['ID']['input'];
};


export type MutationUnpinWorkspaceArgs = {
  workspace_id: Scalars['ID']['input'];
};


export type MutationUpdateBoardArgs = {
  board_id: Scalars['ID']['input'];
  input: UpdateBoardInput;
};


export type MutationUpdateCardContentArgs = {
  card_id: Scalars['ID']['input'];
  input: UpdateCardInput;
};


export type MutationUpdateListArgs = {
  input: UpdateListInput;
  list_id: Scalars['ID']['input'];
};


export type MutationUpdateMemberRoleArgs = {
  input: UpdateMemberRoleInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWorkspaceArgs = {
  input: UpdateWorkspaceInput;
  workspace_id: Scalars['ID']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type PinWorkspacePayload = {
  __typename?: 'PinWorkspacePayload';
  workspace: Workspace;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards: Array<Board>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  workspace?: Maybe<Workspace>;
  workspaceMembers: Array<WorkspaceMembers>;
  workspaces?: Maybe<Array<Maybe<Workspace>>>;
};


export type QueryBoardArgs = {
  board_id: Scalars['ID']['input'];
};


export type QueryBoardsArgs = {
  workspace_id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  user_id: Scalars['ID']['input'];
};


export type QueryWorkspaceArgs = {
  workspace_id: Scalars['ID']['input'];
};


export type QueryWorkspaceMembersArgs = {
  workspace_id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum Role {
  Admin = 'Admin',
  Member = 'Member',
  Viewer = 'Viewer'
}

export type Status = Error | Success;

export type Success = {
  __typename?: 'Success';
  successMessage?: Maybe<Scalars['String']['output']>;
};

export type UpdateBoardInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateListInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMemberRoleInput = {
  role: Role;
  user_id: Scalars['ID']['input'];
  workspace_id: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkspaceInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Workspace = {
  __typename?: 'Workspace';
  boards: Array<Board>;
  color: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  is_pinned: Scalars['Boolean']['output'];
  labels: Array<Label>;
  members: Array<WorkspaceMembers>;
  name: Scalars['String']['output'];
  owner: User;
  owner_id: Scalars['ID']['output'];
  workspace_id: Scalars['ID']['output'];
};

export type WorkspaceMembers = {
  __typename?: 'WorkspaceMembers';
  role: Role;
  user: User;
  user_id: Scalars['ID']['output'];
  workspace: Workspace;
  workspace_id: Scalars['ID']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?:
    | { __typename: 'AuthError', message: string, code?: string | null }
    | { __typename: 'AuthSuccess', token: string, user: { __typename?: 'User', user_id: string, username: string, email: string } }
   | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?:
    | { __typename: 'AuthError', message: string, code?: string | null, field?: string | null }
    | { __typename: 'AuthSuccess', token: string, user: { __typename?: 'User', user_id: string, username: string } }
   | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;