import { ReactChild } from 'react';
import { IconType } from 'react-icons';
import { ContentAction, GroupContainer, ItemContainer, TitleAction } from '../../styles/styledComponents';

const FileAction = ({
  status,
  color,
  Icon,
  message,
  children,
}: {
  status: string;
  color: string;
  Icon: IconType;
  message: string;
  children?: ReactChild;
}) => {
  const classStatus = `title-action ${status}`;
  return (
    <GroupContainer>
      <ItemContainer>
        <TitleAction  className={classStatus}>
          <ItemContainer>
            <Icon style={{ color: color, marginRight: 1 }} />
            </ItemContainer>
          <p>{message}</p>
          </TitleAction >
        <ContentAction>{children}</ContentAction>
      </ItemContainer>
    </GroupContainer>
  );
};
export default FileAction;
