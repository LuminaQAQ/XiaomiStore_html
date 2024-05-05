// @ts-nocheck
import "../css/default.scss"
import "../css/header.scss"
import "../css/nav.scss"
import "../css/footer.scss"
import "../css/index.scss"
import "../css/goodsDetails.scss"

import "../css/swiper.scss"


import { fetchData } from '../api/fetchDropdown.js'
import * as  layui from "layui"
import jquery from "jquery"



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