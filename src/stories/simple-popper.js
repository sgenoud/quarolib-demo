import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Portal } from 'react-portal';
import styled from 'styled-components';

import usePopper from '../quarolib/hooks/usePopper';
import useToggle from '../quarolib/hooks/useToggle';

import { withKnobs, select } from '@storybook/addon-knobs';
import CenterLayout, { SIDES, HEIGHTS } from '../components/CenterLayout.jsx';
import PLACEMENTS from '../placements';

import { Tooltip as SourceTooltip, Arrow } from '../quarolib/components/Tooltip.jsx';

import Block from '../components/Block.jsx';

const Menu = styled(SourceTooltip)`
  border-color: grey;
`;

const SimplePopper = ({ children, placement = 'right' }) => {
  const [targetNode, setNode] = useState(null);
  const [menuNode, setMenuNode] = useState(null);
  const [arrowNode, setArrowNode] = useState(null);

  const { styles, placement: p, arrowStyles } = usePopper({
    referrenceNode: targetNode,
    popperNode: menuNode,
    arrowNode,
    placement,
  });

  return (
    <>
      <Block ref={setNode}>Relative Block</Block>
      <Portal>
        <Menu ref={setMenuNode} style={styles} data-placement={p}>
          {children}
          <Arrow ref={setArrowNode} style={arrowStyles} />
        </Menu>
      </Portal>
    </>
  );
};

storiesOf('Simple Popper', module)
  .addDecorator(withKnobs)
  .add('simple hover', () => (
    <CenterLayout
      side={select('Side', SIDES, 'center')}
      height={select('Height', HEIGHTS, 'center')}
    >
      <SimplePopper placement={select('Placement', PLACEMENTS, 'top')}>
        <p>This is the content of the menu</p>
      </SimplePopper>
    </CenterLayout>
  ));
