import { ReactNode } from "react";
import type {
    FieldType,
    CascaderWidgetProps,
    DatePickerWidgetProps,
    NumberWidgetProps,
    RadioWidgetProps,
    SelectWidgetProps,
    SwitchWidgetProps,
    TextAreaWidgetProps,
    TextWidgetProps,
    TimePickerWidgetProps,
    CheckboxWidgetProps,
    UploadWidgetProps,
    BizDemoWidgetProps,
} from "../fields";

import type { TableWidgetProps } from "../as/Table";
import { Rule, RuleObject, RuleRender, ValidatorType } from "./validators";

type FieldSpecialType = "table";

export type BaseValueType = string | number | undefined

export type StoreValue = any;

export type StoreObjectValues = Record<string, StoreValue>

export type NamePath = string | number | (string | number)[];

export interface FieldInTableProps {
    // in table column field props
    fieldInTable?: boolean
    ellipsis?: boolean
    fixed?: boolean | 'left' | 'right'
    width?: number
    showOnly?: boolean
}

export interface NodeCommonProps extends FieldInTableProps {
    prop: string;
    mode?: Mode;
    label?: string | ReactNode;
    required?: boolean;
    disabled?: boolean;
    rules?: Rule[]
    // width prop use input field.
    width?: number;
};

export type GenerateSortType<Keys extends keyof any> = {
    [Key in Keys]: {
        [Key2 in Key]: "desc" | "asc";
    } & {
        [Key3 in Exclude<Keys, Key>]: false;
    };
}[Keys];

export type Mode = "view" | "edit";

export type WidgetProps<T extends FieldType | FieldSpecialType | unknown> =
    T extends "checkbox"
    ? CheckboxWidgetProps
    : T extends "date-picker"
    ? DatePickerWidgetProps
    : T extends "time-picker"
    ? TimePickerWidgetProps
    : T extends "number-field"
    ? NumberWidgetProps
    : T extends "radio"
    ? RadioWidgetProps
    : T extends "select"
    ? SelectWidgetProps
    : T extends "switch"
    ? SwitchWidgetProps
    : T extends "textarea"
    ? TextAreaWidgetProps
    : T extends "text-field"
    ? TextWidgetProps
    : T extends "cascader"
    ? CascaderWidgetProps
    : T extends "upload"
    ? UploadWidgetProps
    : T extends "table"
    ? TableWidgetProps
    : T extends "bizDemo"
    ? BizDemoWidgetProps
    : unknown;


export type ModelValidators = (RuleRender | ValidatorType | RuleObject)[]



interface CommonSchema<T> {
    label?: string;
    widget?: T;
    widgetProps?: WidgetProps<T>;
    dependencies?: NamePath[];
    validators?: ModelValidators;
}

interface TextSchema<T extends FieldType> extends CommonSchema<T> {
    type: "text";
    default?: string;
}

interface TextArraySchema<T extends FieldType> extends CommonSchema<T> {
    type: "text[]";
    default?: string[];
}

interface NumberSchema<T extends FieldType> extends CommonSchema<T> {
    type: "number";
    default?: number;
}

interface NumberArraySchema<T extends FieldType> extends CommonSchema<T> {
    type: "number";
    default?: number;
}

interface BooleanSchema<T extends FieldType> extends CommonSchema<T> {
    type: "boolean";
    default?: boolean;
}

export interface ModelSchema<T extends FieldType | unknown>
    extends CommonSchema<T> {
    type: "model";
    // index be used flat.
    model: Record<string, Partial<Schema & { index: number }>>;
    flat?: boolean;
    default?: Object | StoreValue[];
}

export interface ModelArraySchema<
    T extends FieldType | FieldSpecialType | unknown
> extends CommonSchema<T> {
    type: "model[]";
    model: Record<string, Partial<Schema>>;
    addable?: boolean;
    default?: [];
}

export type Schema =
    | TextSchema<"textarea">
    | TextSchema<"text-field">
    | TextSchema<"radio">
    | TextSchema<"select">
    | TextArraySchema<"checkbox">
    | TextArraySchema<"select">
    | TextArraySchema<"upload">
    | NumberSchema<"number-field">
    | NumberSchema<"date-picker">
    | NumberSchema<"time-picker">
    | BooleanSchema<"switch">
    | ModelSchema<"cascader">
    | ModelSchema<"select">
    | ModelSchema<"biz-demo">
    | ModelArraySchema<"table">
    | NumberArraySchema<never>;

export type SchemaType = Schema["type"];

export type Model = Record<string, Schema>;
