/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdClear } from 'react-icons/md';
import {
  Button,
  ContentAction,
  GroupContainer,
  IconAction,
  ItemContainer,
  TitleAction,
} from '../../styles/styledComponents';

const FileDetails = (props: {
  handleRemoveFile: () => void;
  compressFileApi: (
    file: File,
    handleStatus: { (status: string): void },
    handleProgress: { (progress: number): void },
    handleDownloadLink: { (link: string): void },
    handleMessage: { (message: string): void }
  ) => void;
  file: File;
  status: string;
  handleStatus: (status: string) => void;
  handleProgress: (progress: number) => void;
  handleDownloadLink: (link: string) => void;
  handleMessage: (message: string) => void;
}) => {
  return (
    <GroupContainer>
      <ItemContainer>
        <TitleAction>
          <IconAction>
            <MdClear onClick={() => props.handleRemoveFile()} />
          </IconAction>
          <p>{props.file.name}</p>
        </TitleAction>
        <ContentAction>
          <Button
            disabled={props.status === 'compressing'}
            color='pink'
            onClick={() =>
              props.compressFileApi(
                props.file,
                props.handleStatus,
                props.handleProgress,
                props.handleDownloadLink,
                props.handleMessage
              )
            }
          >
            Compress File
          </Button>
        </ContentAction>
      </ItemContainer>
    </GroupContainer>
  );
};
export default FileDetails;
