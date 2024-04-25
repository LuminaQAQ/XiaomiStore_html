// @ts-nocheck
import "../css/default.scss"
import "../css/header.scss"
import "../css/nav.scss"
import "../css/index.scss"

import "../css/swiper.scss"

import { fetchData } from '../api/fetchDropdown.js'
import { fetchSwiperData } from "../api/fetchSwiperData"

// ------- 导航栏下拉 -------
// #region
const headerDropdown = {
    headerContainer: document.querySelector('.header-wrap-center'),
    item: document.querySelectorAll('.has-dropdown'),
    board: document.querySelector('.dropdown-board'),

    data: [],

    open() {
        const that = this;
        const apiArr = ['xiaomi', 'redmi'];

        for (let i = 0; i < this.item.length; i++) {
            this.item[i].addEventListener('mouseover', function (e) {
                that.board.innerHTML = '';
                that.board.className = 'dropdown-board open';

                that.data = fetchData(apiArr[i]);

                that.data.forEach(item => {
                    const sec = `
                        <div id="has-dropdown" class="sg-dropdown-item">
                            <header id="has-dropdown" class="item-img">
                                <img id="has-dropdown" src="${item.src}" alt="">
                            </header>
                            <section id="has-dropdown" class="item-title">
                                ${item.title}
                            </section>
                            <section id="has-dropdown" class="item-price">
                                ${item.price}
                            </section>
                        </div>
                    `;

                    that.board.innerHTML += sec;
                })
            })
        }
    },
    close() {
        const that = this;

        document.body.addEventListener('mousemove', function (e) {
            if (e.target.id === 'has-dropdown') return;

            that.board.className = 'dropdown-board';
        })
    },

    init() {
        this.open();
        this.close();
    }
}
headerDropdown.init();
// #endregion
// ------- end -------

// ------- 搜索框提示词 -------
// #region
const searchPlacehoder = {
    input: document.querySelector('#search-input'),
    index: 0,

    placeholderArr: ['红米', '小米手环8', '耳机', '洗衣机', '冰箱', '电视', '手表'],

    changePlaceholder(val) {
        this.input.setAttribute('placeholder', val);
    },

    init() {
        const that = this;

        setInterval(() => {
            that.changePlaceholder(that.placeholderArr[that.index]);
            if (++that.index == that.placeholderArr.length) that.index = 0;
        }, 5000);
    }
}

searchPlacehoder.init();
// #endregion
// ------- end -------

// ------- 轮播图 -------
// #region
const swiperOpt = {
    wrap: document.querySelector('.swiper-wrap-right'),
    swiperWrap: document.querySelector('.swiper'),

    circleWrap: document.querySelector('.circle-wrap'),

    prevBtn: document.querySelector('.change-swiper-btn.prev'),
    nextBtn: document.querySelector('.change-swiper-btn.next'),

    curSwiper: 0,
    swiperData: fetchSwiperData(),

    timer: null,

    handleSwiperChange() {
        const swipers = document.querySelectorAll('.sg-swiper-img-item');
        const circles = document.querySelectorAll('.sg-cirlce');

        for (let i = 0; i < swipers.length; i++) {
            swipers[i].style.opacity = 0;
            circles[i].className = 'sg-cirlce';
        }

        if (this.curSwiper >= swipers.length) this.curSwiper = 0;
        if (this.curSwiper < 0) this.curSwiper = this.swiperData.length - 1;

        swipers[this.curSwiper].style.opacity = 1;
        circles[this.curSwiper].className = 'sg-cirlce active';
    },

    swiperInit(interval) {
        const that = this;


        this.timer = setInterval(() => {
            that.curSwiper++;
            this.handleSwiperChange();
        }, interval);

        this.wrap.addEventListener('mouseover', function () {
            clearInterval(that.timer);
            that.timer = null;
        })

        this.wrap.addEventListener('mouseleave', function () {
            that.timer = setInterval(() => {
                that.curSwiper++;
                that.handleSwiperChange();
            }, interval);
        })
    },

    circlesInit(interval) {
        const that = this;
        this.circleWrap.innerHTML = '';

        for (let i = 0; i < this.swiperData.length; i++) {
            const htmlString = `
                <div class="sg-cirlce"></div>
            `;

            this.circleWrap.innerHTML += htmlString;
        }

        const circles = document.querySelectorAll('.sg-cirlce');
        circles[this.curSwiper].className = 'sg-cirlce active';

        for (let i = 0; i < circles.length; i++) {
            circles[i].addEventListener('click', function () {
                that.curSwiper = i;
                clearInterval(that.timer);

                that.handleSwiperChange();

                that.timer = setTimeout(() => {
                    that.handleSwiperChange();
                }, interval);
            })
        }
    },

    nextPrevInit(interval) {
        const that = this;

        this.prevBtn.addEventListener('click', function () {
            that.curSwiper--;
            clearInterval(that.timer);
            that.handleSwiperChange();
        });

        this.nextBtn.addEventListener('click', function () {
            that.curSwiper++;
            that.timer = setInterval(() => {
                that.handleSwiperChange();
            }, interval);
            that.handleSwiperChange();
        });
    },

    setData() {
        this.swiperWrap.innerHTML = '';

        this.swiperData.forEach(item => {
            const htmlString = `
                <div class="sg-swiper-img-item">
                    <img src="${item.src}" alt="">
                </div>
            `;
            this.swiperWrap.innerHTML += htmlString;
        })
    },

    optInit(interval) {
        this.setData();
        this.swiperInit(interval);
        this.nextPrevInit(interval);
        this.circlesInit(interval);
    },

    init() {
        this.optInit(4000);
    }
}
swiperOpt.init();
// #endregion
// ------- end -------

// -------  轮播图侧边栏展开 -------
// #region
const sideCollapse = {
    boards: document.querySelectorAll('.item-sider-collapse-board'),

    setData() {
        const data = [
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b656495821144d92bd932d91eedcf659.png?width=80&height=80",
                "text": "Redmi X65 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b656495821144d92bd932d91eedcf659.png?width=80&height=80",
                "text": "Redmi X65 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/943995e8d1b1a884e123aec25cc1f8b8.png?width=80&height=80",
                "text": "小米拍拍4K高清投屏器"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b656495821144d92bd932d91eedcf659.png?width=80&height=80",
                "text": "Redmi X55 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/50194366cfebbc7c82489d0094c1f944.png?width=80&height=80",
                "text": "小米电视6 55”  OLED"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/50194366cfebbc7c82489d0094c1f944.png?width=80&height=80",
                "text": "小米电视6 65”  OLED"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b91c9ef670fa1c12eddf23b209f9ff33.png?width=80&height=80",
                "text": "小米电视 大师  77”  OLED"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aa3954f817a23443c0b6b523ebbd09f6.png?width=80&height=80",
                "text": "小米电视6 至尊版 55英寸"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aa3954f817a23443c0b6b523ebbd09f6.png?width=80&height=80",
                "text": "小米电视6 至尊版 65英寸"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aa3954f817a23443c0b6b523ebbd09f6.png?width=80&height=80",
                "text": "小米电视6 至尊版 75英寸"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1c0d83dd59a3dd91372d867864b35554.png?width=80&height=80",
                "text": "小米电视 ES43 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1c0d83dd59a3dd91372d867864b35554.png?width=80&height=80",
                "text": "小米电视 ES55 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1c0d83dd59a3dd91372d867864b35554.png?width=80&height=80",
                "text": "小米电视 ES65 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1c0d83dd59a3dd91372d867864b35554.png?width=80&height=80",
                "text": "小米电视 ES75 2022款"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d219d8b9c4a74eda4ae6c0222d194cd2.png?width=80&height=80",
                "text": "金属全面屏电视"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7da49e7ada2229c963c9c7353a58d49b.png?width=80&height=80",
                "text": "大师电视 65英寸 OLED"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1df560d16cc983b0f34d24fc484bd697.png?width=80&height=80",
                "text": "小米电视4A 60英寸"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/070b329c18c1ab167df2a42564a67813.png?width=80&height=80",
                "text": "Redmi 智能电视 X55"
            },
            {
                "src": "https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/8aeae36f5d088f22c84b8953bd0d08b4.jpg?width=80&height=80",
                "text": "小米全面屏电视"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ce75f4a3fef148b6729061a18f994aa7.png?width=80&height=80",
                "text": "米家激光投影仪"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9d649ec3d7d14da7090e396d56b7cc92.jpg?width=80&height=80",
                "text": "Redmi 智能电视 MAX 98\""
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3fbb9ad7c67775fcc1a10219bdbd7257.png?width=80&height=80",
                "text": "小米电视5 75英寸"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6797917392e912577135d9eb8ad92f1f.png?width=80&height=80",
                "text": "小米电视4A 70英寸"
            },
            {
                "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8cb5791161d8b25897f60385f0ec7ab2.png?width=80&height=80",
                "text": "小米电视4S 75英寸"
            },
        ];

        for (let i = 0; i < this.boards.length; i++) {
            let template = ``;
            data.forEach(item => {
                const htmlString = `
                <div class="sg-goods-list-item">
                    <section class="item-img">
                        <img src="${item.src}"
                            alt="">
                    </section>
                    <section class="item-title">${item.text}</section>
                </div>`;

                template += htmlString;
            })
            this.boards[i].innerHTML = template;
        }
    },

    init() {
        this.setData();
    }
}
sideCollapse.init();
// #endregion
// ------- end -------

// ------- 小米闪购 -------
// #region
const timeLimit = {
    timeWrap: document.querySelector('.time-wrap'),

    format(segment) {
        return segment <= 9 ? '0' + segment : segment;
    },

    divideSegment(segment) {
        segment = String(segment);
        const tens = segment[0];
        const ones = segment[1];

        return {
            tens,
            ones,
        }
    },

    setData(timeObj) {
        const htmlString = `
            <section class="hour">
                <div class="tens-place">${timeObj.hour.tens}</div>
                <div class="ones-place">${timeObj.hour.ones}</div>
            </section>
            <section class="time-divide">:</section>
            <section class="minute">
                <div class="tens-place">${timeObj.minute.tens}</div>
                <div class="ones-place">${timeObj.minute.ones}</div>
            </section>
            <section class="time-divide">:</section>
            <section class="second">
                <div class="tens-place">${timeObj.second.tens}</div>
                <div class="ones-place">${timeObj.second.ones}</div>
            </section>
        `;

        this.timeWrap.innerHTML = htmlString;
    },

    initTimer() {
        const today = new Date().getDate();
        const tomrrow = new Date();
        tomrrow.setDate(today + 1);
        tomrrow.setHours(0);
        tomrrow.setMinutes(0);
        tomrrow.setSeconds(0);

        setInterval(() => {
            const date = new Date();
            const now = new Date(tomrrow - date);

            const hour = this.divideSegment(this.format(now.getHours()));
            const minute = this.divideSegment(this.format(now.getMinutes()));
            const second = this.divideSegment(this.format(now.getSeconds()));

            this.setData({ hour, minute, second });
        }, 1000);
    },

    init() {
        this.initTimer();
    }
}
timeLimit.init();
// #endregion
// ------- end -------

// ------- 手机分类渲染 -------
// #region
const spacialCategory = {
    tabs: document.querySelectorAll('.appliances-tab'),
    cateWrap: document.querySelector('.appliances-wrap').querySelector('.row'),
    getData() {
        const data = {
            hot: [
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg",
                    "title": "小米9 6GB+128GB",
                    "desc": "骁龙855，索尼4800万超广角微距三摄",
                    "num": "2599",
                    "price": "2999",
                    "originPrice": "2599"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1540429613.4617799!220x220.jpg",
                    "title": "小米MIX 3 6GB+128GB",
                    "desc": "磁动力滑盖全面屏 / 四曲面陶瓷机身",
                    "num": "2299",
                    "price": "3299",
                    "originPrice": "2299"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1552647865.67536173!220x220.jpg",
                    "title": "Redmi Note 7 Pro",
                    "desc": "6GB+128GB大存储，索尼4800万拍照",
                    "num": "1599",
                    "price": "1599",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1554694214.08887531!220x220.png",
                    "title": "小米Play 4GB+64GB",
                    "desc": "八核高性能处理器，后置1200万 AI 双摄",
                    "num": "749",
                    "price": "999",
                    "originPrice": "749"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1538019009.57772743!220x220.png",
                    "title": "小米8 屏幕指纹版 6GB+128GB",
                    "desc": "全球首款压感屏幕指纹 骁龙845处理器",
                    "num": "1799",
                    "price": "2999",
                    "originPrice": "1799"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1537324004.08544830!220x220.jpg",
                    "title": "小米8青春版6GB+64GB",
                    "desc": "潮流镜面渐变色，2400万自拍旗舰",
                    "num": "1499",
                    "price": "1699",
                    "originPrice": "1499"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1547020972.223707!220x220.jpg",
                    "title": "Redmi Note 7 6GB+64G",
                    "desc": "4800万拍照，4000mAh大电量",
                    "num": "1099",
                    "price": "1099",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1558857780.47412427!220x220.jpg",
                    "title": "Redmi K20 Pro 6GB+128GB",
                    "desc": "骁龙855旗舰处理器，索尼4800万超广角三摄",
                    "num": "2299",
                    "price": "2599",
                    "originPrice": "2299"
                }
            ],
            tv: [
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1500287084.72131750!220x220.jpg",
                    "title": "小米电视4A 32英寸",
                    "desc": "64位四核处理器 / 1GB+4GB大内存",
                    "num": "699",
                    "price": "799",
                    "originPrice": "699"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1535103027.24861415!220x220.jpg",
                    "title": "小米电视4A 65英寸",
                    "desc": "",
                    "num": "2599",
                    "price": "2999",
                    "originPrice": "2599"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a4/xmad_15350951136177_QUuVm.png",
                    "title": "15.6\"笔记本 i5 4G MX110",
                    "desc": "",
                    "num": "4199",
                    "price": "4199",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1524636075.71677607!220x220.jpg",
                    "title": "13.3\"小米笔记本Air 四核i7 8G 256G MX150 银色",
                    "desc": "",
                    "num": "5999",
                    "price": "5999",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1560161251.21862332!220x220.jpg",
                    "title": "米家互联网洗烘一体机 Pro 10kg",
                    "desc": "",
                    "num": "2999",
                    "price": "2999",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1545286017.38639954!220x220.jpg",
                    "title": "米家互联网空调（一级能效）",
                    "desc": "",
                    "num": "2399",
                    "price": "2699",
                    "originPrice": "2399"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1560232653.29021311!220x220.jpg",
                    "title": "烟灶套装（天然气）",
                    "desc": "吸油,燃气灶,油烟机,抽烟机,灶具,套装",
                    "num": "2298",
                    "price": "2298",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1559644554.04136931!220x220.jpg",
                    "title": "米家电烤箱",
                    "num": "299",
                    "price": "299",
                    "originPrice": null
                },
            ],
            computer: [
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1533266333.04566853!220x220.jpg",
                    "title": "15.6 Pro i5 8G 1050MAX-Q 256G",
                    "desc": "",
                    "num": "5999",
                    "price": "6299",
                    "originPrice": "5999"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1525231579.56571137!220x220.jpg",
                    "title": "13.3\"小米笔记本Air 四核i7 8G 256G MX150 深空灰",
                    "desc": "",
                    "num": "5999",
                    "price": "5999",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1533196142.85059414!220x220.png",
                    "title": "小米游戏本15.6”8代i7 16G 1T+256G 1060 6G",
                    "desc": "",
                    "num": "8999",
                    "price": "8999",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1524636075.71677607!220x220.jpg",
                    "title": "13.3\"小米笔记本Air 四核i7 8G 256G MX150 银色",
                    "desc": "",
                    "num": "5999",
                    "price": "5999",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1490595812.95661863!220x220.png",
                    "title": "小米无线鼠标",
                    "desc": "耐脏亲肤涂层，人体工学设计",
                    "num": "59",
                    "price": "69",
                    "originPrice": "59"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1478248566.62624407!220x220.jpg",
                    "title": "小米便携鼠标",
                    "desc": "轻薄便携，铝合金外壳 +ABS 材质",
                    "num": "99",
                    "price": "99",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1490702347.3628109!220x220.png",
                    "title": "悦米机械键盘",
                    "desc": "铝合金机身，TTC红轴，87 键",
                    "num": "149",
                    "price": "289",
                    "originPrice": "149"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1469523170.25518983!220x220.jpg",
                    "title": "多功能转接器",
                    "num": "149",
                    "price": "149",
                    "originPrice": null
                },
            ],
            home: [
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1465366178.11466342!220x220.jpg",
                    "title": "米家恒温电水壶",
                    "desc": "水温智能控制，304 不锈钢内胆",
                    "num": "199",
                    "price": "199",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1506417289.23728408!220x220.jpg",
                    "title": "小米随身手电筒",
                    "desc": "11 挡调光，随心而亮",
                    "num": "79",
                    "price": "79",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1472609961.95298675!220x220.jpg",
                    "title": "米家扫地机器人",
                    "desc": "智能路径规划，扫得干净扫得快",
                    "num": "1499",
                    "price": "1699",
                    "originPrice": "1499"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1510020567.64467830!220x220.jpg",
                    "title": "小米米家空气净化器 2S",
                    "desc": "OLED显示屏 / 激光颗粒物传感器",
                    "num": "699",
                    "price": "899",
                    "originPrice": "699"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/T1OVC_ByY_1RXrhCrK!220x220.jpg",
                    "title": "米家压力IH电饭煲",
                    "desc": "智能烹饪，灰铸铁粉体涂层内胆",
                    "num": "999",
                    "price": "999",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1496647119.81414190!220x220.jpg",
                    "title": "飞利浦智睿球泡灯",
                    "desc": "自由调节亮度，Wi-Fi随时操控",
                    "num": "49",
                    "price": "49",
                    "originPrice": null
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1495520422.36514041!220x220.jpg",
                    "title": "米家 LED 智能台灯",
                    "desc": "无可视频闪，四种场景优化调光",
                    "num": "149",
                    "price": "169",
                    "originPrice": "149"
                },
                {
                    "imgSrc": "//i1.mifile.cn/a1/pms_1490756071.3088664!220x220.png",
                    "title": "Yeelight LED 吸顶灯",
                    "num": "319",
                    "price": "319",
                    "originPrice": null
                },
            ],
        }

        return data;
    },
    setData(tab) {
        const data = this.getData()[!tab ? 'hot' : tab];
        this.cateWrap.innerHTML = '';

        data.forEach(item => {
            const htmlString = `
            <section class="row-item">
                <section class="new-tag">新品</section>
                <section class="item-img">
                    <img src="${item.imgSrc}" alt="">
                </section>
                <div class="item-info">
                    <span class="name">${item.title}</span>
                    <span class="desc">${item.desc}</span>
                    <span class="price">
                        <span class="num">${item.num}</span>
                        <del></del><span class="origin-num">${item.originPrice + '元'}</span><del>
                    </span>
                </div>
            </section>
            `;

            this.cateWrap.innerHTML += htmlString;
        })
    },
    init() {
        const that = this;
        this.setData();

        const arr = ['hot', 'tv', 'computer', 'home',];
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].index = i;
            this.tabs[i].key = arr[i];

            this.tabs[i].addEventListener('mouseover', function (e) {
                for (let j = 0; j < that.tabs.length; j++) {
                    that.tabs[j].className = 'sg-tab-item appliances-tab';
                }

                that.tabs[this.index].className = 'sg-tab-item appliances-tab active';
                that.setData(this.key);
            })
        }
        this.tabs[0].className = 'sg-tab-item appliances-tab active';
    },
}
spacialCategory.init();
// #endregion
// ------- end -------