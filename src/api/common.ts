

import regions from './region.json'

export const delay = async (time: number) => new Promise(resolve => setTimeout(resolve, time * 1000))


export interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

export const fetchRegions = async (): Promise<Option[]> => {
    await delay(2)
    return Promise.resolve(regions as (Option[]))
}