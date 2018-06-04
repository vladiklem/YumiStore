var orders = [
    {
        id: "1",
        customerName: "Lana Del Fi",
        type: "unconfirmed",
        products:[
            {
                name: "iphone",
                model: "x",
                price:100
            },
            {
                name: "meizu",
                model: "pro 6",
                price:50
            }],
        sum: 150
    },
    {
        id: "2",
        customerName: "Vladik",
        type: "confirmed",
        products:[
            {
                name: "Asus",
                model: "kek",
                price:200
            },
            {
                name: "meizu",
                model: "amator 3",
                price:25
            }],
        sum: 225
    }
];

module.exports = orders;