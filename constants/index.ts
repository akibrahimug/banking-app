export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
  {
    imgURL: "/icons/credit-card.svg",
    route: "/apply-card",
    label: "Virtual Card",
  },
  {
    imgURL: "/icons/coins.svg",
    route: "/earn-interest",
    label: "Earn Interest",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-muted",
    circleBg: "bg-accent/20",
    text: {
      main: "text-foreground",
      count: "text-muted-foreground",
    },
    progress: {
      bg: "bg-muted",
      indicator: "bg-accent",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-muted",
    circleBg: "bg-accent/20",
    text: {
      main: "text-foreground",
      count: "text-muted-foreground",
    },
    progress: {
      bg: "bg-muted",
      indicator: "bg-accent",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-muted",
    circleBg: "bg-accent/20",
    text: {
      main: "text-foreground",
      count: "text-muted-foreground",
    },
    progress: {
      bg: "bg-muted",
      indicator: "bg-accent",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-accent",
    backgroundColor: "bg-accent",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-accent/10",
  },
  Payment: {
    borderColor: "border-primary",
    backgroundColor: "bg-primary",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-primary/10",
  },
  "Bank Fees": {
    borderColor: "border-primary",
    backgroundColor: "bg-primary",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-primary/10",
  },
  Transfer: {
    borderColor: "border-destructive",
    backgroundColor: "bg-destructive",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-destructive/10",
  },
  Processing: {
    borderColor: "border-amber-500",
    backgroundColor: "bg-amber-500",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-amber-50",
  },
  Success: {
    borderColor: "border-green-500",
    backgroundColor: "bg-green-500",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-green-50",
  },
  Travel: {
    borderColor: "border-blue-500",
    backgroundColor: "bg-blue-500",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-blue-50",
  },
  default: {
    borderColor: "border-primary",
    backgroundColor: "bg-primary",
    textColor: "text-foreground",
    chipBackgroundColor: "bg-primary/10",
  },
};
