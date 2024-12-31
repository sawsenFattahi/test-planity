import { ReactElement, ReactNode } from 'react';
import { GroupContainer, ItemContainer } from '../../styles/styledComponents';

function DataContainer({ children }: { children: ReactNode }) {
  return (
    <GroupContainer>
      <ItemContainer>{children}</ItemContainer>
    </GroupContainer>
  );
}

DataContainer.header = ({
  children,
  title,
}: {
  children: ReactElement;
  title: string;
}) => (
  <div>
    <div className="title-action">
      <p>{title}</p>
    </div>
    <div className="icon-action">{children}</div>
  </div>
);

DataContainer.body = ({ children }: { children: ReactElement }) => (
  <div className="title-action alert">{children}</div>
);

export default DataContainer;
