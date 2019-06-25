// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
    // 支持值为 Object 和 Array
    'GET /api/followup/dataset': {
        reservationDateType: setMock(['预约日期', '末次就诊日期']),
        reservationDuringType: setMock(['之前', '当天', '之后'])

    },
    // GET POST 可省略
    'GET /api/users': [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ],
    'POST /api/login/account': (req, res) => {
        const { password, userName, type } = req.body;
        if (password === '12345' && userName === 'admin') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'admin',
            });
            return;
        }
        if (password === '12345' && userName === 'user') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'user',
            });
            return;
        }
        res.send({
            status: 'error',
            type,
            currentAuthority: 'guest',
        });
    },
    'POST /api/register': (req, res) => {
        res.send({ status: 'ok', currentAuthority: 'user' });
    },
    'GET /api/500': (req, res) => {
        res.status(500).send({
            timestamp: 1513932555104,
            status: 500,
            error: 'error',
            message: 'error',
            path: '/base/category/list',
        });
    },
    'GET /api/404': (req, res) => {
        res.status(404).send({
            timestamp: 1513932643431,
            status: 404,
            error: 'Not Found',
            message: 'No message available',
            path: '/base/category/list/2121212',
        });
    },
    'GET /api/403': (req, res) => {
        res.status(403).send({
            timestamp: 1513932555104,
            status: 403,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
    'GET /api/401': (req, res) => {
        res.status(401).send({
            timestamp: 1513932555104,
            status: 401,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
};


function setMock(arr, labelKey = 'label', valueKey = 'value') {
    return arr.map(a => {
        return {
            [valueKey]:
                Math.random()
                    .toString(16)
                    .slice(2),
            [labelKey]: a,
            // description: `description of content${a}`,
            // chosen:true
        };
    });
}
