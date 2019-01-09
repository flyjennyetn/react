/**
 * Created by flyjennyetn on 2017/4/21.
 */
import React, {PureComponent} from 'react'
import styles from './style.scss'
import p from 'assets/images/s.gif';

export default ({leftIcon, iconName, handle, style, placeholder,value,children}) => {

    return(<div className={styles.box}>
        <div className={styles.row}>
            {leftIcon && 
                <img className={`bg-contain ${styles.leftIcon}`} src={p} style={{backgroundImage: `url(${leftIcon})`}}/>
            }
            {iconName &&
                <span className={styles.iconName}>{iconName}</span>
            }
            <input type="text" onChange={handle} value={value} className={styles.input} placeholder={placeholder} />
            {children &&
                <div className={styles.code}>
                    {children}
                </div>
            }
        </div>
    </div>)
}

