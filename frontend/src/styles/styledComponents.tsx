import styled from "styled-components";

// Define the theme with colors
const theme = {
  blue: { default: "#3f51b5", hover: "#283593" },
  pink: { default: "#e91e63", hover: "#ad1457" },
  green: { default: "#4caf50", hover: "#2e7d32" },
  red: { default: "#f44336", hover: "#d32f2f" },
};

type ColorKey = keyof typeof theme;

// Styled button component
const Button = styled.button<{ color?: ColorKey }>`
  background-color: ${({ color = "blue" }) => theme[color].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0;
  text-transform: uppercase;
  margin: 10px 0;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: background-color 250ms ease;

  &:hover {
    background-color: ${({ color = "blue" }) => theme[color].hover};
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  color: "blue",
};

// Styled section components
const DragDrop = styled.div`
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const DocumentUploader = styled.div`
  border: 2px dashed #4282fe;
  background-color: #f4fbff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 8px;
  cursor: pointer;

  &.active {
    border-color: #6dc24b;
  }
`;

const UploadInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    font-size: 36px;
    margin-right: 1rem;
  }

  div {
    p {
      margin: 0;
      font-size: 16px;
    }

    p:first-child {
      font-weight: bold;
    }
  }
`;

const GroupContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  background-color: seashell;
`;

const ItemContainer = styled.div`
  display: inline-grid;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const TitleAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  flex: 1;
  width: 100%;
  text-align: center;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const ContentAction = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Alert = styled.div`
  color: red;
`;

const Success = styled.div`
  color: green;
`;

const IconAction = styled.div`
  cursor: pointer;

  svg {
    font-size: 18px;
    color: #888;
  }

  &:hover {
    svg {
      color: #d44;
    }
  }
`;

const BrowseBtn = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--primary-color);

  &:hover {
    background-color: transparent;
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const SuccessFile = styled.div`
  color: #6dc24b;
`;

const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

export {
  Button,
  DragDrop,
  DocumentUploader,
  UploadInfo,
  GroupContainer,
  ItemContainer,
  TitleAction,
  ContentAction,
  Alert,
  Success,
  IconAction,
  BrowseBtn,
  SuccessFile,
  FileInput,
};
