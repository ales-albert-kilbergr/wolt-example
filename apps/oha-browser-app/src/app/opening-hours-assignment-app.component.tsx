import * as React from 'react';

export interface IOpeningHoursAssignementAppProps {}

export type OpeningHoursAssignementAppComponent =
  React.FC<IOpeningHoursAssignementAppProps>;

export const OpeningHoursAssignementApp: OpeningHoursAssignementAppComponent = (
  props
) => {
  return <div>My component: OpeningHoursAssignementApp</div>;
};

OpeningHoursAssignementApp.displayName = 'OpeningHoursAssignementApp';

OpeningHoursAssignementApp.defaultProps = {};
