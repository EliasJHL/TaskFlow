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
  members: Array<WorkspaceMembers>;
  title: Scalars['String']['output'];
  workspace_id: Scalars['ID']['output'];
};

export type Card = {
  __typename?: 'Card';
  attachments: Array<Attachment>;
  card_id: Scalars['ID']['output'];
  card_members: Array<User>;
  checklists: Array<Checklist>;
  comments: Array<Comment>;
  description?: Maybe<Scalars['String']['output']>;
  due_date?: Maybe<Scalars['DateTime']['output']>;
  labels: Array<Label>;
  list_id: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Checklist = {
  __typename?: 'Checklist';
  card_id: Scalars['ID']['output'];
  checklist_id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  is_completed: Scalars['Boolean']['output'];
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

export type CreateChecklistInput = {
  card_id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
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
  createChecklist: Checklist;
  createLabel: Label;
  createList: List;
  createUser?: Maybe<User>;
  createWorkspace: Workspace;
  deleteBoard: Status;
  deleteCard: Status;
  deleteChecklist: Status;
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


export type MutationCreateChecklistArgs = {
  input: CreateChecklistInput;
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


export type MutationDeleteChecklistArgs = {
  checklist_id: Scalars['ID']['input'];
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
  card?: Maybe<Card>;
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


export type QueryCardArgs = {
  card_id: Scalars['ID']['input'];
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
  role?: Maybe<Role>;
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

export type GetBoardFullQueryVariables = Exact<{
  board_id: Scalars['ID']['input'];
}>;


export type GetBoardFullQuery = { __typename?: 'Query', board?: { __typename?: 'Board', board_id: string, title: string, color: string, description?: string | null, workspace_id: string, labels: Array<{ __typename?: 'Label', label_id: string, name: string, color: string }>, lists: Array<{ __typename?: 'List', list_id: string, title: string, position: number, cards: Array<{ __typename?: 'Card', card_id: string, title: string, position: number, description?: string | null, due_date?: any | null, labels: Array<{ __typename?: 'Label', label_id: string, name: string, color: string }>, card_members: Array<{ __typename?: 'User', user_id: string, username: string, picture?: string | null }> }> }>, members: Array<{ __typename?: 'WorkspaceMembers', user: { __typename?: 'User', user_id: string, username: string, picture?: string | null } }> } | null };

export type CreateListMutationVariables = Exact<{
  input: CreateListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'List', list_id: string, title: string, position: number } };

export type CreateCardMutationVariables = Exact<{
  input: CreateCardInput;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'Card', card_id: string, title: string, position: number, list_id: string } };

export type CreateLabelMutationVariables = Exact<{
  input: CreateLabelInput;
}>;


export type CreateLabelMutation = { __typename?: 'Mutation', createLabel: { __typename?: 'Label', label_id: string, name: string, color: string } };

export type MoveListMutationVariables = Exact<{
  list_id: Scalars['ID']['input'];
  new_position: Scalars['Int']['input'];
}>;


export type MoveListMutation = { __typename?: 'Mutation', moveList: { __typename?: 'List', list_id: string, position: number } };

export type MoveCardMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  list_id: Scalars['ID']['input'];
  new_position: Scalars['Int']['input'];
}>;


export type MoveCardMutation = { __typename?: 'Mutation', moveCard: { __typename?: 'Card', card_id: string, list_id: string, position: number } };

export type GetCardDetailsQueryVariables = Exact<{
  card_id: Scalars['ID']['input'];
  workspace_id: Scalars['ID']['input'];
}>;


export type GetCardDetailsQuery = { __typename?: 'Query', card?: { __typename?: 'Card', card_id: string, title: string, description?: string | null, due_date?: any | null, position: number, list_id: string, labels: Array<{ __typename?: 'Label', label_id: string, name: string, color: string }>, card_members: Array<{ __typename?: 'User', user_id: string, username: string, picture?: string | null }>, comments: Array<{ __typename?: 'Comment', comment_id: string, content: string, created_at: any, author: { __typename?: 'User', username: string, picture?: string | null } }>, checklists: Array<{ __typename?: 'Checklist', checklist_id: string, content: string, is_completed: boolean }> } | null };

export type UpdateCardFullMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  input: UpdateCardInput;
}>;


export type UpdateCardFullMutation = { __typename?: 'Mutation', updateCardContent: { __typename?: 'Card', card_id: string, title: string, description?: string | null, due_date?: any | null } };

export type UpdateCardContentMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  input: UpdateCardInput;
}>;


export type UpdateCardContentMutation = { __typename?: 'Mutation', updateCardContent: { __typename?: 'Card', card_id: string, title: string, description?: string | null, due_date?: any | null } };

export type AddLabelToCardMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  label_id: Scalars['ID']['input'];
}>;


export type AddLabelToCardMutation = { __typename?: 'Mutation', addLabelToCard: { __typename?: 'Card', card_id: string, labels: Array<{ __typename?: 'Label', label_id: string }> } };

export type RemoveLabelFromCardMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  label_id: Scalars['ID']['input'];
}>;


export type RemoveLabelFromCardMutation = { __typename?: 'Mutation', removeLabelFromCard: { __typename?: 'Card', card_id: string, labels: Array<{ __typename?: 'Label', label_id: string }> } };

export type AddAssigneeToCardMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
}>;


export type AddAssigneeToCardMutation = { __typename?: 'Mutation', addAssigneeToCard: { __typename?: 'Card', card_id: string, card_members: Array<{ __typename?: 'User', user_id: string }> } };

export type RemoveAssigneeFromCardMutationVariables = Exact<{
  card_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
}>;


export type RemoveAssigneeFromCardMutation = { __typename?: 'Mutation', removeAssigneeFromCard: { __typename?: 'Card', card_id: string, card_members: Array<{ __typename?: 'User', user_id: string }> } };

export type GetUserWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserWorkspacesQuery = { __typename?: 'Query', workspaces?: Array<{ __typename?: 'Workspace', workspace_id: string, name: string, description?: string | null, color: string, is_pinned: boolean, owner: { __typename?: 'User', username: string, picture?: string | null }, members: Array<{ __typename?: 'WorkspaceMembers', role: Role }> } | null> | null };

export type CreateWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace: { __typename?: 'Workspace', workspace_id: string, name: string, color: string } };

export type GetWorkspaceDetailsQueryVariables = Exact<{
  workspace_id: Scalars['ID']['input'];
}>;


export type GetWorkspaceDetailsQuery = { __typename?: 'Query', workspace?: { __typename?: 'Workspace', workspace_id: string, name: string, description?: string | null, color: string, owner: { __typename?: 'User', username: string }, members: Array<{ __typename?: 'WorkspaceMembers', role: Role, user: { __typename?: 'User', user_id: string, username: string, picture?: string | null } }>, boards: Array<{ __typename?: 'Board', board_id: string, title: string, color: string, description?: string | null }>, labels: Array<{ __typename?: 'Label', label_id: string, name: string, color: string }> } | null };

export type CreateBoardMutationVariables = Exact<{
  input: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', board_id: string, title: string, description?: string | null, color: string, created_by: { __typename?: 'User', username: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', user_id: string, username: string, email: string, picture?: string | null } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetBoardFullDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBoardFull"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"board_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"board_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"board_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"workspace_id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"due_date"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBoardFullQuery, GetBoardFullQueryVariables>;
export const CreateListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<CreateListMutation, CreateListMutationVariables>;
export const CreateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"list_id"}}]}}]}}]} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const CreateLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLabelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CreateLabelMutation, CreateLabelMutationVariables>;
export const MoveListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_position"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list_id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<MoveListMutation, MoveListMutationVariables>;
export const MoveCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"list_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_position"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"list_id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<MoveCardMutation, MoveCardMutationVariables>;
export const GetCardDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCardDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workspace_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"workspace_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workspace_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"due_date"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"list_id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklist_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"is_completed"}}]}}]}}]}}]} as unknown as DocumentNode<GetCardDetailsQuery, GetCardDetailsQueryVariables>;
export const UpdateCardFullDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardFull"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCardContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"due_date"}}]}}]}}]} as unknown as DocumentNode<UpdateCardFullMutation, UpdateCardFullMutationVariables>;
export const UpdateCardContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCardContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"due_date"}}]}}]}}]} as unknown as DocumentNode<UpdateCardContentMutation, UpdateCardContentMutationVariables>;
export const AddLabelToCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLabelToCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLabelToCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"label_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}}]}}]}}]}}]} as unknown as DocumentNode<AddLabelToCardMutation, AddLabelToCardMutationVariables>;
export const RemoveLabelFromCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveLabelFromCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeLabelFromCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"label_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveLabelFromCardMutation, RemoveLabelFromCardMutationVariables>;
export const AddAssigneeToCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAssigneeToCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAssigneeToCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"card_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]}}]} as unknown as DocumentNode<AddAssigneeToCardMutation, AddAssigneeToCardMutationVariables>;
export const RemoveAssigneeFromCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAssigneeFromCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAssigneeFromCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"card_members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAssigneeFromCardMutation, RemoveAssigneeFromCardMutationVariables>;
export const GetUserWorkspacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserWorkspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"is_pinned"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserWorkspacesQuery, GetUserWorkspacesQueryVariables>;
export const CreateWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkspaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]} as unknown as DocumentNode<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;
export const GetWorkspaceDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkspaceDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workspace_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workspace_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workspace_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorkspaceDetailsQuery, GetWorkspaceDetailsQueryVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;