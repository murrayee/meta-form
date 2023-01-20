import dayjs, { Dayjs } from "dayjs";
import { Model } from "./components/meta-form/types/index";

const model: Model = {
    status: {
        type: "text",
        default: "",
    },
    applyNo: {
        type: "text",
        default: "",
    },
    region: {
        type: "model",
        label: "省市区",
        widget: "cascader",
        widgetProps: {
            remote: 'region'
        },
        flat: true,
        model: {
            province: {
                type: "text",
                index: 0,
            },
            city: {
                type: "text",
                index: 1,
            },
            district: {
                type: "text",
                index: 2,

            },
            street: {
                type: "text",
                index: 3,
            },
        },

        // default: [1, 2, 3, 4]
    },
    residenceName: {
        type: "text",
        widget: "text-field",
        widgetProps: {
            maxLength: 10,
        },
        label: "小区名称",
        default: "小李",
        validators: [],
    },
    address: {
        type: "text",
        widget: "textarea",
        widgetProps: {
            maxLength: 300
        },
        label: "详细地址",
        default: "",
    },
    area: {
        type: "number",
        label: "房屋面积",
        widget: "number-field",
        widgetProps: {
            unit: 'm²'
        },
        default: 0,
    },
    currentStyle: {
        type: "text",
        label: "装修风格",
        widget: "radio",
        widgetProps: {
            options: [
                { label: "精装", value: "colorful" },
                { label: "简装", value: "pure" },
                { label: "清水", value: "no" },
            ],
        },
    },
    plan: {
        type: "text[]",
        widget: "upload",
        widgetProps: {
            maxCount: 2
        },
        label: "平面图",
    },
    ownerName: {
        type: "text",
        widget: "text-field",
        widgetProps: {
            maxLength: 20
        },
        label: "联系人",
    },
    phone: {
        type: "text",
        widget: "text-field",
        validators: ['phone'],
        label: "联系电话",
    },
    card: {
        type: "text",
        widget: "text-field",
        label: "身份证号码",
        validators: ["IDNumber"],
    },
    decorationStyle: {
        type: "text[]",
        label: "偏好风格",
        widget: "checkbox",
        widgetProps: {
            options: [
                { label: "现代简约风格", value: "1" },
                { label: "田园风格", value: "2" },
                { label: "后现代风格", value: "3" },
                { label: "中式风格", value: "4" },
                { label: "新中式风格", value: "5" },
                { label: "地中海风格", value: "6" },
                { label: "东南亚风格", value: "7" },
                { label: "美式风格", value: "8" },
                { label: "新古典风格", value: "9" },
                { label: "日式风格", value: "10" },
            ]
        }
    },
    decorationPeriod: {
        type: "number",
        label: "装修周期",
        widget: "number-field",
        validators: ['integer'],
        widgetProps: {
            unit: '个月'
        },
    },
    decorationStartTime: {
        type: "number",
        label: "开始时间",
        widget: "date-picker",
        widgetProps: {
            disabledDate: (current: Dayjs) => current && current < dayjs().endOf('day')
        }
    },
    decorationEndTime: {
        type: "number",
        label: "预计结束时间",
        widget: "date-picker",
        widgetProps: {
            disabledDate: (current: Dayjs) => current && current < dayjs().endOf('day')
        },
        dependencies: ['decorationStartTime'],
        validators: [({ getFieldValue }) => ({
            validator: async (_, value) => {
                const startTime = getFieldValue('decorationStartTime');
                if (dayjs(value).isAfter(startTime)) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(new Error('结束时间必须大于开始时间'))
                }
            }
        })]
    },
    decorationDeposit: {
        type: "boolean",
        label: "预缴定金",
        widget: "switch",
        widgetProps: {
            checkedChildren: '是',
            unCheckedChildren: '否'
        }
    },

    decorationTotalAmount: {
        type: "number",
        label: "总共报价",
        widget: "number-field",
        validators: ['integer'],
        widgetProps: {
            unit: '万元'
        }
    },
    workers: {
        type: "model[]",
        widget: "table",
        widgetProps: {},
        addable: true,
        model: {
            workerName: {
                type: "text",
                widget: "text-field",
                label: "工人名称",
                widgetProps: {
                    maxLength: 20
                }
            },
            workerPhone: {
                type: "text",
                widget: "text-field",
                label: "联系电话",
                validators: ['integer']
            },
            workerRole: {
                type: "text",
                widget: "select",
                label: "工人角色",
                widgetProps: {
                    options: [{
                        label: '监工',
                        value: '1'
                    }, {
                        label: '设计师',
                        value: '2'
                    },
                    {
                        label: '泥工',
                        value: '3'
                    },
                    {
                        label: '木工',
                        value: '4'
                    },
                    {
                        label: '漆工',
                        value: '5'
                    },
                    ]
                }
            },
            workDays: {
                type: "number",
                widget: "number-field",
                label: "雇佣天数",
                widgetProps: {
                    unit: '天'
                }
            },
            expenses: {
                type: "number",
                widget: "number-field",
                label: "费用（天）",
                widgetProps: {
                    unit: '￥'
                }
            },
        },
    },
    priceList: {
        type: "model[]",
        widget: "table",
        addable: true,
        model: {
            project: {
                type: "text",
                widget: "select",
                label: "项目",
                widgetProps: {
                    options: [
                        {
                            value: '1',
                            label: '厨房'
                        },
                        {
                            value: '2',
                            label: '柜子'
                        },
                        {
                            value: '3',
                            label: '窗户'
                        },
                        {
                            value: '4',
                            label: '地板'
                        },
                        {
                            value: '5',
                            label: '家电-电视'
                        },
                        {
                            value: '6',
                            label: '家电-冰箱'
                        },
                    ]
                }
            },
            brand: {
                type: "text",
                widget: "text-field",
                label: "品牌",
            },
            price: {
                type: "number",
                widget: "number-field",
                label: "报价",
                widgetProps: {
                    unit: 'currency-select'
                }
            },
            discount: {
                type: "number",
                widget: "number-field",
                label: "折扣",
                widgetProps: {
                    unit: '%'
                }
            },
        },
    },
    // 业务组件，由于逻辑不可控，model设计上只做描述
    approveInfo: {
        type: 'model',
        widget: 'biz-demo',
        model: {
            approver: {
                type: 'text',
            }
        }
    }
};

export default model;
