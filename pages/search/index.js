import React from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { title } = router.query;

  return (
    <Layout>
      <div
        style={{ height: "1200px", backgroundColor: "gray", color: "white" }}
      >
        title : {title}
      </div>
    </Layout>
  );
}
