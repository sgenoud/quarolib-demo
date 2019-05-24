import React, { forwardRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import ContextMenu from '../components/ContextMenu.jsx';
import Block from '../components/Block.jsx';
import CenterLayout, { SIDES, HEIGHTS } from '../components/CenterLayout.jsx';
import PLACEMENTS from '../placements';

const ClickBlock = forwardRef(({ text = 'Click Me', ...props }, ref) => (
  <Block as="button" ref={ref} {...props}>
    {text}
  </Block>
));

const MyMenu = () => (
  <>
    <p>This is a menu with text</p>
    <p>It works nicely</p>
    <p>Click outside or press escape to close</p>
  </>
);

const ClosableMenu = ({ onClose }) => (
  <>
    <p>This is a menu with text</p>
    <p>It works nicely</p>
    <p>You can also click the close button</p>
    <button onClick={onClose}>Close</button>
  </>
);

storiesOf('Clickable context menu', module)
  .addDecorator(withKnobs)
  .add('context menu', () => (
    <CenterLayout
      side={select('Side', SIDES, 'center')}
      height={select('Height', HEIGHTS, 'center')}
    >
      <ContextMenu
        targetComponent={ClickBlock}
        menuComponent={MyMenu}
        placement={select('Placement', PLACEMENTS, 'top')}
      />
    </CenterLayout>
  ))
  .add('context menu with closing logic', () => (
    <CenterLayout
      side={select('Side', SIDES, 'center')}
      height={select('Height', HEIGHTS, 'center')}
    >
      <ContextMenu
        targetComponent={ClickBlock}
        menuComponent={ClosableMenu}
        placement={select('Placement', PLACEMENTS, 'top')}
      />
    </CenterLayout>
  ));
