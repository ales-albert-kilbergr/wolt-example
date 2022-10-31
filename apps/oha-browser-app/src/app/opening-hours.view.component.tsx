import * as React from 'react';
import {
  FileOption,
  SecondaryLink,
  SecondaryLinkGroup,
  WeekdayInfo,
} from '@wolt/ui';
import { ReactIntlLocale, useReactIntlController } from '@wolt/react-intl';
import Box from '@mui/material/Box';
import { WoltCard, CardHeader, CardItem } from '@wolt/ui';
import {
  OpeningHoursParseErrorMessage,
  useLoadOpeningHoursSourceData,
  useOpeningHoursSourceIndex,
  useOpeningHoursSourceParser,
  useOpeningHoursSourceValidator,
} from '@wolt/opening-hours-client';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import { OPENING_HOURS_APP_MESSAGES } from './messages';

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

  if (!intl) {
    return null;
  }
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
              <CardHeader>
                <FormattedMessage
                  {...OPENING_HOURS_APP_MESSAGES.sourceChoice}
                />
              </CardHeader>
              <CardItem>
                <Typography sx={{ lineHeight: '38px' }}>
                  <FormattedMessage
                    {...OPENING_HOURS_APP_MESSAGES.chooseFile}
                  />
                </Typography>
              </CardItem>
              {sourceFilesIndex.files?.map((fileName) => (
                <CardItem key={fileName}>
                  <FileOption
                    filePath={fileName}
                    key={fileName}
                    onSelect={onFileSelect}
                    isInvalid={
                      Boolean(sourceParser.error) &&
                      dataLoader.fileName === fileName
                    }
                  />
                </CardItem>
              ))}
            </>
          )}
          {dataLoader.data && (
            <>
              <CardHeader>
                <FormattedMessage
                  {...OPENING_HOURS_APP_MESSAGES.openingHours}
                />
              </CardHeader>
              {dataLoader.data.map((record, ix) => (
                <CardItem key={ix}>
                  <WeekdayInfo
                    dayOfWeek={record.weekdayIndex}
                    data={record.entries}
                  ></WeekdayInfo>
                </CardItem>
              ))}
            </>
          )}
          {sourceParser.error && (
            <Typography color="red" sx={{ padding: '24px' }}>
              <OpeningHoursParseErrorMessage error={sourceParser.error} />
            </Typography>
          )}
        </>
      </WoltCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '350px',
          padding: '6px 24px',
          color: '#A1A2A4',
        }}
      >
        <SecondaryLinkGroup>
          <SecondaryLink
            data-locale={ReactIntlLocale.EN_US}
            onClick={intl.handleSetLocaleClick}
            active={intl.currentLocale === ReactIntlLocale.EN_US}
          >
            En
          </SecondaryLink>
          <SecondaryLink
            data-locale={ReactIntlLocale.DE_DE}
            onClick={intl?.handleSetLocaleClick}
            active={intl.currentLocale === ReactIntlLocale.DE_DE}
          >
            De
          </SecondaryLink>
          <SecondaryLink
            data-locale={ReactIntlLocale.FR_FR}
            onClick={intl?.handleSetLocaleClick}
            active={intl.currentLocale === ReactIntlLocale.FR_FR}
          >
            FR
          </SecondaryLink>
        </SecondaryLinkGroup>
        {sourceParser.data && (
          <SecondaryLink disabled={true}>{dataLoader.fileName}</SecondaryLink>
        )}
        {sourceParser.data && (
          <SecondaryLink onClick={sourceParser.clear}>Back</SecondaryLink>
        )}
      </Box>
    </Box>
  );
};

OpeningHoursMainView.displayName = 'OpeningHoursMainView';

OpeningHoursMainView.defaultProps = {};
