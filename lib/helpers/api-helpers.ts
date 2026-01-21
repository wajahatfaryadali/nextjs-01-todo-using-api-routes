type SuccessResOptionsType<T> = {
  data: T;
  success?: boolean; // optional
  message?: string;
  code?: number;
};

export const successRes = <T>({
  data,
  message = "success",
  code = 200,
  success = true,
}: SuccessResOptionsType<T>) => {
  return { success, data, message, code };
};

type ErrorResOptionsType = Omit<SuccessResOptionsType<any>, "data"> & {
  code: number;
  error: any;
};

export const errorRes = ({
  code,
  message = "Error",
  success = false,
  error,
}: ErrorResOptionsType) => {
  console.log("error ************* ", error);
  return { success, message, code };
};
