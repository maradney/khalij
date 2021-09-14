export type SignInResponse = {
  success: boolean;
  data: { id: number | null; name: string | null; email: string | null; token: string; phone: string; };
  message: string;
};
