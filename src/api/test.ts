
import dayjs from 'dayjs'
import { delay } from './common'
import request from './request'


export const fetchDecorationApplication = async () => {
    // return request.get('/api/decoration/detail/123')


    await delay(2)
    return Promise.resolve({
        status: 'SUBMITTED',
        applyNo: 'CX2023010133',
        residenceName: '人居越秀合樾林语-和峯',
        province: '12',
        city: '1201',
        district: '120101',
        street: '120101001',
        address: '四川省成都市天府新区天梓路二段222号人居越秀合樾林语-和峯三栋三单元1102',
        area: 137,
        currentStyle: 'pure',
        plan: ['https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF', 'https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF'],
        ownerName: '罗纳尔多',
        phone: 18501234431,
        card: '513822199307151799',
        decorationStyle: ["2", '1', "4", "5"],
        decorationPeriod: 5,
        decorationStartTime: 1673884800000,
        decorationEndTime: 1673884800000,
        decorationDeposit: true,
        decorationTotalAmount: 20,
        workers: [
            { workerName: '李强', workerPhone: '1982231234', workerRole: '1', workDays: 60, expenses: 100 },
            { workerName: '张网', workerPhone: '1982231234', workerRole: '2', workDays: 14, expenses: 200 },
            { workerName: '朱坚强', workerPhone: '1982231234', workerRole: '3', workDays: 60, expenses: 300 },
            { workerName: '易烊千玺', workerPhone: '1982231234', workerRole: '4', workDays: 60, expenses: 400 },
            { workerName: '王源', workerPhone: '1982231234', workerRole: '5', workDays: 60, expenses: 500 },
        ],
        priceList: [
            { project: '1', brand: '苹果', price: 15000, discount: 95 },
            { project: '2', brand: '特斯拉', price: 2000, discount: 70 },
            { project: '3', brand: '梅赛德斯', price: 80000, discount: 70 },
        ],
        approveInfo: []
    })
}
