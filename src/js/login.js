// @ts-nocheck
import "../css/default.scss"
import "../css/login.scss"


// ------- 账号和密码处理 -------
// #region
const accountOpt = {
    tabs: document.querySelectorAll('.login-tabs-wrap .sg-tab'),
    tabUnderline: document.querySelector('.tab-underline'),

    form: document.querySelector('.login-form'),

    psdInput: document.querySelector('#psd'),
    psdLabel: document.querySelector('#psd-label'),
    psdTip: document.querySelector('#psd-tip'),

    accountInput: document.querySelector('#account'),
    accountLabel: document.querySelector('#account-label'),
    accountTip: document.querySelector('#account-tip'),

    // 校验器(简)
    invalidTip(val, elm, tip) {
        if (val === '') {
            elm.innerHTML = `${tip}不能为空`;
            elm.classList.add('invalid');
        } else {
            elm.innerHTML = ``;
            elm.classList.remove('invalid');
        }
    },

    // ------- 输入框 聚焦失焦 事件 -------
    // #region

    // 处理 输入框 focus 事件
    handleFocus(eventElm, statusElm) {
        eventElm.addEventListener('focus', function (e) {
            statusElm.classList.add('focus');
        })
    },

    // 处理 输入框 blur 事件
    handleBlur(eventElm, statusElm, tipElm) {
        const that = this;

        eventElm.addEventListener('blur', function (e) {
            if (e.target.value === '') {
                statusElm.classList.remove('focus');
                statusElm.classList.add('invalid');
            }

            that.invalidTip(e.target.value, tipElm, '账号');
        })
    },

    // 统一注册 blur 和 focus 事件
    addFocusAndBlurEvent() {
        const that = this;

        that.handleFocus(this.accountInput, this.accountLabel);
        that.handleBlur(this.accountInput, this.accountLabel, that.accountTip);

        that.handleFocus(this.psdInput, this.psdLabel);
        that.handleBlur(this.psdInput, this.psdLabel, that.psdTip);
    },

    // #endregion
    // ------- end -------

    // ------- 处理输入事件 -------
    // #region

    // 
    handleInput(inputElm, labelElm) {
        inputElm.addEventListener('input', function (e) {
            if (e.target.value === '') labelElm.classList.add('invalid');
            else labelElm.classList.remove('invalid');
        })
    },

    addInputEvent() {
        this.handleInput(this.accountInput, this.accountLabel, this.accountTip);
        this.handleInput(this.psdInput, this.psdLabel, this.psdTip);
    },

    // #endregion
    // ------- end -------

    // ------- tab栏切换 -------
    // #region
    handleChangeTab() {
        const that = this;
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].index = i;

            this.tabs[i].addEventListener('click', function () {
                that.tabUnderline.style.left = this.index * 3.5 + 'rem';
            })
        }
    },
    // #endregion
    // ------- end -------

    // ------- 提交事件 -------
    // #region
    handleFormSubmit() {
        const that = this;
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        })
    },
    // #endregion
    // ------- end -------

    init() {
        this.addFocusAndBlurEvent();
        this.addInputEvent();
        this.handleChangeTab();
        this.handleFormSubmit();
    }
}

accountOpt.init();
// #endregion
// ------- end -------
