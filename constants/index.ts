export const navItems = [
    {
        name: "Dashboard",
        icon: "/assets/icons/dashboard.svg",
        url: "/",
    },
    {
        name: "Documentos",
        icon: "/assets/icons/documents.svg",
        url: "/documentos",
    },
    {
        name: "Imagens",
        icon: "/assets/icons/images.svg",
        url: "/imagens",
    },
    {
        name: "Midia",
        icon: "/assets/icons/video.svg",
        url: "/midia",
    },
    {
        name: "Outros",
        icon: "/assets/icons/others.svg",
        url: "/outros",
    },
    ];

    export const actionsDropdownItems = [
    {
        label: "Renomear",
        icon: "/assets/icons/edit.svg",
        value: "rename",
    },
    {
        label: "Detalhes",
        icon: "/assets/icons/info.svg",
        value: "details",
    },
    {
        label: "Compartilhar",
        icon: "/assets/icons/share.svg",
        value: "share",
    },
    {
        label: "Download",
        icon: "/assets/icons/download.svg",
        value: "download",
    },
    {
        label: "Delete",
        icon: "/assets/icons/delete.svg",
        value: "delete",
    },
    ];

    export const sortTypes = [
    {
        label: "Date created (newest)",
        value: "$createdAt-desc",
    },
    {
        label: "Created Date (oldest)",
        value: "$createdAt-asc",
    },
    {
        label: "Name (A-Z)",
        value: "name-asc",
    },
    {
        label: "Name (Z-A)",
        value: "name-desc",
    },
    {
        label: "Size (Highest)",
        value: "size-desc",
    },
    {
        label: "Size (Lowest)",
        value: "size-asc",
    },
];

export const avatarPlaceholderUrl =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB