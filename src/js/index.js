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