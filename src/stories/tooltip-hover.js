import React, { forwardRef } from 'react';
import { storiesOf } from '@storybook/react';

import TooltipHover from '../components/TooltipHover.jsx';
import Block from '../components/Block.jsx';

import { withKnobs, select } from '@storybook/addon-knobs';
import CenterLayout, { SIDES, HEIGHTS } from '../components/CenterLayout.jsx';
import PLACEMENTS from '../placements';

const HoverBlock = forwardRef(({ text = 'Hover Me', ...props }, ref) => (
  <Block ref={ref} {...props}>
    {text}
  </Block>
));

const MyMenu = () => (
  <>
    <p>This is a menu with text</p>
    <p>It works nicely</p>
  </>
);

storiesOf('Tooltip with hover', module)
  .addDecorator(withKnobs)
  .add('hover tooltip with arrow', () => (
    <CenterLayout side={select('Side', SIDES, 'left')} height={select('Height', HEIGHTS, 'top')}>
      <TooltipHover targetComponent={HoverBlock} menuComponent={MyMenu} placement="right" />
    </CenterLayout>
  ))
  .add('hover tooltip with arrow and custom text', () => (
    <CenterLayout side={select('Side', SIDES, 'left')} height={select('Height', HEIGHTS, 'top')}>
      <TooltipHover
        targetComponent={HoverBlock}
        targetProps={{ text: 'Please hover me' }}
        menuComponent={MyMenu}
        placement="bottom"
      />
    </CenterLayout>
  ));
