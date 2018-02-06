/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React from 'react';
import {Link} from 'react-router-dom';

export default ({href, className, onClick, style, activeClassName, onlyActiveOnIndex, children}) => {
  let extAttr = {}
  className && (extAttr['className'] = className)
  onClick && (extAttr['onClick'] = onClick)
  style && (extAttr['style'] = style)
  activeClassName && (extAttr['activeClassName'] = activeClassName)
  onlyActiveOnIndex && (extAttr['onlyActiveOnIndex'] = true)
  if (typeof(href) == 'string') {
    if (/^(http:\/\/|https:\/\/|tel:)/.test(href)) {
      return <a href={href} {...extAttr}>{children}</a>
    } else {
      return <Link to={{pathname: href}} {...extAttr}>{children}</Link>
    }
  }
  return <Link to={href} {...extAttr}>{children}</Link>
}