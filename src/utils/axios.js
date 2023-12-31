import axios from "axios";
const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});
export default instance;
// Tóm lại Axios là một "trình duyệt" trong Javascript giúp chúng ta thực hiện thao tác với các website hoặc API giúp xây dựng những ứng dụng font-end linh hoạt mạnh mẽ hơn.
// Ưu điểm là cho phép hủy yêu cầu
