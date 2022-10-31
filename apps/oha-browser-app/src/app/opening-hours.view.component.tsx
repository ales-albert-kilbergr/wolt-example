import * as React from 'react';
import { FileOption, WeekdayInfo } from '@wolt/ui';
import { ReactIntlLocale, useReactIntlController } from '@wolt/react-intl';
import Box from '@mui/material/Box';
import { WoltCard, CardHeader, CardItem } from '@wolt/ui';
import {
  useLoadOpeningHoursSourceData,
  useOpeningHoursSourceIndex,
  useOpeningHoursSourceParser,
  useOpeningHoursSourceValidator,
} from '@wolt/opening-hours-client';
import Typography from '@mui/material/Typography';

export interface IOpeningHoursMainViewProps {
  sourceIndexUrl: string;
  sourceSchemaUrl: string;
}

export type OpeningHoursMainViewComponent =
  React.FC<IOpeningHoursMainViewProps>;

export const OpeningHoursMainView: OpeningHoursMainViewComponent = (props) => {
  const sourceFilesIndex = useOpeningHoursSourceIndex({
    indexUrl: props.sourceIndexUrl,
  });
  const sourceValidator = useOpeningHoursSourceValidator({
    schemaUrl: props.sourceSchemaUrl,
  });
  const sourceParser = useOpeningHoursSourceParser({});

  const dataLoader = useLoadOpeningHoursSourceData({
    rootUrl: sourceFilesIndex.path,
    validator: sourceValidator,
    parser: sourceParser,
  });

  const onFileSelect = React.useCallback(
    async (fileName: string) => {
      dataLoader.load(fileName);
    },
    [dataLoader]
  );
  const intl = useReactIntlController();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <WoltCard>
        <>
          {sourceValidator.schema?.error && (
            <Typography color="red" sx={{ padding: '24px' }}>
              {String(sourceValidator.schema.error)}
            </Typography>
          )}
          {!sourceValidator.schema?.error && !sourceParser.data && (
            <>
              <CardHeader>Source choice:</CardHeader>
              <CardItem>Choose files:</CardItem>
              {sourceFilesIndex.files?.map((fileName) => (
                <CardItem key={fileName}>
                  <FileOption
                    filePath={fileName}
                    key={fileName}
                    onSelect={onFileSelect}
                  />
                </CardItem>
              ))}
            </>
          )}
          {sourceParser.data && (
            <>
              <CardHeader>Opening hours</CardHeader>
              {sourceParser.data.map((record) => (
                <CardItem>
                  <WeekdayInfo
                    dayOfWeek={record.weekday}
                    data={record.entries}
                  ></WeekdayInfo>
                </CardItem>
              ))}
            </>
          )}
        </>
      </WoltCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '350px',
          padding: '0 24px',
          color: '#A1A2A4',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '6px' }}>
          <Typography
            sx={{ color: '#A1A2A4', cursor: 'pointer' }}
            data-locale={ReactIntlLocale.EN_US}
            onClick={intl?.handleSetLocaleClick}
          >
            En
          </Typography>
          <Typography>|</Typography>
          <Typography
            sx={{ color: '#A1A2A4', cursor: 'pointer' }}
            data-locale={ReactIntlLocale.DE_DE}
            onClick={intl?.handleSetLocaleClick}
          >
            De
          </Typography>
          <Typography>|</Typography>
          <Typography
            sx={{ color: '#A1A2A4', cursor: 'pointer' }}
            data-locale={ReactIntlLocale.FR_FR}
            onClick={intl?.handleSetLocaleClick}
          >
            FR
          </Typography>
        </Box>
        {sourceParser.data && (
          <Typography
            onClick={sourceParser.clear}
            sx={{ color: '#A1A2A4', cursor: 'pointer' }}
          >
            Back
          </Typography>
        )}
      </Box>
    </Box>
  );
};

OpeningHoursMainView.displayName = 'OpeningHoursMainView';

OpeningHoursMainView.defaultProps = {};
