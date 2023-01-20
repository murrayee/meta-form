import { ModelValidators, StoreValue } from "../types";
import type {
    Validator,
    ValidatorType,
    Rule
} from "../types/validators";

export const FIELD_ERROR_MESSAGES = {
    required: '请输入必填项',
    hexColor: "请输入16进制颜色,eg: #000, #000000",
    phone: "请输入正确的手机号码",
    IDNumber: "请输入正确的身份证号码",
    email: "请输入正确的邮箱",
    number: "请输入数字",
    integer: "请输入正整数",
    float: "请输入正整数",
    url: "请输入正确的URL",
};

export const validatorsFuncs: Record<ValidatorType, Validator> = {
    hexColor: async (_, value: StoreValue) => {
        if (/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.hexColor));
    },
    phone: async (_, value: StoreValue) => {
        if (
            /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.phone));
    },
    IDNumber: async (_, value: StoreValue) => {
        if (
            /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.IDNumber));
    },

    email: async (_, value: StoreValue) => {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.email));
    },

    number: async (_, value: StoreValue) => {
        if (
            /^\d{1,}$/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.number));
    },
    integer: async (_, value: StoreValue) => {
        if (
            /^\+?[1-9]\d*$/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.integer));
    },

    float: async (_, value: StoreValue) => {
        if (
            /^\d+\.\d+$/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.float));
    },
    url: async (_, value: StoreValue) => {
        if (
            /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
                value
            )
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(FIELD_ERROR_MESSAGES.url));
    },
};

export const generateFieldRules = (validators: ModelValidators = [], required?: boolean): Rule[] => {
    const rules = [];

    if (required) {
        rules.push({
            required,
            message: FIELD_ERROR_MESSAGES.required
        })
    }

    const presetsKeys = Object.keys(validatorsFuncs);

    const fieldRules = validators.reduce((prev: Rule[], rule) => {

        if (typeof rule === 'string' && presetsKeys.includes(rule)) {
            prev.push({
                validator: validatorsFuncs[rule]
            })
        }
        else if (typeof rule === 'object' && rule.validator) {
            prev.push(rule)
        }
        else if (typeof rule === 'function') {
            prev.push(rule)
        }
        return prev;
    }, [])

    return [...rules, ...fieldRules];
};
