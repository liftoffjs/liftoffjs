import * as React from 'react';
import { Card, FormField, MasterLayout, PageHeader, PageSubHeader, PrimaryButton, Table, Tbody, Td, Th, Thead, Tr } from '../../common';
import { Group, UserGroupRole } from '../entities';

export interface ManageGroupViewProps {
  group: Group;
}

export const ManageGroupView: React.FC<ManageGroupViewProps> = props => (
  <MasterLayout contain={true}>
    <PageHeader>Manage {props.group.name}</PageHeader>

    <PageSubHeader>Invite user</PageSubHeader>
    <Card>
      <lo-invite-user-group-form group-id={props.group.id}>
        <FormField label="Username or email" for="usernameOrEmail" />
        <FormField label="Admin" for="admin" type="toggle" />
        <PrimaryButton>Send invite</PrimaryButton>
      </lo-invite-user-group-form>
    </Card>

    <PageSubHeader>Manage users</PageSubHeader>
    <Table>
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th width="210"></Th>
          <Th width="220"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.group.userGroups.getItems().map(ug => {
          return <Tr key={ug.id}>
            <Td>{ug.user.username}
              <br />
              <small>({ug.user.email})</small>
              <br />
              <small><em>{ug.role}</em></small>
            </Td>
            <Td>
              {ug.role === UserGroupRole.User &&
                <lo-user-group-role-form group-id={props.group.id} user-id={ug.user.id} role="admin">
                  <PrimaryButton>Promote to admin</PrimaryButton>
                </lo-user-group-role-form>
              }
              {ug.role === UserGroupRole.Admin &&
                <lo-user-group-role-form group-id={props.group.id} user-id={ug.user.id} role="user">
                  <PrimaryButton>Demote to user</PrimaryButton>
                </lo-user-group-role-form>
              }
            </Td>
            <Td>
              {ug.role !== UserGroupRole.Owner &&
                <lo-user-group-role-form group-id={props.group.id} user-id={ug.user.id} role="">
                  <PrimaryButton>Remove from group</PrimaryButton>
                </lo-user-group-role-form>
              }
            </Td>
          </Tr>
        })}
      </Tbody>
    </Table>
  </MasterLayout>
);
