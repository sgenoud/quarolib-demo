import React, { useState, useCallback } from 'react';
import { Portal } from 'react-portal';

import useOutsideCallback from '../quarolib/hooks/useOutsideCallback';
import usePopper from '../quarolib/hooks/usePopper';
import useToggle from '../quarolib/hooks/useToggle';

import useMoustetrap, { useMousetrapInstance } from '../quarolib/hooks/useMousetrap';
import { Tooltip, Arrow } from '../quarolib/components/Tooltip.jsx';

const Menu = ({ targetNode, placement = 'top-end', onClose, children }) => {
  const [menuNode, setMenuNode] = useState(null);
  const [arrowNode, setArrowNode] = useState(null);

  useOutsideCallback([targetNode, menuNode], onClose);

  const mousetrap = useMousetrapInstance();
  useMoustetrap('esc', onClose, mousetrap.current);

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
  targetProps,
  menuProps,
  menuComponent: MenuComponent,
  placement,
}) => {
  const [isOpen, , close, toggle] = useToggle(false);
  const [targetNode, setNode] = useState(null);

  return (
    <>
      <TargetComponent ref={setNode} {...targetProps} onClick={toggle} />
      {isOpen && (
        <Menu targetNode={targetNode} onClose={close} placement={placement}>
          <MenuComponent {...menuProps} onClose={close} />
        </Menu>
      )}
    </>
  );
};
