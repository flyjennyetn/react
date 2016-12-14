import React, {
  Component
} from 'react'

import {
  Link
} from 'react-router'

import styles from './index.scss'

export default class Header extends Component {


  render() {
    const {
      title,
      href
    } = this.props

    return (
      <div className={styles.title}>
          <span className={styles.goBack}>
            <Link href={href}></Link>
          </span>
          <span className={styles.textCon}>{title}</span>
      </div>
    )
  }
}