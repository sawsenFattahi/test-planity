import { GroupContainer } from '../../styles/styledComponents';

const PrpgressBar = ({ progress }: { progress: number }) => {
  return (
    <GroupContainer>
      <div
        style={{
          width: '100%',
          height: '30px',
          backgroundColor: '#f3f3f3',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#4caf50',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {progress}%
        </div>
      </div>
      </GroupContainer>
  );
};

export default PrpgressBar;
