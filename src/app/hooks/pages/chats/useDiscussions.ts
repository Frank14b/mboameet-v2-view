import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { notification } from "@/app/lib/notifications";
import { useMainContext } from "@/app/contexts/main";
import { ResultMessageDto } from "@/app/types/chats";
import {
  getMessages,
  proceedDeleteMessage,
  proceedDeleteMessages,
  sendMessage,
  sendMessageReaction,
  updateMessage,
} from "@/app/services/server-actions/chats";
import {
  chatsPathUrl,
  messageFieldId,
  messagesContentId,
} from "@/app/lib/constants/app";
import {
  MessageProps,
  UserProps,
} from "@/app/components/layout/chats/messagesComponent";
import useUserStore from "@/app/store/userStore";
import {
  checkFileExtensionUsingLink,
  debounce,
  fileExtFromBase64,
  getContentEditable,
  scrollToBottom,
} from "@/app/lib/utils";
import useChatStore from "@/app/store/chatStore";
import { useRouter } from "next/navigation";
import { useAppHubContext } from "@/app/contexts/appHub";
import { MessageActionType, ObjectKeyDto } from "@/app/types";
import { MessageImagePreviewProps } from "@/app/components/layout/chats/messageImagePreviewComponent";

const useDiscussions = ({ reference }: { reference: string }) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<ResultMessageDto[] | []>([]);
  const { appEncryption, getFileUrl } = useMainContext();
  const { user } = useUserStore();
  const [users, setUsers] = useState({
    primaryUser: {
      id: user?.id,
      name: user?.userName,
      avatar: user?.photo,
    },
    secondUser: {
      id: 0,
      name: "",
      avatar: "",
    },
  });
  //
  const {
    createdMessage,
    updatedMessage,
    deletedMessage,
    deletedMessages,
    setCreatedMessage,
    setUpdatedMessage,
    setDeletedMessage,
    setDeletedMessages,
  } = useChatStore();
  //
  const router = useRouter();
  const { chatHubs } = useAppHubContext();
  const [lastMessageId, setLastMessageId] = useState<number>(0);
  const [editedMessage, setEditedMessage] = useState<MessageProps | null>(null);
  const [image, setImage] = useState<string>("");
  const [linkedImages, setLinkedImages] = useState<ObjectKeyDto[] | null>(null);
  const {
    encodeAndEncryptMessageAsync,
    decryptAndDecodeMessageAsync,
  } = appEncryption;

  const fetchMessages = useCallback(
    async (cursor = 0) => {
      //
      const result = await getMessages({
        revalidate: true,
        reference,
        cursor: cursor,
      });

      if (!result.status || !result?.data?.messages) {
        if (cursor > 0) return;
        return router.push(chatsPathUrl);
      }

      //
      const userId = result.data.userId;
      const userName = result.data.userName;
      const photo = result.data.photo;
      const resultMessages = result.data.messages.data;

      if (resultMessages.findIndex((x) => x.isEncrypted) !== -1) {
        for (let message of resultMessages) {
          if (message.isEncrypted) {
            message.message = await decryptAndDecodeMessageAsync(
              message.message
            );
          }
        }
      }

      setIsLoading(false);

      const lastMessage = resultMessages[resultMessages.length - 1];
      if (lastMessage) {
        setLastMessageId(lastMessage.id);
      }

      setUsers((prevValues) => {
        return {
          ...prevValues,
          secondUser: {
            id: userId,
            name: userName,
            avatar: getFileUrl(photo, userId),
          },
        };
      });

      chatHubs?.updateUserMessagesAsRead(userId);

      if (cursor > 0) {
        setMessages((prevValues) => {
          return [...prevValues, ...resultMessages];
        });
      } else {
        setMessages(resultMessages);
      }

      return resultMessages;
    },
    [
      reference,
      chatHubs,
      router,
      setLastMessageId,
      setIsLoading,
      getFileUrl,
      setMessages,
      decryptAndDecodeMessageAsync,
    ]
  );

  useEffect(() => {
    if (messages.length === 0) {
      fetchMessages();
      return;
    }
  }, [messages, fetchMessages]);

  useEffect(() => {
    if (createdMessage) {
      if (lastMessageId !== createdMessage.id) {
        setCreatedMessage(null);
        debounce(fetchMessages, 2000, lastMessageId);
        return;
      }
    }
  }, [createdMessage, lastMessageId, setCreatedMessage, fetchMessages]);

  const captureUpdatedMessage = useCallback(
    async (updatedMess: ResultMessageDto) => {
      const index = messages.findIndex(
        (message) => message.id === updatedMess.id
      );
      if (index !== -1) {
        messages[index] = {
          ...updatedMess,
          chatFiles: messages[index].chatFiles,
          message: await decryptAndDecodeMessageAsync(updatedMess.message),
        };
        setMessages([...messages]);
      }
    },
    [messages, decryptAndDecodeMessageAsync]
  );

  useEffect(() => {
    if (updatedMessage) {
      setUpdatedMessage(null);
      captureUpdatedMessage(updatedMessage);
    }
  }, [updatedMessage, setUpdatedMessage, captureUpdatedMessage]);

  useEffect(() => {
    if (deletedMessage) {
      const index = messages.findIndex(
        (message) => message.id === deletedMessage.id
      );
      if (index !== -1) {
        setDeletedMessage(null);
        messages.splice(index, 1);
        setMessages([...messages]);
      }
    }
  }, [messages, deletedMessage, setDeletedMessage]);

  useEffect(() => {
    if (deletedMessages) {
      const index = messages.findIndex(
        (message) => message.id === deletedMessages[0].id
      );
      if (index !== -1) {
        setDeletedMessages(null);
        messages.splice(index, deletedMessages.length);
        setMessages([...messages]);
      }
    }
  }, [messages, deletedMessages, setDeletedMessages]);

  const isMessageTimeMoreThanSixtySeconds = (
    newMessageTime: string,
    prevMessageTime: string | null
  ) => {
    if (prevMessageTime === null) return true;

    const difference =
      new Date(`${newMessageTime}`).getTime() -
      new Date(prevMessageTime).getTime();

    if (difference / 1000 > 60) {
      return true;
    }

    return false;
  };

  const formattedMessages = useMemo(() => {
    //
    let previousMessageUserId = 0;
    let previousMessageTime: string | null = null;
    const result: MessageProps[] = [];

    messages.map(async (message, index) => {
      const isSameUserAsPrevious = previousMessageUserId === message.sender;

      const isTimeMoreThanSixtySeconds = isMessageTimeMoreThanSixtySeconds(
        `${message.createdAt}`,
        previousMessageTime
      );

      previousMessageUserId = message.sender;
      previousMessageTime = `${message.createdAt}`;

      const resultSize = result.length;

      const files = message.chatFiles.map((file) => {
        return {
          ...file,
          url: getFileUrl(file.url, message.sender),
          previewUrl: getFileUrl(file.previewUrl, message.sender),
        };
      });

      if (isSameUserAsPrevious && !isTimeMoreThanSixtySeconds) {
        const isLastSameUserAsPrevious =
          messages?.[index + 1]?.sender !== previousMessageUserId;

        result[resultSize - 1].messageGroup.push({
          id: message.id,
          message: message.message,
          isLastMessage: isLastSameUserAsPrevious,
        });
        result[resultSize - 1].isRead = message.isRead;
        result[resultSize - 1].files =
          result[resultSize - 1].files.concat(files);
      } else {
        result.push({
          id: message.id,
          message: message.message,
          type: message.messageType,
          date: new Date(`${message.createdAt}`).toLocaleString(),
          sender: message.sender,
          receiver: message.receiver,
          isSameUserAsPrevious: isSameUserAsPrevious,
          messageGroup: [],
          isRead: message.isRead,
          reaction: message.reaction,
          files: files,
          isEncrypted: message.isEncrypted,
        });
      }
    });

    setTimeout(() => {
      scrollToBottom(`${messagesContentId}`);
    }, 300);

    return result;
  }, [messages, getFileUrl]);

  const discussionImages = useMemo(() => {
    const images: MessageImagePreviewProps[] = [];

    formattedMessages.map((message) =>
      message.files.map((file) => {
        const extension = checkFileExtensionUsingLink(file.url);

        if (extension === "image") {
          images.push({
            title: "",
            description: "",
            url: file.url,
          });
        }
      })
    );

    return images;
  }, [formattedMessages]);

  const handleSendMessage = useCallback(
    async ({ userId }: { userId: number }) => {
      const inputText = getContentEditable(`${messageFieldId}`);
      let message = inputText.innerText;
      let messagePair = message;
      //
      inputText.innerText = "";

      let result = { status: false, message: "" };

      if (editedMessage) {
        if (message.length == 0) return;
        // edited message

        if (editedMessage.isEncrypted) {
          message = await encodeAndEncryptMessageAsync(message);
          messagePair = await encodeAndEncryptMessageAsync(messagePair);
        }

        result = await updateMessage({
          revalidate: true,
          type: "users",
          id: editedMessage.id,
          message,
          messagePair,
        });
      } else {
        // new message
        const formData = new FormData();
        if (linkedImages && linkedImages.length > 0) {
          for (let i = 0; i < linkedImages.length; i++) {
            formData.append(
              "images",
              linkedImages[i].blob,
              `chat-${i}-${userId}.${fileExtFromBase64(linkedImages[i].base64)}`
            );
          }
        }

        const base64String = await encodeAndEncryptMessageAsync(message);

        formData.append("message", base64String);
        formData.append("messagePair", base64String);
        formData.append("isEncrypted", `${true}`);
        formData.append("messageType", `${0}`);
        formData.append("receiver", `${userId}`);

        result = await sendMessage({
          revalidate: true,
          type: "users",
          formData,
        });
      }

      if (!result?.status) {
        inputText.innerText = message;
        return notification.apiNotify(result);
      }

      setLinkedImages(null);
      setEditedMessage(null);
    },
    [
      editedMessage,
      linkedImages,
      setEditedMessage,
      setLinkedImages,
      encodeAndEncryptMessageAsync,
    ]
  );

  const handleMessageReaction = useCallback(
    async (id: number, reaction: string) => {
      //
      const result = await sendMessageReaction({
        revalidate: true,
        type: "users",
        id,
        reaction,
      });

      if (!result.status) {
        return notification.apiNotify(result);
      }
    },
    []
  );

  const handleDeleteMessage = useCallback(
    async (id: number) => {
      const result = await proceedDeleteMessage({
        revalidate: true,
        type: "users",
        id,
      });

      if (!result.status) {
        return notification.apiNotify(result);
      }

      const index = messages.findIndex((message) => message.id === id);
      if (index !== -1) {
        messages.splice(index, 1);
        setMessages([...messages]);
      }
    },
    [messages, setMessages]
  );

  const handleDeleteMessages = useCallback(
    async (ids: number[]) => {
      const result = await proceedDeleteMessages({
        revalidate: true,
        type: "users",
        ids,
      });

      if (!result.status) {
        return notification.apiNotify(result);
      }

      const index = messages.findIndex((message) => message.id === ids[0]);
      if (index !== -1) {
        messages.splice(index, ids.length);
        setMessages([...messages]);
      }
    },
    [messages, setMessages]
  );

  const handleMessageAction = useCallback(
    async (item: MessageProps, action: MessageActionType) => {
      //
      if (action === "delete") {
        if (item.messageGroup.length > 0) {
          await handleDeleteMessages([
            item.id,
            ...item.messageGroup.map((message) => message.id),
          ]);
          return;
        }
        await handleDeleteMessage(item.id);
        return;
      }

      if (action === "edit") {
        const inputText = getContentEditable(`${messageFieldId}`);
        inputText.innerText = item.message;
        setEditedMessage(item);
      }
    },
    [handleDeleteMessage, handleDeleteMessages]
  );

  const cancelEditMessageAction = useCallback(() => {
    setEditedMessage(null);
    const inputText = getContentEditable(`${messageFieldId}`);
    inputText.innerText = "";
  }, []);

  const handleInputKeyPress = (e: any) => {
    const inputText = getContentEditable(`${messageFieldId}`);
    if (!inputText) return;
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage({ userId: users.secondUser.id });
    }
  };

  const selectedImageFile = useCallback(
    (image: string | Blob | ObjectKeyDto) => {
      let currentLinkedImages = linkedImages;
      const tmpImage: any = image;

      if (currentLinkedImages) {
        currentLinkedImages.push({
          ...tmpImage,
          id: currentLinkedImages.length + 1,
        });
      } else {
        currentLinkedImages = [
          {
            ...tmpImage,
            id: 1,
          },
        ];
      }
      setLinkedImages(currentLinkedImages);
    },
    [linkedImages, setLinkedImages]
  );

  const handleUploadImage = useCallback(
    (data: string | Blob | ObjectKeyDto) => {
      selectedImageFile(data);
      setImage("");
    },
    [setImage, selectedImageFile]
  );

  const removeSelectedImage = useCallback(
    (index: number) => {
      const currentLinkedImages = linkedImages;
      if (currentLinkedImages) {
        currentLinkedImages.splice(index, 1);
        setLinkedImages([...currentLinkedImages]);
      }
    },
    [linkedImages, setLinkedImages]
  );

  const data: ConversationHookDto = {
    isLoading,
    messages: formattedMessages,
    users,
    editedMessage,
    image,
    linkedImages,
    chatImages: discussionImages,
    setImage,
    setUsers,
    setIsLoading,
    fetchMessages,
    handleSendMessage,
    handleMessageReaction,
    handleMessageAction,
    cancelEditMessageAction,
    handleInputKeyPress,
    handleUploadImage,
    removeSelectedImage,
  };

  return { ...data };
};

export default useDiscussions;

export type ConversationHookDto = {
  isLoading: boolean;
  image: string;
  messages: MessageProps[] | [];
  users: {
    primaryUser: UserProps;
    secondUser: UserProps;
  };
  editedMessage: MessageProps | null;
  linkedImages: ObjectKeyDto[] | null;
  chatImages: MessageImagePreviewProps[];
  setUsers: Dispatch<
    SetStateAction<{
      primaryUser: UserProps;
      secondUser: UserProps;
    }>
  >;
  setImage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchMessages: () => Promise<ResultMessageDto[] | void | undefined>;
  handleSendMessage: ({ userId }: { userId: number }) => Promise<void>;
  handleMessageReaction: (id: number, reaction: string) => Promise<void>;
  handleMessageAction: (
    item: MessageProps,
    action: MessageActionType
  ) => Promise<void>;
  cancelEditMessageAction: () => void;
  handleInputKeyPress: (e: any) => void;
  handleUploadImage: (data: string | Blob | ObjectKeyDto) => void;
  removeSelectedImage: (index: number) => void;
};
