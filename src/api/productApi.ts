import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getPaginatedProducts = async (
  page: number = 1,
  category?: string,
  limit: number = 10,
  search: string = "",
  sortBy: string = "id",
  sortOrder: string = "ASC"
) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);

  const res = await api.get(`/products/paginated?${params.toString()}`);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
