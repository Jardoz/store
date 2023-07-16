import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getBillboard = async (billboardId: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${billboardId}`);

  return res.json();
};

export default getBillboard;