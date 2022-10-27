import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { OpeningHoursAssignementApp } from './app/opening-hours-assignment-app.component';

function main() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StrictMode>
      <OpeningHoursAssignementApp />
    </StrictMode>
  );
}

try {
  main();
} catch (error) {
  // Last (top) error handler
  console.error(error);
}
