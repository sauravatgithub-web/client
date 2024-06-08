import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/constants/config";

// createApi simplifies FETCHING, CATCHING and SYNCING data
// requires baseQuery, reducerPath, tagTypes and endpoints

// fetchBaseQuery simplifies making HTTP requests - we can give baseUrl and prepareHeaders

// isLoading, isErrr, error and refetch are by default outputs

const api = createApi({
    reducerPath: "api", // Specifies the key in the Redux state where the API slice's data will be stored.
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/`}),
    tagTypes: ["Chat", "User", "Message"],  // Used for cache invalidation and refetching data.

    endpoints: (builder) => ({
        myChats:builder.query({  // builder.query is for GET requests, involves catching 
            query:() => ({
                url: "chat/my", 
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        searchUser:builder.query({
            query:(name) => ({
                url: `user/searchUser?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"],
        }),

        sendFriendRequest:builder.mutation({  // builder.mutation is for OTHER requests and don't involve caching
                                                // it triggers retching of data
            query:(data) => ({
                url: "user/sendRequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        getNotifications:builder.query({
            query:() => ({
                url: `user/notifications`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        acceptFriendRequest:builder.mutation({
            query:(data) => ({
                url: "user/acceptRequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Chat"],
        }),

        chatDetails:builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `chat/${chatId}`;
                if(populate) url += "?populate=true";

                return {
                    url,
                    credentials: "include",
                };
            },
            providesTags: ["Chat"],
        }),

        getMessages:builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        sendAttachment:builder.mutation({
            query:(data) => ({
                url: "chat/message",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),

        myGroups:builder.query({
            query:() => ({
                url: "chat/my/groups", 
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        availaibleFriends:builder.query({
            query: (chatId) => {
                let url = `user/friends`;
                if(chatId) url += `?chatId=${chatId}`;

                return {
                    url,
                    credentials: "include",
                };
            },
            providesTags: ["Chat"],
        }),

        newGroup:builder.mutation({
            query: ({ name, members }) => ({
                url: "chat/new",
                method: "POST",
                credentials: "include",
                body: { name, members },
            }),
            invalidatesTags: ["Chat"],
        }),

        renameGroup:builder.mutation({
            query:({ chatId, name }) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: { name },
            }),
            invalidatesTags: ["Chat"],
        }),

        removeMember:builder.mutation({
            query:({ userId, chatId }) => ({
                url: `chat/removeMember`,
                method: "PUT",
                credentials: "include",
                body: { userId, chatId },
            }),
            invalidatesTags: ["Chat"],
        }),

        addMember:builder.mutation({
            query: ({ chatId, members }) => ({
                url: `chat/addMembers`,
                method: "PUT",
                credentials: "include",
                body: { chatId, members },
            }),
            invalidatesTags: ["Chat"],
        }),

        deleteChat:builder.mutation({
            query: (id) => ({
                url: `chat/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"],
        }),

        leaveGroup:builder.mutation({
            query: (id) => ({
                url: `chat/leave/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"],
        }),
    }),
})

export default api;
export const { 
    useMyChatsQuery, 
    useLazySearchUserQuery, 
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentMutation,
    useMyGroupsQuery,
    useAvailaibleFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveMemberMutation,
    useAddMemberMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation
} = api;