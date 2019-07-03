/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import React from 'react';
import objectAssign from 'object-assign';

const Iframe = ({
  url,
  allowFullScreen,
  position,
  display,
  height,
  width,
  overflow,
  styles,
  onLoad,
  onMouseOver,
  onMouseOut,
  scrolling,
  id,
  frameBorder,
  ariaHidden,
  sandbox,
  allow,
  className,
  title,
  ariaLabel,
  ariaLabelledby,
  name,
  target,
  loading,
  importance,
  referrerpolicy,
  allowpaymentrequest,
  src,
}) => {
  const defaultProps = objectAssign({
    src: src || url,
    target: target || null,
    style: {
      position: position || null,
      display: display || 'block',
      overflow: overflow || null,
      ...styles,
    },
    scrolling: scrolling || null,
    allowpaymentrequest: allowpaymentrequest || null,
    importance: importance || null,
    sandbox: sandbox || null,
    loading: loading || null,
    name: name || null,
    className: className || null,
    referrerpolicy: referrerpolicy || null,
    title: title || null,
    allow: allow || null,
    id: id || null,
    'aria-labelledby': ariaLabelledby || null,
    'aria-hidden': ariaHidden || null,
    'aria-label': ariaLabel || null,
    width: width || null,
    height: height || null,
    onLoad: onLoad || null,
    onMouseOver: onMouseOver || null,
    onMouseOut: onMouseOut || null,
  });
  const props = Object.create(null);
  for (const prop of Object.keys(defaultProps)) {
    if (defaultProps[prop] != null) {
      props[prop] = defaultProps[prop];
    }
  }

  for (const i of Object.keys(props.style)) {
    if (props.style[i] == null) {
      delete props.style[i];
    }
  }

  if (allowFullScreen) {
    if ('allow' in props) {
      const currentAllow = props.allow.replace('fullscreen', '');
      props.allow = `fullscreen ${currentAllow.trim()}`.trim();
    } else {
      props.allow = 'fullscreen';
    }
  }

  if (frameBorder >= 0) {
    if (!props.style.hasOwnProperty('border')) {
      props.style.border = frameBorder;
    }
  }
  return <iframe title={title} {...props} />;
};

export default Iframe;
