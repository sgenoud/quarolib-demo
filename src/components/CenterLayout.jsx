import styled from 'styled-components/macro';

const mapper = {
  left: 'flex-start',
  top: 'flex-start',
  right: 'flex-end',
  bottom: 'flex-end',
};

const position = ({ side, height }) => {
  return `
    justify-content: ${mapper[side] || 'center'};
    align-items: ${mapper[height] || 'center'};
  `;
};

export default styled.div`
  width: 100%;
  max-height: calc(100vh - 20px);
  height: calc(100vh - 20px);
  display: flex;
  ${position}
`;

export const SIDES = {
  Center: 'center',
  Right: 'right',
  Left: 'left',
};

export const HEIGHTS = {
  Center: 'center',
  Top: 'top',
  Bottom: 'bottom',
};
