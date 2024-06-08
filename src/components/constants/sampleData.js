export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Gwen",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },

    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boe",
        _id: "2",
        groupChat: false,
        members: ["1", "2"],
    },
];

export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Gwen",
        _id: "1"
    },

    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boe",
        _id: "2"
    },
];

export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Gwen",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Boe",
        },
        _id: "2",
    },
];

export const sampleMessage = [
    {
        content: "Hello this is a sample message",
        _id: "csckncjnjfrwlirvn",
        sender : {
            _id: "user._id",
            name: "Gwen"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
        attachments: [
            {
                public_id: "xerox2",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            }
        ],
        content: "Hello this is a return message",
        _id: "csckncjnjfrwlirvn2",
        sender : {
            _id: "sbjjwnjv",
            name: "Ben 10"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
]

export const dashBoardData = {
    users: [
        {
            name: "John the Don",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            username: "john_don",
            friends: 20,
            groups: 5,
        },
        {
            name: "Ben 10",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            username: "VillGax_slayer",
            friends: 20,
            groups: 25,
        },
    ],

    chats: [
        {
            _id: "1",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John the Don",
            totalMembers: 2,
            members: [
                { _id: "1", avatar: ""},
                { _id: "2", avatar: ""},
            ],
            totalMessages: 20,
            creator: {
                name: "Ben",
                avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            },
            groupChat: false,
        },
        {
            _id: "2",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Richard Feynnman",
            totalMembers: 2,
            members: [
                { _id: "1", avatar: ""},
                { _id: "2", avatar: ""},
            ],
            totalMessages: 40,
            creator: {
                name: "Einstein",
                avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            },
            groupChat: true,
        },
    ],
    messages: [
        {
            attachments: [
                {
                    public_id: "blackHole",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                }
            ],
            content: "I have a dual nature",
            _id: "dhcecnenie",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "photon"
            },
            chat: "Electrodynamics",
            createdAt: "2024-05-23T14:31:23.642Z"
        }

    ]
}