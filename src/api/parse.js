const {
    writeFileSync
} = require('fs');
const json = require('./area_format_array.json')


const paths = ['aa', 'aaaa', 'aaaaaa', 'aaaaaaaaa'];

const grouped = json.reduce((prev, next) => {
    const len = String(next.i).length;
    next = {
        value: String(next.i),
        label: String(next.n),
        parentId: String(next.p),
        pinyin: String(next.y)
    }
    const key = paths.find(i => i.length === len);
    if (prev[key]) {
        prev[key].push(next)
    } else {
        prev[key] = [next]
    }
    return prev
}, {})



const getTree = (pathIndex, data) => {
    const path = paths[pathIndex];
    const target = data[path]
    const parentIndex = pathIndex - 1

    const parents = data[paths[parentIndex]] || []

    parents.forEach(item => {
        item.children = target.reduce((prev, next) => {

            if (next.parentId === item.value) {
                prev.push(next)
            }
            return prev
        }, [])
    });
    if (parentIndex >= 0) {
        getTree(parentIndex, data)
    }
    return data
}
const zz = getTree(paths.length - 1, {
    'a': [],
    ...grouped,
})

writeFileSync('./region.json', JSON.stringify(zz.aa))