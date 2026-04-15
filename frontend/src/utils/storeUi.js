export const initialBookForm = {
  title: "",
  author: "",
  price: "",
  publication_date: "",
  category: "",
};

export const initialClientForm = {
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  tel: "",
  total: "",
};

export const initialOrderForm = {
  status: "pending",
  total: "",
  client: "",
};

export const initialOrderItemForm = {
  quantity: "1",
  book: "",
  order: "",
};

export const dashboardSections = [
  {
    to: "/books",
    label: "Books",
    eyebrow: "Inventory",
    description: "Catalog creation, editing, and category management.",
  },
  {
    to: "/clients",
    label: "Clients",
    eyebrow: "Customers",
    description: "Client records and customer lookup in one place.",
  },
  {
    to: "/orders",
    label: "Orders",
    eyebrow: "Sales",
    description: "Orders and order items with separate workflow controls.",
  },
];

export function updateForm(setter, field, value) {
  setter((current) => ({
    ...current,
    [field]: value,
  }));
}

export function getBookFormValues(book) {
  return {
    title: book?.title ?? "",
    author: book?.author ?? "",
    price: String(book?.price ?? ""),
    publication_date: formatDateForInput(book?.publication_date),
    category: book?.category ?? "",
  };
}

export function formatDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateForInput(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export function formatMoney(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

export function truncateId(value) {
  if (!value) {
    return "";
  }

  return `${String(value).slice(0, 6)}...${String(value).slice(-4)}`;
}

export function getErrorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.details ||
    error?.response?.data ||
    error?.message ||
    fallback
  );
}
