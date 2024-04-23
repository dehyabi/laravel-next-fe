import { Inter } from "next/font/google";
import axios from "@/lib/axios";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });


export async function getServerSideProps() {

  const req = await axios.get(
    `${process.env.BACKEND_URL}/api/posts`
  );
  const res = await req.data.data.data;
  return {
    props: {
      posts: res,
    },
  };
}
function PostIndex(props) {
  const { posts } = props;
  return (
    <>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <Link href="/posts/create">
                  <button
                    className="btn btn-primary border-0 shadow-sm mb-3"
                  >
                    TAMBAH
                  </button>
                </Link>
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th scope="col">IMAGE</th>
                      <th scope="col">JUDUL</th>
                      <th scope="col">CONTENT</th>
                      <th scope="col">AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="text-center">
                          <img
                            src={`${process.env.BACKEND_URL}/storage/posts/${post.image}`}
                            width="150"
                            className="rounded-3"
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3"
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-sm btn-danger border-0 shadow-sm mb-3"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PostIndex;
