import type { NextApiRequest, NextApiResponse } from 'next';
import { getWorksData } from '~/utils/workData';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await getWorksData('en');
  console.log(process.env.BACKEND_BASE_URL);
  res.status(200).json(data);
}
