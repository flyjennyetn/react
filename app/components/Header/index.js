/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
  Component
} from 'react'
import Book_icon from 'assets/images/bookIcon.png'
import Link from'components/Link'
import styles from './styles.scss'

export default class Header extends Component {
  render() {
    const {title,Url,rightIcon,noBack} = this.props;
    return (
        <div className={styles.title}>
            {!noBack &&
            <span onClick={()=>{history.back(-1)}} className={styles.goBack}></span>
            }
            <span className={styles.textCon}>{title}</span>
            {rightIcon &&
                <Link href={{pathname:Url}} className={styles.Link}>
                    <div className={`bg-cover ${styles.all}`} style={{backgroundImage: `url(${Book_icon})`}}></div>
                </Link>
            }
        </div>
    )
  }
}