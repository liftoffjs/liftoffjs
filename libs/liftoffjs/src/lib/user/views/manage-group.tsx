import * as React from 'react';
import { Card, FormField, MasterLayout, PageHeader, PageSubHeader, PrimaryButton } from '../../common';
import { Group } from '../entities';

export interface ManageGroupViewProps {
  group: Group;
}

export const ManageGroupView: React.FC<ManageGroupViewProps> = props => (
  <MasterLayout contain={true}>
    <PageHeader>Manage {props.group.name}</PageHeader>

    <PageSubHeader>Invite user</PageSubHeader>
    <Card>
      <lo-create-group-form>
        <FormField label="Invite user" for="usernameOrEmail" />
        <FormField label="Admin" for="admin" type="toggle" />
        <PrimaryButton>Send invite</PrimaryButton>
      </lo-create-group-form>
    </Card>

    <PageSubHeader>Manage users</PageSubHeader>
    <ul className="menu bg-base-100 w-56 rounded-box text-white">
      {props.group.userGroups.getItems().map(ug => {
        const link = <a href={`/group/${ug.group.id}`}>{ug.user.username}</a>;
        return <li key={ug.id}>{link} ({ug.role})</li>;
      })}
    </ul>
  </MasterLayout>
);
