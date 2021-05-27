import { useRouter } from "next/router";

/**
 *
 * @returns String ID
 */
export const useGetId = () => {
  const router = useRouter();
  const id = router.query.id;
  const result: string = Array.isArray(id) ? id[0] : id;

  return result;
};
