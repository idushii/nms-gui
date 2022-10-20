export interface RepairShip {
    title: string,
    products: {
        product: string,
        count: number
    }[],
}

export const repairShip: RepairShip[] = [
    {
        title: 'поврежденная гидравлика',
        products: [
            {
                product: 'кислород',
                count: 50,
            },
            {
                product: 'диоксид',
                count: 40,
            },
        ],
    },
    {
        title: 'повреждение механизмов',
        products: [
            {
                product: 'хром металл',
                count: 150,
            },
            {
                product: 'проводной станок',
                count: 3,
            },
        ],
    },
    {
        title: 'трещина в корпусе',
        products: [
            {
                product: 'хром металл',
                count: 100,
            },
        ],
    },
    {
        title: 'расплавленная топливная ячейка',
        products: [
            {
                product: 'фосфор',
                count: 75,
            },
            {
                product: 'метал обшивка',
                count: 3,
            },
            {
                product: 'пирит',
                count: 60,
            },
        ],
    },
    {
        title: 'сгорвеший компрессор',
        products: [
            {
                product: 'проводной станок',
                count: 2,
            },
            {
                product: 'антиматерия',
                count: 3,
            },
        ],
    },
    {
        title: 'проржавевшие баки',
        products: [
            {
                product: 'активированная медь',
                count: 75,
            },
        ],
    },
    {
        title: 'взорванная панель',
        products: [
            {
                product: 'чистый феррит',
                count: 215,
            },
            {
                product: 'золото',
                count: 75,
            },
        ],
    },
    {
        title: 'обугленный кожух',
        products: [
            {
                product: 'хром металл',
                count: 75,
            },
            {
                product: 'пугний',
                count: 25,
            },
            {
                product: 'платина',
                count: 25,
            },
        ],
    },
    {
        title: 'разгерметизация',
        products: [
            {
                product: 'хром металл',
                count: 60,
            },
            {
                product: 'золото',
                count: 45,
            },
            {
                product: 'намагниченный феррит',
                count: 50,
            },
        ],
    },
    {
        title: 'утечка радиации',
        products: [
            {
                product: 'пугний',
                count: 10,
            },
            {
                product: 'парафиний',
                count: 150,
            },
        ],
    },
    {
        title: 'окисленные схемы',
        products: [
            {
                product: 'намагниченный феррит',
                count: 100,
            },
            {
                product: 'хлор',
                count: 10,
            },
        ],
    },
    {
        title: 'разбитый бастион',
        products: [
            {
                product: 'платина',
                count: 50,
            },
        ],
    },
]