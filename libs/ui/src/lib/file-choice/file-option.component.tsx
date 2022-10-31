import * as React from 'react';
import Box from '@mui/material/Box';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const FileOptionBox = styled(Box)`
  display: flex;
  column-gap: 12px;
  cursor: pointer;
  height: 38px;
  align-items: center;
  padding: 0 12px;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.woltGrey[400]};
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.woltGrey[600]};
  }
`;

export interface IFileOptionProps {
  filePath: string;
  onSelect: (filePath: string) => Promise<void>;
  isInvalid?: boolean;
}

export type FileOptionComponent = React.FC<IFileOptionProps>;

export const FileOption: FileOptionComponent = (props) => {
  const handleSelect = React.useCallback(() => {
    props.onSelect(props.filePath);
  }, [props.filePath, props.onSelect]);
  return (
    <FileOptionBox onClick={handleSelect}>
      <DescriptionSharpIcon color="disabled" />
      <Typography color={props.isInvalid ? 'error' : 'primary'}>
        {props.filePath}
      </Typography>
    </FileOptionBox>
  );
};

FileOption.displayName = 'FileOption';

FileOption.defaultProps = {};
