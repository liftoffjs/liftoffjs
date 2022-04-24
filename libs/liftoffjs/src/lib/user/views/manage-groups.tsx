import * as React from 'react';
import { Card, FormField, MasterLayout, PageHeader, PrimaryButton } from '../../common';
import { UserGroup } from '../entities';

export interface ManageGroupsViewProps {
  userGroups: UserGroup[];
}

export const ManageGroupsView: React.FC<ManageGroupsViewProps> = props => (
  <MasterLayout contain={true}>
    <PageHeader>Manage Groups</PageHeader>
    <Card>
      <lo-create-group-form>
        <FormField label="Group name" for="name" />
        <PrimaryButton>Create new group</PrimaryButton>
      </lo-create-group-form>
    </Card>

    <ul className="menu bg-base-100 w-56 rounded-box text-white">
      {props.userGroups.map(ug => {
        const link = <a href={`/group/${ug.group.id}`}>{ug.group.name}</a>;
        return <li key={ug.id}>{link} ({ug.role})</li>;
      })}
    </ul>
  </MasterLayout>
);
