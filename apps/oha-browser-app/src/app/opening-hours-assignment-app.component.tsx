import * as React from 'react';
import {
  WoltUiProvider,
  WoltCard,
  CardHeader,
  CardItem,
  OpeningHours,
} from '@wolt/ui';
import Box from '@mui/material/Box';

export interface IOpeningHoursAssignementAppProps {}

export type OpeningHoursAssignementAppComponent =
  React.FC<IOpeningHoursAssignementAppProps>;

export const OpeningHoursAssignementApp: OpeningHoursAssignementAppComponent = (
  props
) => {
  return (
    <WoltUiProvider>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WoltCard>
          <CardHeader>Opening hours</CardHeader>
          <CardItem>
            <OpeningHours label="Monday" />
          </CardItem>
          <CardItem>
            <OpeningHours label="Thursday" />
          </CardItem>
          <CardItem>
            <OpeningHours label="Wednesday" isToday={true} />
          </CardItem>
          <CardItem>
            <OpeningHours label="Tuesday" />
          </CardItem>
          <CardItem>
            <OpeningHours label="Friday" />
          </CardItem>
        </WoltCard>
      </Box>
    </WoltUiProvider>
  );
};

OpeningHoursAssignementApp.displayName = 'OpeningHoursAssignementApp';

OpeningHoursAssignementApp.defaultProps = {};
