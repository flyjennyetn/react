/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
    PureComponent
} from 'react';
import Swiper from 'react-id-swiper';

export default class extends PureComponent {

    state = {
        swiperOption: {
            loop: false,
            autoplay: false,
            resistanceRatio: 0.5,
            slidesPerView: 2,
            initialSlide: 1,
            watchActiveIndex: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        }
    };
    componentWillMount() {
        this.setState({
            swiperOption: Object.assign(this.state.swiperOption, this.props.swiperOption)
        })
    }

    render() {
        const {
            picList,
            children
        } = this.props
        return (
            <Swiper {...this.state.swiperOption}>
               {picList && picList.map((el,i)=>
                    <div key={i}><img src={el} /></div>  
                )}  
               {children && children}
            </Swiper>
        )
    }
}