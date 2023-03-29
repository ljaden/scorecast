import axios from "axios";

const axiosFetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export default axiosFetcher;
