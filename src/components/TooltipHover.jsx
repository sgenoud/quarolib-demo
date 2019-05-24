import React, { useState } from 'react';
import { Portal } from 'react-portal';

import usePopper from '../quarolib/hooks/usePopper';
import useToggle from '../quarolib/hooks/useToggle';

import { Tooltip, Arrow } from '../quarolib/components/Tooltip.jsx';

const Menu = ({ targetNode, placement, children }) => {
  const [menuNode, setMenuNode] = useState(null);
  const [arrowNode, setArrowNode] = useState(null);

  const { styles, placement: p, arrowStyles } = usePopper({
    referrenceNode: targetNode,
    popperNode: menuNode,
    arrowNode,
    placement,
  });

  return (
    <Portal>
      <Tooltip ref={setMenuNode} style={styles} data-placement={p}>
        {children}
        <Arrow ref={setArrowNode} style={arrowStyles} />
      </Tooltip>
    </Portal>
  );
};

export default ({
  targetComponent: TargetComponent,
  menuProps,
  targetProps,
  menuComponent: MenuComponent,
  placement = 'bottom',
}) => {
  const [isOpen, open, close] = useToggle(false);
  const [targetNode, setNode] = useState(null);

  return (
    <>
      <TargetComponent {...targetProps} onMouseEnter={open} onMouseLeave={close} ref={setNode} />
      {isOpen && (
        <Menu placement={placement} targetNode={targetNode}>
          <MenuComponent {...menuProps} />
        </Menu>
      )}
    </>
  );
};
