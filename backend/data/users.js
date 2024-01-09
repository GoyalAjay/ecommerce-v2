import bcrypt from "bcrypt";

export const users = [
    {
        firstName: "Fake",
        lastName: "Man",
        email: "fakeman@gmail.com",
        password: bcrypt.hashSync("fakeman123", 10),
        phoneNumber: 2345327690,
        savedAddress: [],
    },
    {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: bcrypt.hashSync("johndoe123", 10),
        phoneNumber: 6547398103,
        savedAddress: [],
    },
    {
        firstName: "Jake",
        lastName: "Doe",
        email: "jakedoe@gmail.com",
        password: bcrypt.hashSync("jakedoe123", 10),
        phoneNumber: 9657013672,
        savedAddress: [],
    },
];

export const admin = [
    {
        firstName: "Ajay",
        lastName: "Goyal",
        email: "ajayrocks.goyal3@gmail.com",
        password: bcrypt.hashSync("goyalAjay123", 10),
    },
];

export const sellers = [
    {
        firstName: "Fake",
        lastName: "Man",
        shopName: "something pvt ltd",
        email: "fakeman@gmail.com",
        password: bcrypt.hashSync("fakeman1234", 10),
        shopAddress: {
            address: "Xyz street",
            postalCode: "123456",
            city: "Abc",
            country: "Xyz",
        },
        phoneNumber: 4637869849,
        isSeller: true,
    },
    {
        firstName: "John",
        lastName: "Doe",
        shopName: "testing pvt ltd",
        email: "johndoe@gmail.com",
        password: bcrypt.hashSync("johndoe1234", 10),
        shopAddress: {
            address: "Abc street",
            postalCode: "123456",
            city: "Opq",
            country: "Xyz",
        },
        phoneNumber: 9638597809,
        isSeller: true,
    },
    {
        firstName: "Jake",
        lastName: "Doe",
        email: "jakedoe@gmail.com",
        shopName: "xyz pvt ltd",
        password: bcrypt.hashSync("jakedoe1234", 10),
        shopAddress: {
            address: "Mno street",
            postalCode: "123456",
            city: "Pqr",
            country: "Xyz",
        },
        phoneNumber: 9812365477,
        isSeller: true,
    },
];
