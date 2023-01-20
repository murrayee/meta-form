import { isArray, isNumber } from "lodash";
import {
    BaseValueType,
    Model,
    ModelArraySchema,
    ModelSchema,
    StoreObjectValues,
    StoreValue,
} from "../types";

export const genInitialValues = (model: Model) => {
    const keys = Object.keys(model);
    return keys.reduce((prev, next) => {
        if (model[next].type === "model") {
            const modelSchema = model[next] as ModelSchema<unknown>;
            if (modelSchema.flat) {
                prev[next] = model[next].default;
            } else {
                // TODO biz field
            }
        } else if (model[next].type === "model[]") {
            const modelArraySchema = model[next] as ModelArraySchema<unknown>;
            // TODO  children special.
            prev[next] = model[next].default || [];
        } else {
            prev[next] = model[next].default;
        }
        return prev;
    }, {} as StoreObjectValues);
};

export const deserialize = (model: Model, raw: StoreObjectValues) => {
    const keys = Object.keys(model);
    return keys.reduce((prev, next) => {
        if (model[next].type === "model") {
            const modelSchema = model[next] as ModelSchema<unknown>;
            if (modelSchema.flat) {
                const children = modelSchema.model;
                const flattedKeys = Object.keys(children);
                const defaultFlatValues = flattedKeys
                    .sort((a, b) => (children[a].index || 0) - (children[b].index || 0))
                    .map((key) => raw[key]);
                prev[next] = defaultFlatValues;
            }
        } else {
            prev[next] = raw[next];
        }
        return prev;
    }, {} as StoreObjectValues);
};

// model => formValues => raw => final raw
export const serialize = (
    model: Model,
    formValues: StoreObjectValues,
    raw: StoreObjectValues
) => {
    // 处理合并字段 浅拷贝
    const formKeys = Object.keys(model);
    const finalRaw = formKeys.reduce((prev, next) => {
        if (formValues.hasOwnProperty(next)) {
            if (model[next].type === "model") {
                const modelSchema = model[next] as ModelSchema<unknown>;
                if (modelSchema.flat) {
                    const children = modelSchema.model;
                    const values = formValues[next] as StoreValue[];
                    const flattedKeys = Object.keys(children);
                    flattedKeys.forEach((flatKey, index) => {
                        const localIndex = children[flatKey].index;
                        prev[flatKey] = values[isNumber(localIndex) ? localIndex : index];
                    });
                }
            } else {
                prev[next] = formValues[next];
            }
        } else {
            prev[next] = raw[next];
        }
        return prev;
    }, {} as StoreObjectValues);
    return finalRaw;
};



export const findLabelByValue = (
    value: BaseValueType | BaseValueType[],
    options: { value: BaseValueType; label: string }[]
) => {
    if (!value) {
        return null
    } else if (isArray(value)) {
        return value.map(item => options.find((n) => n.value === item)?.label)

    } else {
        return options.find((item) => item.value === value)?.label;
    }
};

