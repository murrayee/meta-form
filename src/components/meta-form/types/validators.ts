// reference antd validator type and meta-form custom validators.

import { Rule, RuleRender, RuleObject } from "antd/es/form";
import { StoreValue } from ".";

export type { Rule, RuleRender, RuleObject };


export type MessageFunc = (value: StoreValue) => string

export type Validator = (
    rule: Rule,
    value: StoreValue,
    callback: (error?: string) => void
) => Promise<void | any> | void;

export type ValidatorType =
    | "hexColor"
    | "phone"
    | "IDNumber"
    | "email"
    | "number"
    | "integer"
    | "float"
    | "url"
