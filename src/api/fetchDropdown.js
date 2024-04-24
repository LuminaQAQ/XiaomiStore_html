// @ts-nocheck
import { redmiPhone, xiaomiPhone } from '../mock/dropdown_phone.js'

export function fetchData(api) {
    const data = {
        redmi: redmiPhone,
        xiaomi: xiaomiPhone,
    }

    return data[api];
}