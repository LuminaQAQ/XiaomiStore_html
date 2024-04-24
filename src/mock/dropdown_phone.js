function getXiaomiBaseURL(url) {
    return '../assets/images/mock/header dropdown phone/xiaomi phone/' + url + '.png';
}

function getRedmiBaseURL(url) {
    return '../assets/images/mock/header dropdown phone/redmi phone/' + url + '.png';
}

export const xiaomiPhone = [
    {
        "src": getXiaomiBaseURL('Xiaomi Civi 2') + '',
        "title": "Xiaomi Civi 2",
        "price": "2399元起"
    },
    {
        "src": getXiaomiBaseURL("Xiaomi MIX Fold 2"),
        "title": "Xiaomi MIX Fold 2",
        "price": "8999元起"
    },
    {
        "src": getXiaomiBaseURL("Xiaomi 12S Ultra"),
        "title": "Xiaomi 12S Ultra",
        "price": "5999元起"
    },
    {
        "src": getXiaomiBaseURL("Xiaomi 12S Pro"),
        "title": "Xiaomi 12S Pro",
        "price": "4699元起"
    },
    {
        "src": getXiaomiBaseURL("Xiaomi 12S"),
        "title": "Xiaomi 12S",
        "price": "3999元起"
    },
    {
        "src": getXiaomiBaseURL("Xiaomi 12 Pro 天玑版"),
        "title": "Xiaomi 12 Pro 天玑版",
        "price": "3999元起"
    }
];

export const redmiPhone = [
    {
        "src": getRedmiBaseURL("Redmi Note 12 5G"),
        "title": "Redmi Note 12 5G",
        "price": "1199元起"
    },
    {
        "src": getRedmiBaseURL("Redmi Note 12 Pro"),
        "title": "Redmi Note 12 Pro",
        "price": "1699元起"
    },
    {
        "src": getRedmiBaseURL("Redmi Note 12 Pro+"),
        "title": "Redmi Note 12 Pro+",
        "price": "2199元起"
    },
    {
        "src": getRedmiBaseURL("Redmi K50 至尊版"),
        "title": "Redmi K50 至尊版",
        "price": "2999元起"
    },
    {
        "src": getRedmiBaseURL("Redmi Note 11T Pro+"),
        "title": "Redmi Note 11T Pro+",
        "price": "2099元起"
    },
    {
        "src": getRedmiBaseURL("Redmi Note 11T Pro"),
        "title": "Redmi Note 11T Pro",
        "price": "1799元起"
    }
];