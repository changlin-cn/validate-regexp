const regex = require('../src/index');

const allTypes = [
    {
        type: 'empty',
        true: [''],
        false: [
            '1.a',
            '`',
            ' ',
            `
    `,
        ],
    },
    {
        type: 'IdCard',
        true: [
            '512123499875412541',
            '512123499875412',
            '51212349987541254X',
            '51212349987541254x',
        ],
        false: [
            '',
            'a',
            '123412341',
            '12345123451234',
            '5121234998754125423',
            '51212349987541254a',
        ],
    },
    {
        type: 'ip',
        true: [
            '0.0.0.0',
            '0.0.0.1',
            '1.0.0.1',
            '1.1.1.1',
            '1.9.1.1',
            '1.10.1.1',
            '1.10.1.1',
            '100.10.1.1',
            '200.10.1.1',
            '255.10.1.1',
            '255.10.1.199',
            '255.10.1.255',
            '255.255.255.255',
        ],
        false: [
            '01.1.2.3',
            '',
            '1',
            '1,2,2,3',
            '255.255.255.256',
            '.255.255.255',
            '255.255.255.',
            '255.255.255.263',
            '255.255.255.25.3',
            '255.255.255.350',
            '256.255.255.256',
            '256.255.255.2',
            '255.255.255.-2',
            '255.255.255.-2',
        ],
    },
    {
        type: 'number',
        true: [
            '1',
            '2',
            '3',
            '2300',
            '0001.',
            '-1.2',
            '-5.2',
            '-001.',
            '-111.00121',
            '-0.001',
            '1.2',
            '0.1',
            '+12',
        ],
        false: ['1.a', '..a', '..1', '1..', '`', ''],
    },
    {
        type: 'integer',
        true: ['1', '2', '3', '2300', '0001.', '+123', '-2'],
        false: ['-1.2', '-5.2', '-111.00121', '-0.001', '1.2', '0.1', ''],
    },
    {
        type: 'positiveNumber',
        true: [
            '1',
            '2',
            '3',
            '2300',
            '1.2',
            '0.32341',
            '0001.2',
            '0001.',
            '+1234',
        ],
        false: ['-1.2', '0', '-1', '-5.2', '-001.', '-111.00121', '-0.001', ''],
    },
    {
        type: 'positiveInteger',
        true: ['1', '2', '3', '2300', '+1234'],
        false: ['1.2', '0', '-1', '-5.2', ''],
    },
    {
        type: 'url',
        true: [
            'http://www.baidu.com',
            'http://www.baidu.com?a=3',
            'http://www.baidu.com?a=3&',
            'http://www.baidu.com?a=3&b=4',
            'http://www.baidu.com?a=3&b=4#',
            'http://www.baidu.com?a=3&b=4#asdflkjla',
            'http://www.baidu.com?a=3&b=4#/asdflkjla?a=5',
            'https://www.baidu.com',
        ],
        false: [
            'htt://www.baidu.com',
            'http//www.baidu.com',
            'http:www.baidu.com',
            'http://',
            'asdfas',
            'http://#asdf',
            'http://SLDKasdf?asdf',
            'www.baidu.com',
        ],
    },
    {
        type: 'tel',
        true: [
            '028-12323424',
            '0754-12323424',
            '0086-0754-12323424',
            '(0754)12323424',
            '(0754)12323424877',
            '（0754）12323424877',
            '13345635673',
            '15345635673',
            '+8615345635673',
            '+861-15345635673',
        ],
        false: [
            'htt://www.baidu.com',
            '',
            'a12342341234',
            '-1234234234',
            '%asdf1239847102',
            '2341',
            '123',
        ],
    },
    {
        type: 'mobilePhone',
        true: ['13345635673', '15345635673', '+8615345635673'],
        false: [
            'htt://www.baidu.com',
            '',
            'a12342341234',
            '-1234234234',
            '%asdf1239847102',
            '2341',
            '123',
            '1234123412',
        ],
    },
    {
        type: 'email',
        true: [
            'user@125.com',
            'user-admin@163.com',
            'user_2005@qq.com',
            'user@name.site',
            'user@name.site.com',
            'user@142.135.50.88',
            'user@142.135.50.88.87.65',
            'user_2005@abcdasddf.com.cn',
            'user_2005@abcdasddf.com',
            'user_2005@abcdasddf.cn',
            'user_2005@abcdasddf.site',
            '123412341234@pp.com'
        ],
        false: [
            'htt://www.baidu.com',
            'user_2005@qqcom',
            'user_2005@qq.',
            'user_2005@.com',
            'user_2005@.com.cn',
            'user_2005@.com.site',
            '',
            'a12342341234',
            '-1234234234@qq.com',
            '%asdf1239847102@aa.com',
            '2341',
            '-user@125.com',
            '_user-admin@163.com',
            'user-_admin@163.com',
            '.user_2005@qq.com',
        ],
    },
    {
        type: 'account',
        true: ['admini', 'admin12341234123', 'admin_90', 'admin_83238429'],
        false: [
            '',
            '5432asdfasfd',
            '_asdfqw2342',
            'asdf',
            'asdfasdfjklkjhtew',
            'asdf;asdf',
            '-asdfasdfa',
            'asdf-asdfasdf',
            'asdf$980787',
        ],
    },
];

allTypes.forEach((one) => {
    one['true'].forEach((item) => {
        test(`${item} should  be ${one.type}`, function() {
            expect(regex[one.type].test(item)).toBe(true);
        });
    });
    one['false'].forEach((item) => {
        test(`${item} should not be  ${one.type}`, function() {
            expect(regex[one.type].test(item)).toBe(false);
        });
    });
});
