import React from "react";
import CheckBox from "./Checkbox";
import DatePicker from "./DatePicker";
import NumberField from "./NumberField";
import Radio from "./Radio";
import Select from "./Select";
import Switch from "./Switch";
import TextArea from "./TextArea";
import TextField from "./TextField";
import TimePicker from "./TimePicker";
import Cascader from "./Cascader";
import Upload from "./Upload";
import BizDemo from "./biz/BizDemo";


export type { BizDemoWidgetProps } from './biz/BizDemo'
export type { CheckboxWidgetProps } from "./Checkbox";
export type { DatePickerWidgetProps } from "./DatePicker";
export type { NumberWidgetProps } from "./NumberField";
export type { RadioWidgetProps } from "./Radio";
export type { SelectWidgetProps } from "./Select";
export type { SwitchWidgetProps } from "./Switch";
export type { TextAreaWidgetProps } from "./TextArea";
export type { TextWidgetProps } from "./TextField";
export type { TimePickerWidgetProps } from "./TimePicker";
export type { CascaderWidgetProps } from "./Cascader";
export type { UploadWidgetProps } from "./Upload";

export type BaseFieldType =
    | "checkbox"
    | "date-picker"
    | "time-picker"
    | "number-field"
    | "radio"
    | "select"
    | "switch"
    | "textarea"
    | "text-field"
    | "cascader"
    | "upload"


// TODO reset widget props and refactor props interface later.   
export const BASE_FIELD_MAPPER: Record<
    BaseFieldType,
    React.ComponentType | React.FunctionComponent | React.ElementType
> = {
    checkbox: CheckBox,
    "date-picker": DatePicker,
    "number-field": NumberField,
    radio: Radio,
    select: Select,
    switch: Switch,
    textarea: TextArea,
    "text-field": TextField,
    "time-picker": TimePicker,
    cascader: Cascader,
    upload: Upload
};

export type BaseBizFieldType = "biz-demo";

// TODO reset widget props and refactor props interface later.   
export const BIZ_FIELD_MAPPER: Record<
    BaseBizFieldType,
    React.ComponentType | React.FunctionComponent | React.ElementType
> = {
    "biz-demo": BizDemo,
};

export type FieldType = BaseFieldType | BaseBizFieldType;

export const FIELD_MAPPER = {
    ...BIZ_FIELD_MAPPER,
    ...BASE_FIELD_MAPPER,
};
