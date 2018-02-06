/**
 * Created by flyjennyetn on 2016-10-26.
 */
//服务器配置 前面项目名字首拼 JYH 后面是项目启动日期 171229

function configPro (data){
    switch (process.env.NODE_ENV){
        case "dev":
            return data.dev;
            break;
        case "uat":
            return data.uat;
            break;        
        case "production":
            return data.production;
            break;
        default :
            return data.dev;
    }
}


//君英会
export const JYH171229 = {
    API_HOST: configPro({
        dev:'http://test.jklife.com:8888/ja-jyh-app',
        uat:'http://test.jklife.com:8888/ja-jyh-app-uat',
        production:'https://mip.jklife.com/ja-jyh-app'
    }),
    APPID: configPro({
        dev:'JA-JYH-APP',
        uat:'JA-JYH-APP',
        production:'JA-JYH-APP'
    }),
    APPKEY: configPro({
        dev:'3O87qylsi9',
        uat:'gLxYhKsCHb',
        production:'gLxYhKsCHb'
    })
};

//君银通
export const JYT171215 = {
    API_HOST: configPro({
        dev:'https://mip.jklife.com/jkbc/',
        uat:'https://mip.jklife.com/jkbc/',
        production:'http://test.jklife.com:8888/jkbc/'
    }),
    APPID: configPro({
        dev:'jyt-01',
        uat:'jyt-01',
        production:'jyt-01'
    }),
    APPKEY: configPro({
        dev:'jyt-01',
        uat:'jyt-01',
        production:'jyt-01'
    })
};


//君银通
export const REQUESTIMG = {
    API_HOST: configPro({
        dev:'http://test.jklife.com:8888/rear-ms',
        uat:'http://test.jklife.com:8888/rear-ms',
        production:'http://test.jklife.com:8888/rear-ms'
    })
};
