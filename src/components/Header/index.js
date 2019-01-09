/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
    PureComponent
} from 'react';
import Book_icon from 'assets/images/backto-icon.png'
import Link from 'components/Link'
import styles from './styles.scss'

export default class extends PureComponent {
    render() {
        const {
            title,
            Url,
            rightTitle,
            noBack
        } = this.props;
        return (
            <div className={styles.title}>
                {noBack &&
                    <span onClick={()=>{history.back(-1)}} className={styles.goBack}></span>
                }
                <h1 className={styles.textCon}>{title}</h1>
                {rightTitle &&
                    <Link href={{pathname:Url}} className={styles.Link}>
                        {{rightTitle}}
                    </Link>
                }
            </div>
        )
    }
}