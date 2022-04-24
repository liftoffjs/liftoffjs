import * as React from 'react';
import { Card, FormField, MasterLayout, PageHeader, PrimaryButton, Table, Tbody, Td, Th, Thead, Tr } from '../../common';
import { UserGroup, UserGroupRole } from '../entities';

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

    <Table>
      <Thead>
        <Tr>
          <Th>Group</Th>
          <Th width="160">Role</Th>
          <Th width="190"></Th>
        </Tr>
      </Thead>
      <Tbody>
        <ul className="menu bg-base-100 w-56 rounded-box text-white">
          {props.userGroups.map(ug => {
            return <Tr rowType="body" key={ug.id}>
              <Td>{ug.group.name}</Td>
              <Td>{ug.role}</Td>
              <Td>
                {(ug.role === UserGroupRole.Admin || ug.role === UserGroupRole.Owner) &&
                  <PrimaryButton href={`/group/${ug.group.id}`}>Manage Group</PrimaryButton>
                }
              </Td>
            </Tr>
          })}
        </ul>
      </Tbody>
    </Table>
  </MasterLayout>
);
