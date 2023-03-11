import React from "react";
import { useRouter } from "next/router";
import { useFerchMovieDetail } from "../../../src/hooks/useFetchMovieDetail";
import Layout from "../../../src/components/layout/layout";

export default function MovieDetailPage() {
  const router = useRouter();
  const { data, isLoading } = useFerchMovieDetail(String(router.query.id));
  console.log(data);

  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <Layout>
      <div>movie detail page</div>
    </Layout>
  );
}
